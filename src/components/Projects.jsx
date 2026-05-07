import { useState, useEffect, useCallback } from 'react';

const GITHUB_USERNAME = 'kavindurishan';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
const CACHE_KEY = 'github_projects_cache';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_README_FETCHES = 10; // Limit README fetches to conserve API calls

function getCachedProjects() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

function setCachedProjects(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage full or unavailable — ignore
  }
}

async function fetchReadme(owner, repo) {
  try {
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const response = await fetch(readmeUrl);
    if (!response.ok) return null;

    const readmeData = await response.json();
    const content = atob(readmeData.content.replace(/\s/g, ''));
    const lines = content.split('\n').filter(line => line.trim().length > 0);

    let description = '';
    let imageUrl = null;

    // Extract first image
    const mdImgRegex = /!\[.*?\]\((.*?)\)/;
    const htmlImgRegex = /<img.*?src=["'](.*?)["']/;

    const mdMatch = content.match(mdImgRegex);
    const htmlMatch = content.match(htmlImgRegex);

    const rawUrl = mdMatch?.[1] || htmlMatch?.[1];
    if (rawUrl) {
      if (rawUrl.startsWith('http')) {
        imageUrl = rawUrl;
      } else {
        // Handle relative paths
        imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${rawUrl.replace(/^\.\//, '')}`;
      }
    }

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

    return { description: description || null, imageUrl };
  } catch (error) {
    console.error(`Error fetching README for ${repo}:`, error);
    return null;
  }
}

const PROJECT_IMAGE_MAPPING = {
  'Portfolio': '/images/projects/portfolio_hero.png',
  'C.E.I.D.': '/images/projects/Picture1.png',
  'Movie-Ticket-Booking-System': '/images/projects/movie.png',
};

// Descriptions
const PROJECT_DESCRIPTION_MAPPING = {
  'Portfolio': 'A premium, modern portfolio website built with React and Vite, featuring advanced animations, deep space aesthetics, and dynamic GitHub integration.',
  'Movie-Ticket-Booking-System': 'A comprehensive full-stack movie ticket booking platform with real-time seat selection, payment integration, and a sleek user dashboard.',
  'C.E.I.D.': 'A specialized platform developed for educational and institutional management, focusing on streamlined data handling and user-friendly interfaces.',
};

// Technology Lists
const PROJECT_LANGUAGES_MAPPING = {
  'Portfolio': ['React', 'Vite', 'CSS3', 'JavaScript', 'GitHub API'],
  'Movie-Ticket-Booking-System': ['HTML5', 'CSS3', 'JavaScript'],
  'C.E.I.D.': ['HTML5', 'CSS3', 'JavaScript'],
};

async function fetchLanguages(languagesUrl) {
  try {
    const response = await fetch(languagesUrl);
    if (!response.ok) return [];
    const data = await response.json();
    return Object.keys(data);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}

function ProjectCard({ project }) {
  // Use hand-written data if available, otherwise fallback to API data
  const customLanguages = PROJECT_LANGUAGES_MAPPING[project.name];
  const languagesList = customLanguages || project.languagesList || (project.language ? [project.language] : []);

  const customDescription = PROJECT_DESCRIPTION_MAPPING[project.name];
  const description = customDescription || project.readmeData?.description || project.description || 'No description available';

  const updatedDate = new Date(project.updated_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const mappedImage = PROJECT_IMAGE_MAPPING[project.name];
  const readmeImage = project.readmeData?.imageUrl;
  const ogImage = `https://opengraph.githubassets.com/1/${project.owner.login}/${project.name}`;
  const defaultFallback = '/images/projects/default.png';

  const [displayImage, setDisplayImage] = useState(mappedImage || readmeImage || ogImage);

  return (
    <div className="project-card" data-language={project.language || 'Other'}>
      <div className="project-image-container">
        <img
          src={displayImage}
          alt={project.name}
          className="project-image"
          onError={() => {
            if (displayImage !== ogImage) setDisplayImage(ogImage);
            else setDisplayImage(defaultFallback);
          }}
        />
        <div className="project-image-overlay">
          <a href="https://github.com/kavindurishan" target="_blank" rel="noopener noreferrer" className="project-image-link">
            <i className="fa-solid fa-external-link"></i>
          </a>
        </div>
      </div>
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">
            <a href="https://github.com/kavindurishan" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
              {project.name}
            </a>
          </h3>
        </div>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {languagesList.map(lang => (
            <span key={lang} className="project-language-badge">{lang}</span>
          ))}
        </div>
        <div className="project-footer">
          <span className="project-date">
            <i className="fa-solid fa-calendar"></i>
            Updated: {updatedDate}
          </span>
          <a href="https://github.com/kavindurishan" target="_blank" rel="noopener noreferrer" className="project-github-link" title="View on GitHub">
            <i className="fa-brands fa-github"></i>
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
  const [fromCache, setFromCache] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const cached = getCachedProjects();
      if (cached) {
        const filtered = cached.filter(repo => repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase());
        setAllProjects(filtered);
        setLoading(false);
        setFromCache(true);
        return;
      }

      const response = await fetch(GITHUB_API_URL);
      if (!response.ok) {
        const expiredCache = localStorage.getItem(CACHE_KEY);
        if (expiredCache) {
          const { data } = JSON.parse(expiredCache);
          const filtered = data.filter(repo => repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase());
          setAllProjects(filtered);
          setLoading(false);
          setFromCache(true);
          return;
        }
        throw new Error('Failed to fetch repositories');
      }

      const repos = (await response.json()).filter(repo => repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase());
      setLoadingText('Loading project details...');

      const enrichedProjects = await Promise.all(
        repos.map(async (repo, index) => {
          const [readmeData, languagesList] = index < MAX_README_FETCHES
            ? await Promise.all([
              fetchReadme(repo.owner.login, repo.name),
              fetchLanguages(repo.languages_url)
            ])
            : [null, repo.language ? [repo.language] : []];

          return { ...repo, readmeData, languagesList };
        })
      );

      setCachedProjects(enrichedProjects);
      setAllProjects(enrichedProjects);
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

  const handleRefresh = () => {
    localStorage.removeItem(CACHE_KEY);
    setFromCache(false);
    fetchProjects();
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h1 className="section-title">My <span>Projects</span></h1>
          <div className="title-underline"></div>
          <p className="projects-subtitle">
            Explore my GitHub repositories and filter by programming language
            {fromCache && (
              <button className="refresh-btn" onClick={handleRefresh} title="Refresh projects from GitHub">
                <i className="fa-solid fa-arrows-rotate"></i>
              </button>
            )}
          </p>
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
