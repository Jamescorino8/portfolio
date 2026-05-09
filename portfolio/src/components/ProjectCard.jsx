export default function ProjectCard({ name, year, desc, tags = [], link }) {
  return (
    <div className="project-card stagger-item">
      <div className="project-header">
        <span className="project-name">{name}</span>
        <span className="project-year">{year}</span>
      </div>
      <p className="project-desc">{desc}</p>
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
