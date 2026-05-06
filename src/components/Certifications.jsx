const certificationsData = [
  {
    type: 'Certification',
    title: 'Introducation to Front End Development',
    provider: 'Meta | Coursera',
    description: 'Built responsive, accessible web pages using semantic HTML, modern CSS and JavaScript for DOM manipulation, events, and form validation.',
    tags: ['HTML', 'CSS', 'Java Script', 'Web Development'],
    certUrl: 'https://coursera.org/verify/NWKZE8ZR5X8Z',
  },
  {
    type: 'Certification',
    title: 'Web Designing for Beginners',
    provider: 'University of Moratuwa | UOM',
    description: 'Developed interactive front-end components (menus, modals, tabs) with clean HTML structure, polished CSS styling, and vanilla JavaScript to add dynamic behavior and smooth user experiences.',
    tags: ['HTML', 'CSS', 'Java Script', 'Web Development'],
    certUrl: 'https://open.uom.lk/verify',
  },
  {
    type: 'Certificate',
    title: 'Python for Beginners',
    provider: 'University of Moratuwa | UOM',
    description: 'Built a strong foundation in Python programming, logic building, and problem solving.',
    tags: ['Python', 'Web Development'],
    certUrl: 'https://open.uom.lk/verify',
  },
  {
    type: 'Certificate',
    title: 'Python for Beginners',
    provider: 'DP Education',
    description: 'Built a strong foundation in Python programming, logic building, and problem solving.',
    tags: ['Python', 'Web Development'],
    certUrl: null,
  },
];

function CertificateButton({ url }) {
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="certificate-btn">
      <span className="cert-icon">
        <i className="fa-solid fa-certificate"></i>
      </span>
      <span className="cert-text">View Certificate</span>
      <span className="cert-arrow">
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </span>
    </a>
  );
}

function Certifications() {
  return (
    <section id="courses" className="courses-section">
      <div className="container courses-wrapper">
        {/* LEFT SIDE: COURSES CONTENT */}
        <div className="courses-left">
          {certificationsData.map((cert, index) => (
            <div className="course-card" key={index}>
              <span className="course-type">{cert.type}</span>
              <h3>{cert.title}</h3>
              <p className="course-provider">{cert.provider}</p>
              <p className="course-text">{cert.description}</p>
              <div className="course-tags">
                {cert.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <CertificateButton url={cert.certUrl} />
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: TITLE */}
        <div className="courses-right">
          <h1 className="section-title">Certifications <br />&amp; <span>Courses</span></h1>
          <p className="courses-description">
            Professional courses, certifications, and workshops that
            helped me improve my technical and creative skills.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
