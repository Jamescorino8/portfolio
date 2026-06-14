import { useEffect, useRef } from 'react'
import TypeIt from 'typeit'
import { useFitText } from './useFitText'

const TYPESPEED = 50
const CTA_TEXT = 'wanna keep in touch?'

/**
 * Resolves after `ms` milliseconds.
 * Rejects immediately with an `AbortError` if `signal` is already aborted,
 * and cancels the pending timeout if `signal` fires while waiting.
 */
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(signal.reason); return }
    const id = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => { clearTimeout(id); reject(signal.reason) }, { once: true })
  })
}


/** Maximum ms we'll wait for a single TypeIt animation before giving up. */
const TYPEIT_TIMEOUT_MS = 10_000

/**
 * Wraps a TypeIt animation in a Promise that resolves when typing completes.
 * Rejects after TYPEIT_TIMEOUT_MS if afterComplete never fires (e.g. TypeIt
 * bug or element removed mid-animation), and aborts early if `signal` fires.
 *
 * @param {Element}      el           - DOM element to type into
 * @param {string}       text         - text to type
 * @param {object}       [opts]       - TypeIt options merged with defaults
 * @param {number}       [opts.pause=0]  - ms to pause before typing begins
 * @param {AbortSignal}  [opts.signal]   - abort signal for early cancellation
 */
function typeAsync(el, text, { pause = 0, signal, ...opts } = {}) {
  el?.classList.add('typing')
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { el?.classList.remove('typing'); reject(signal.reason); return }

    // Always start from an empty element so TypeIt never appends onto stale
    // content from a previous run or a partially completed mount.
    if (el) el.textContent = ''

    let ti = null  // declared before settle so the abort/fallback handlers can destroy it
    let settled = false
    let fallbackId = null
    //
    // settle() is the single resolution point for this Promise.
    //   killInstance — call ti.destroy() to stop an in-flight TypeIt animation.
    //                  Used by abort and fallback paths; NOT needed on the normal
    //                  afterComplete path because TypeIt self-destructs via instance.destroy().
    //   wipeContent  — clear el.innerHTML after destroying TypeIt.
    //                  Used only on abort/timeout so the next run starts from a
    //                  blank element; omitted on the fallback path because the
    //                  text is already correct by the time it fires.
    const settle = (fn, val, { killInstance = false, wipeContent = false } = {}) => {
      if (settled) return
      settled = true
      clearTimeout(timeoutId)
      if (fallbackId) clearTimeout(fallbackId)
      el?.classList.remove('typing')
      if (killInstance) try { ti?.destroy() } catch (_) {}
      if (wipeContent && el) el.innerHTML = ''
      fn(val)
    }

    const timeoutId = setTimeout(
      () => settle(reject, new Error(`[typeAsync] timed out after ${TYPEIT_TIMEOUT_MS}ms typing "${text.slice(0, 20)}…"`), { killInstance: true, wipeContent: true }),
      TYPEIT_TIMEOUT_MS,
    )

    signal?.addEventListener('abort', () => settle(reject, signal.reason, { killInstance: true, wipeContent: true }), { once: true })

    // Fallback: if afterComplete is delayed or never fires (e.g. a TypeIt quirk
    // in an unusual render environment), advance the sequence anyway once the
    // typing duration has clearly elapsed. killInstance: true stops the TypeIt
    // instance; wipeContent is false because the text is already rendered.
    // If afterComplete fires afterwards, settle()'s `settled` guard is a no-op,
    // and the try/catch on instance.destroy() handles the already-destroyed case.
    const estimatedDuration = pause + Math.max(1500, text.length * TYPESPEED + 700)
    fallbackId = setTimeout(() => settle(resolve, undefined, { killInstance: true }), estimatedDuration)

    ti = new TypeIt(el, {
      speed: TYPESPEED,
      ...opts,
      cursor: false,  // .typing::after owns the cursor; keep TypeIt's out of the way
      afterComplete: (instance) => {
        // try/catch: fallback may have already called ti.destroy() before afterComplete fires.
        try { instance.destroy() } catch (_) {}
        settle(resolve)
      },
    })
    if (pause) ti = ti.pause(pause)
    ti.type(text).go()
  })
}

