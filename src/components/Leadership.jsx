const leadershipData = [
  {
    icon: 'fa-solid fa-users',
    date: '2026 - Present',
    title: 'Committee Member',
    org: 'Faculty of Computing Student Community | SLIIT',
    description: 'Actively contributed to planning, coordination, and execution of events and initiatives by supporting core committees, collaborating with team members, and ensuring assigned responsibilities were completed effectively.',
    tags: ['Leadership', 'Teamwork', 'Responsibility'],
  },
  {
    icon: 'fa-solid fa-users',
    date: '2025 - 2026',
    title: 'Sub Committee Member',
    org: 'Faculty of Computing Student Community | SLIIT',
    description: 'Actively contributed to planning, coordination, and execution of events and initiatives by supporting core committees, collaborating with team members, and ensuring assigned responsibilities were completed effectively.',
    tags: ['Leadership', 'Teamwork', 'Responsibility'],
  },
  {
    icon: 'fa-solid fa-users',
    date: '2024 - Present',
    title: 'Batch Representative',
    org: 'Faculty of Computing | SLIIT',
    description: 'Served as a link between students and academic staff by representing batch concerns, facilitating communication, and supporting academic and administrative coordination for improved student engagement.',
    tags: ['Leadership', 'Student Representation', 'Coordination'],
  },
  {
    icon: 'fa-solid fa-users',
    date: '2019 - 2024',
    title: 'Senior Prefect',
    org: "Prefects' Guild of Isipathana College | Colombo 05",
    description: "Maintained discipline and upheld school values as a member of the Prefects' Guild while assisting in student management, leadership activities, and school event coordination.",
    tags: ['School Leadership', 'Student Management'],
  },
  {
    icon: 'fa-solid fa-users',
    date: '2022 - 2023',
    title: 'President',
    org: 'Commerce Society of Isipathana College | Colombo 05',
    description: 'Led the Commerce Society by planning and executing academic and extracurricular initiatives, managing committees, and motivating members to achieve organizational goals and successful events.',
    tags: ['Leadership', 'Teamwork', 'Decision Making'],
  },
  {
    icon: 'fa-solid fa-users',
    date: '2022 - 2023',
    title: 'Vice - President',
    org: 'Red Cross Society of Isipathana College | Colombo 05',
    description: 'Supported the President in leading Red Cross activities focused on humanitarian service, volunteering, and social welfare while coordinating members and initiatives for community impact.',
    tags: ['Leadership', 'Community Service', 'Humanitarian Service'],
  },
];

const socialImpactData = [
  {
    icon: 'fa-solid fa-handshake-angle',
    date: '2026',
    title: "EUPHORIA '26  ",
    org: 'Faculty of Computing Student Community | SLIIT',
    description: "Committee Member | Musical Event | Get to gether | SLIIT  \nContributed to planning and coordination of EUPHORIA '26, a university-level musical event at SLIIT. Actively supported event operations, teamwork, and execution to ensure a smooth and engaging experience for participants and the audience.",
    tags: ['Event Management', 'Teamwork', 'Leadership Support'],
  },
  {
    icon: 'fa-solid fa-handshake-angle',
    date: '2025',
    title: "Wiramaya'25",
    org: 'Faculty of Computing Student Community | SLIIT',
    description: "Subcommittee Member | Musical Event | SLIIT\nContributed to planning and coordination of Wiramaya '25, a university-level musical event at SLIIT. Actively supported event operations, teamwork, and execution to ensure a smooth and engaging experience for participants and the audience.",
    tags: ['Event Management', 'Teamwork', 'Leadership Support'],
  },
  {
    icon: 'fa-solid fa-droplet',
    date: '2025',
    title: "Blood Donation'25",
    org: 'Faculty of Computing Student Community | SLIIT',
    description: 'Subcommittee Member | Social Welfare Initiative | SLIIT\nPlayed a key role as a subcommittee member in organizing a blood donation campaign at SLIIT, aimed at supporting healthcare needs and promoting social responsibility among students.',
    tags: ['Social Care', 'Volunteering', 'Health Awareness', 'Community Service'],
  },
  {
    icon: 'fa-solid fa-lightbulb',
    date: '2022',
    title: "ENLIGHTEN'22",
    org: 'Commerce Society | Isipathana College',
    description: "President | Commerce Day | Isipathana College\nLed and organized ENLIGHTEN '22, the annual Commerce Day at Isipathana College. Oversaw planning, coordination, and execution while guiding a team to deliver a successful educational and collaborative event.",
    tags: ['Education', 'Leadership', 'Team Management'],
  },
  {
    icon: 'fa-solid fa-people-group',
    date: '2022',
    title: "Ape Dawasa'22",
    org: 'Commerce Society | Isipathana College',
    description: "President | Children's Day Special Event | Isipathana College\nHeaded Ape Dawasa '22, a Children's Day initiative organized for special unit students. Focused on inclusion, care, and creating joyful experiences through well-planned activities and teamwork.",
    tags: ['Community Engagement', 'Leadership', 'Inclusive Education'],
  },
];

function LeadershipCard({ item }) {
  return (
    <div className="leadership-card">
      <div className="leadership-icon">
        <i className={item.icon}></i>
      </div>
      <span className="leadership-date">{item.date}</span>
      <h3>{item.title}</h3>
      <h4>{item.org}</h4>
      <p>{item.description}</p>
      <div className="leadership-tags">
        {item.tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function Leadership() {
  return (
    <>
      {/* Leadership & Experience Section */}
      <section id="leadership" className="leadership-section">
        <div className="container">
          <div className="leadership-header">
            <h1 className="section-title">Leadership &amp; <span>Experience</span></h1>
            <p className="section-subtitle">
              Roles, responsibilities, and leadership experiences
              that shaped my professional journey.
            </p>
          </div>

          <div className="leadership-horizontal">
            {leadershipData.map((item, index) => (
              <LeadershipCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Impacts Section */}
      <section className="leadership-section">
        <div className="container">
          <div className="leadership-header">
            <h1 className="section-title">Social <span>Impacts</span></h1>
            <p className="section-subtitle">
              Community programs, social initiatives, and events
              where I actively contributed to making a positive impact.
            </p>
          </div>

          <div className="leadership-horizontal">
            {socialImpactData.map((item, index) => (
              <LeadershipCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Leadership;
