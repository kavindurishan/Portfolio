import { useState, useEffect } from 'react';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Education' },
  { href: '#courses', label: 'Certifications' },
  { href: '#projects', label: 'Projects' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#contact', label: 'Contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = navItems.map(item => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -50% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <a href="#hero" className="logo">Kavindu Rishan Modarage</a>

      <div className="nav-toggle" id="navToggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className={`nav-links${isOpen ? ' active' : ''}`} id="navLinks">
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={`nav-link${activeSection === item.href.slice(1) ? ' active' : ''}`}
            onClick={handleLinkClick}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