/**
 * Runs the full page-entry animation sequence:
 *   type h1 → expand h2 → type h2 → highlight → underline
 *   → stagger items → type CTA → reveal footer
 *
 * @param {object} opts
 * @param {React.RefObject} opts.h1Ref        - ref for the h1 TypeIt target
 * @param {React.RefObject} opts.h2Ref        - ref for the h2 TypeIt target
 * @param {string}          opts.h1Text       - text to type into h1 (also drives useFitText)
 * @param {string}          opts.h2Text       - text to type into h2
 * @param {React.RefObject} opts.ctaRef       - ref for the CTA TypeIt target
 * @param {React.RefObject} opts.footerRef    - ref for the footer element
 * @param {React.RefObject} opts.itemsRef     - ref to the container of .stagger-item children
 * @param {function}        [opts.onStagger]  - optional callback fired before the stagger begins
 * @param {number}          [opts.staggerDelay=100] - ms between each stagger-item reveal
 */
export function usePageAnimation({
  h1Ref,
  h2Ref,
  h1Text,
  h2Text,
  ctaRef,
  footerRef,
  itemsRef,
  onStagger,
  staggerDelay = 100,
}) {
  const hasRun = useRef(false)
  const abortRef = useRef(null)
  const h1Ratio = useFitText(h1Ref, h1Text, { reserve: 32 })

  useEffect(() => {
    // hasRun guards against duplicate runs within the same component lifetime.
    // It is set synchronously inside run() before the first await, so any
    // second synchronous invocation (e.g. a stale closure) bails out immediately.
    // On abort or error it is reset in the catch block so the next genuine mount
    // (StrictMode remount or navigation back) can run the animation again.
    // On a genuine remount React creates a fresh useRef(false), so hasRun starts
    // false anyway — the reset is redundant there but harmless.
    if (hasRun.current) return

    const controller = new AbortController()
    abortRef.current = controller
    const { signal } = controller

    async function run() {
      const h1 = h1Ref.current
      const h2 = h2Ref.current
      const cta = ctaRef.current
      const footer = footerRef.current
      const items = Array.from(itemsRef.current?.querySelectorAll('.stagger-item') ?? [])

      // Bail out gracefully if any required ref hasn't mounted yet.
      if (!h1 || !h2 || !cta) {
        console.warn('[usePageAnimation] One or more required refs are null — animation skipped.')
        return
      }

      // Mark as run before any awaits so StrictMode's second synchronous call
      // still bails out, but a genuine async failure (caught below) can reset it.
      hasRun.current = true

      // Scale h2 to match the ratio applied to h1 by useFitText.
      // h1Ratio.current is guaranteed settled because useFitText runs in
      // useLayoutEffect, which always commits before any useEffect fires.
      // Guard against getComputedStyle returning 0 on a not-yet-visible element.
      const rawH2Size = parseFloat(window.getComputedStyle(h2).fontSize)
      if (rawH2Size > 0) {
        h2.style.fontSize = `${rawH2Size * h1Ratio.current}px`
      }

      // Step 1: type h1 (leading pause so the cursor blinks once before typing)
      await typeAsync(h1, h1Text, { pause: 300, signal })

      // Step 2a: slide h2 into view
      h2.classList.add('expanded')
      await delay(350, signal)

      // Step 2b: type h2
      await typeAsync(h2, h2Text, { signal })

      // Step 2c: flash highlight, then settle to underline
      await delay(400, signal)
      h2.classList.add('highlighted')
      await delay(350, signal)
      h2.classList.remove('highlighted')
      h2.classList.add('underlined')
      await delay(200, signal)

      // Step 3: stagger items in
      onStagger?.()
      const staggerIds = items.map((item, i) =>
        setTimeout(() => item.classList.add('printed'), i * staggerDelay),
      )
      signal.addEventListener('abort', () => staggerIds.forEach(clearTimeout), { once: true })
      await delay(items.length * staggerDelay + 300, signal)

      // Step 4: type CTA
      await typeAsync(cta, CTA_TEXT, { signal })

      // Step 5: reveal footer
      footer?.classList.add('revealed')
    }

    const startId = window.setTimeout(() => {
      run().catch((err) => {
        // AbortError is expected on unmount (including StrictMode's fake unmount).
        // Reset the guard so the subsequent remount can run the animation.
        if (err?.name === 'AbortError') { hasRun.current = false; return }
        console.error('[usePageAnimation] Animation failed:', err)
        // Reset the guard so a future remount can retry the animation.
        hasRun.current = false
      })
    }, 0)

    // On unmount, abort the in-flight animation so all pending delays and
    // typeAsync calls reject immediately with an AbortError (swallowed above).
    // This prevents stale classList mutations and TypeIt writes on detached nodes.
    //
    // NOTE: StrictMode double-invokes the effect synchronously. Deferring the
    // start one tick gives the fake mount a chance to clean up before the real
    // animation begins.
    // Primitive options (h1Text, h2Text, staggerDelay) are excluded from deps
    // deliberately; changing them mid-life would not re-trigger the sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      clearTimeout(startId)
      abortRef.current?.abort()
    }
  }, [])
}
