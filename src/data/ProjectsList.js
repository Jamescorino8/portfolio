export const PROJECTS = [
  {
    name: 'portfolio',
    year: '2026',
    desc: "personal site. you're looking at it.",
    tags: ['react', 'css', 'gsap', 'vite'],
    link: 'https://github.com/Jamescorino8/portfolio/tree/main/portfolio',
  },
  {
    name: 'seoul transit & weather analysis',
    year: '2026',
    desc: 'How do inclement weather conditions impact public transportation volume in Seoul, and how do commuters describe rainy travel experiences in online texts?',
    details: [
      "That was the research question behind a statistics project, and I owned the quantitative half of the answer. I built the pipeline that pulls daily ridership for Seoul's public transit network from the city's Open Data API and joins it to Open-Meteo's historical weather archive. I wrote the cleaning stage: date conversion, filling missing precipitation, trimming observations beyond 3 standard deviations, and deriving a binary rain/dry category from precipitation. Levene's test came back non-significant (1.559, p = .215), so the equal-variance assumption held and I ran the pooled independent t-test across 45 dry days and 42 rainy days: t = -0.34, p = 0.73. No detectable difference in ridership. I built the scatter and boxplot figures that show why, a flat slope against precipitation and near-total overlap between the two distributions.",
      "My teammate built the companion text branch in the same repo: 492 Korean-language YouTube comments about rainy commutes, coded by an LLM for issue type and emotion, then tested for association (χ² = 21.69, p = 0.0099, Cramér's V = 0.245 across the 120 relevant comments). We reported it as small-to-moderate and flagged the sparse expected cell counts rather than overstating it.",
      'Rain moved how commuters felt about the trip more clearly than how many of them took it.',
    ],
    tags: ['python', 'pandas', 'scipy', 'seaborn', 'seoul open data api', 'open-meteo'],
    link: 'https://github.com/Jamescorino8/seoul-transit-weather-analysis',
  },
  {
    name: 'travel planner (wip)',
    year: '2026',
    desc: 'collaborative travel planner with map, calendar, and shared shortlist.',
    tags: ['react', 'vite', 'leaflet', 'fullcalendar', 'supabase'],
    link: 'https://github.com/Jamescorino8/travel-planner',
  },
  {
    name: 'cpu simulator: a 16-bit processor with two-level cache',
    year: '2026',
    desc: 'I built a working CPU in Java, starting from a class that represents a single bit.',
    details: [
      "Everything above it is built on that foundation: 16- and 32-bit words, a ripple-carry adder, a multiplier, a shifter, then an ALU dispatching across them. Above that sits a 1000-word simulated DRAM, a two-level cache hierarchy, an assembler, and a processor running fetch-decode-execute-store over the course's 21-instruction ISA. Instructions are 16 bits wide, two packed into each 32-bit memory word: a 5-bit opcode, a mode bit choosing register or immediate operands, and two 5-bit operand fields.",
      "Then I measured it. I wrote three benchmark programs in the simulator's own assembly, a register-only loop, a sequential array traversal, and a 100-node linked-list walk, and ran each under four cache configurations, counting cycles. The register-only program fell from 61,510 cycles with no cache to 2,980 with an L1 instruction cache, a 20x improvement. The linked list fell from 392,704 to 100,334 under the full hierarchy. Adding L2 data caching cut the array program from 68,162 to 50,622. The gains tracked how sequential the access pattern was.",
    ],
    tags: ['java', 'maven', 'junit', 'computer architecture', 'cache performance analysis'],
    link: 'https://github.com/Jamescorino8/cpu-simulator',
  },
  {
    name: 'networked battleship in c',
    year: '2025',
    desc: 'Battleship over a network, written in C with nothing beyond the POSIX socket API.',
    details: [
      'I built it solo over ten weeks for a systems programming course, in four graded stages — the file grew from 38 lines to 766. It runs in three modes chosen by argument count: solo against a CPU that fires at random untried coordinates, as a TCP server hosting a game on a port, or as a client connecting to one.',
      'The networking is raw sockets. getaddrinfo with AF_UNSPEC, so one code path works over IPv4 or IPv6, then socket/bind/listen/accept on the server and connect on the client. The wire protocol is deliberately small: the shooter sends a coordinate like "C7", the defender checks its own grid and replies "Hit!" or "Miss!". Each board stays on the machine that owns it — neither process ever holds the other\'s ship positions.',
      'Boards are dynamically allocated 10x10 arrays of enums. Every malloc is checked, and a failure part-way through allocating rows frees the rows already allocated before exiting instead of leaking them. Verified leak-free with Valgrind.',
    ],
    tags: ['c', 'posix sockets', 'tcp/ip', 'dynamic memory management', 'docker dev container'],
    link: 'https://github.com/Jamescorino8/battleship-c',
  },
  {
    name: 'nusha: a dsl and solver for logic puzzles',
    year: '2025',
    desc: 'Nusha is a small domain-specific language where you declare typed variables and logical constraints, and the interpreter finds an assignment that satisfies all of them — or proves that none exists.',
    details: [
      'I built the implementation in Java over ten weeks for a programming languages course. The assignment supplied a 537-line skeleton — AST node classes, the token model, and empty class shells — and I wrote what goes inside them: a lexer that tracks block structure with Python-style INDENT/DEDENT tokens off an indent stack, a recursive-descent parser that produces the AST, and a tree-walking interpreter whose back end is a constraint solver.',
      'The solver runs backtracking search with forward checking. Each candidate assignment is tested against all-different constraints and the program\'s rules, then the domains of the unassigned variables are pruned before recursing. The design decision I\'d point to: rule evaluation returns a nullable Boolean, where null means "not yet determinable." That way a partially assigned puzzle can\'t falsely violate a rule referring to variables the search hasn\'t reached — dead branches get cut, merely incomplete ones get explored.',
      'A command-line entry point takes a source file through the whole pipeline and prints the solution. Sixteen JUnit tests cover the lexer and parser across four suites, twelve of which I wrote, and a separate driver runs the solver against eight logic puzzles.',
    ],
    tags: ['java', 'maven', 'junit', 'recursive-descent parsing', 'backtracking search with forward checking'],
    link: 'https://github.com/Jamescorino8/nusha-lang',
  },
]
