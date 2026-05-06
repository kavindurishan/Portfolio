import { useState, useEffect, useCallback } from 'react';

const GITHUB_USERNAME = 'kavindurishan';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

async function fetchReadme(owner, repo) {
  try {
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const response = await fetch(readmeUrl);
    if (!response.ok) return null;

    const readmeData = await response.json();
    const content = atob(readmeData.content.replace(/\s/g, ''));
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    let description = '';

    for (let i = 0; i < Math.min(10, lines.length); i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('[') && line.length > 20) {
        description = line.replace(/[#*`_[\]()]/g, '').trim();
        if (description.length > 50) break;
      }
    }

    if (!description || description.length < 50) {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && line.length > 50 && !line.startsWith('#') && !line.startsWith('![')) {
          description = line.replace(/[#*`_[\]()]/g, '').trim();
          if (description.length > 50) break;
        }
      }
    }

    if (description.length > 200) {
      description = description.substring(0, 200) + '...';
    }

    return description || null;
  } catch (error) {
    console.error(`Error fetching README for ${repo}:`, error);
    return null;
  }
}

function ProjectCard({ project }) {
  const language = project.language || 'Other';
  const description = project.readmeDescription || project.description || 'No description available';
  const updatedDate = new Date(project.updated_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const projectImage = `https://opengraph.githubassets.com/1/${project.owner.login}/${project.name}`;
  const fallbackImage = `https://via.placeholder.com/400x200/0a0a0a/ff003c?text=${encodeURIComponent(project.name)}`;

  return (
    <div className="project-card" data-language={language}>
      <div className="project-image-container">
        <img
          src={projectImage}
          alt={project.name}
          className="project-image"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <div className="project-image-overlay">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-image-link">
            <i className="fa-solid fa-external-link"></i>
          </a>
        </div>
      </div>
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">
            <i className="fa-brands fa-github"></i>
            {project.name}
          </h3>
          <span className="project-language">{language}</span>
        </div>
        <p className="project-description">{description}</p>
        <div className="project-stats">
          <span className="stat-item">
            <i className="fa-solid fa-star"></i>
            {project.stargazers_count}
          </span>
          <span className="stat-item">
            <i className="fa-solid fa-code-branch"></i>
            {project.forks_count}
          </span>
          <span className="stat-item">
            <i className="fa-solid fa-eye"></i>
            {project.watchers_count}
          </span>
        </div>
        <div className="project-footer">
          <span className="project-date">
            <i className="fa-solid fa-calendar"></i>
            Updated: {updatedDate}
          </span>
          <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
            View on GitHub
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading projects...');

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(GITHUB_API_URL);
      if (!response.ok) throw new Error('Failed to fetch repositories');

      const repos = await response.json();
      setLoadingText('Loading projects and descriptions...');

      const projectsWithReadme = await Promise.all(
        repos.map(async (repo) => {
          const readmeDescription = await fetchReadme(repo.owner.login, repo.name);
          return { ...repo, readmeDescription };
        })
      );

      setAllProjects(projectsWithReadme);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Get unique languages for filter buttons
  const languages = [...new Set(allProjects.filter(p => p.language).map(p => p.language))].sort();

  // Filter projects
  const filteredProjects = currentFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.language === currentFilter);

  const handleFilter = (language) => {
    setCurrentFilter(language);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h1 className="section-title">My <span>Projects</span></h1>
          <div className="title-underline"></div>
          <p className="projects-subtitle">Explore my GitHub repositories and filter by programming language</p>
        </div>

        {/* Filter buttons */}
        <div className="filter-container">
          <button
            className={`filter-btn${currentFilter === 'all' ? ' active' : ''}`}
            data-filter="all"
            onClick={() => handleFilter('all')}
          >
            <i className="fa-solid fa-layer-group"></i>All
          </button>
          {languages.map(lang => (
            <button
              key={lang}
              className={`filter-btn${currentFilter === lang ? ' active' : ''}`}
              data-filter={lang}
              onClick={() => handleFilter(lang)}
            >
              <i className="fa-solid fa-code"></i>{lang}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div id="loading" className="loading-state">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>{loadingText}</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div id="error" className="error-state">
            <i className="fa-solid fa-exclamation-triangle"></i>
            <p>Failed to load projects. Please check your GitHub username.</p>
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && (
          <div id="projects-grid" className="projects-grid">
            {filteredProjects.length === 0 ? (
              <div className="no-projects">
                <i className="fa-solid fa-folder-open"></i>
                <p>No projects found for this filter</p>
              </div>
            ) : (
              filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
