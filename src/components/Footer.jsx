function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <h2>Kavindu <span>Rishan</span> Modarage</h2>
          <h4>Software Engineer Undergraduate | SLIIT</h4>
          <h4>Full Stack Developer</h4>
          <p>Software Engineer Undergraduate &amp; Web Developer passionate about building clean, modern, and scalable digital solutions.</p>
          <div className="footer-socials">
            <a href="https://github.com/kavindurishan" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.linkedin.com/in/kavindu-rishan-modarage-448624330/" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://web.facebook.com/kavindu.rishan.2025" aria-label="Facebook"><i className="fa-brands fa-square-facebook"></i></a>
            <a href="https://wa.me/94778277802" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Navigate</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Education</a></li>
            <li><a href="#courses">Certifications</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p><i className="fa-solid fa-envelope"></i> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kavindurishan6@gmail.com" target="_blank" rel="noopener noreferrer">kavindurishan6@gmail.com</a></p>
          <p><i className="fa-solid fa-phone"></i> <a href="tel:+94778277802">+94 77 827 7802</a></p>
          <p><i className="fa-solid fa-location-dot"></i> <a href="https://www.google.com/maps/search/?api=1&query=Nugegoda,+Sri+Lanka" target="_blank" rel="noopener noreferrer">Nugegoda, Sri Lanka</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Kavindu Rishan · Built with <span>❤</span> &amp; Passion</p>
      </div>
    </footer>
  );
}

export default Footer;
