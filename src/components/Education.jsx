const educationData = [
  {
    logo: '/images/SLIIT.png',
    date: 'Present',
    title: 'BSc.(Hons) in Information Technology Specialising in Software Engineering',
    institution: 'Sri Lanka Institute of Information Technology | Malabe, Sri Lanka',
    description: 'Currently pursuing a Bachelor of Science (Honours) degree in Software Engineering, focusing on modern computing technologies and software development.',
    tags: ['HTML', 'CSS', 'Java', 'Full Stack', 'Modern Frameworks'],
  },
  {
    logo: '/images/icbt.jpg',
    date: '2024 – 2025',
    title: 'International Diploma in Information Technology',
    institution: 'International College of Business & Technology (ICBT), Sri Lanka',
    description: 'Gained hands-on experience in automobile repair, diagnostics, and maintenance.',
    tags: ['HTML', 'CSS', 'Python', 'Web Development', 'Graphic Designing'],
  },
  {
    logo: '/images/Isipathana-Logo.png',
    date: '2020 – 2023',
    title: 'G.C.E. Advanced Level Examination',
    institution: 'Isipathana College, Colombo 05',
    description: "Faced A/Ls from Commerce Stream and achieved one 'B' pass and two 'S' passes.",
    tags: [],
  },
  {
    logo: '/images/Isipathana-Logo.png',
    date: '2015 – 2020',
    title: 'G.C.E. Ordinary Level Examination',
    institution: 'Isipathana College, Colombo 05',
    description: "Achieved three 'A' passes, three 'B' passes, two 'C' passes and one 'S' pass.",
    tags: [],
  },
];

function Education() {
  return (
    <section id="experience" className="experience-section">
      <div className="container education-wrapper">
        {/* LEFT SIDE: FIXED TITLE */}
        <div className="education-left">
          <h1 className="section-title">Education</h1>
          <p className="section-subtitle">
            My professional journey and educational background
          </p>
        </div>

        {/* RIGHT SIDE: TIMELINE */}
        <div className="education-right">
          <div className="timeline">
            {educationData.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="edu-logo">
                    <img src={item.logo} alt={`${item.institution} Logo`} />
                  </div>
                  <span className="timeline-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <h4>{item.institution}</h4>
                  <p>{item.description}</p>
                  {item.tags.length > 0 && (
                    <div className="timeline-tags">
                      {item.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
