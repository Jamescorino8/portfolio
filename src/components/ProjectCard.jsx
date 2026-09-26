export default function ProjectCard({ name, year, desc, details = [], tags = [], link }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <span className="project-name">{name}</span>
        <span className="project-year">{year}</span>
      </div>
      <p className="project-desc">{desc}</p>
      {details.length > 0 && (
        <details className="project-details">
          <summary>
            <span className="more">read more +</span>
            <span className="less">read less −</span>
          </summary>
          <div className="project-details-body">
            {details.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </details>
      )}
      <div className="project-tags">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
          view on github →
        </a>
      )}
    </div>
  )
}
