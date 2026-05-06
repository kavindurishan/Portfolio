function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <h1 className="section-title">About <span>Me</span></h1>
            <div className="title-underline"></div>
          </div>

          <section className="about-modern">
            <div className="container about-wrapper">
              {/* IMAGE SIDE */}
              <div className="about-image-box">
                <img src="/images/propic.png" alt="About Me" />
              </div>

              {/* TEXT SIDE */}
              <div className="about-text-box">
                <h2 className="about-role">
                  Passionate <span>Developer &amp; Designer </span>
                </h2>
                <br />

                <p>
                  <b>
                    Hello! I'm Kavindu Rishan Modarage, a passionate Software Engineering undergraduate at SLIIT with a
                    strong interest in web development. I enjoy building modern, responsive, and user-friendly web applications,
                    focusing on clean design, smooth user experiences, and well-structured code.

                    My journey into web development started with curiosity about how websites and applications work behind the scenes.
                    Since then, I've been improving my skills across frontend and backend development,
                    always learning new tools and best practices. I love solving problems, collaborating with others
                    and creating high-quality solutions that are fast, accessible, and look great on any device.
                  </b>
                </p>

                <p>
                  I love turning complex problems into elegant digital solutions.
                  My goal is to create experiences that are fast, accessible,
                  and visually engaging on all devices.
                </p>

                <a href="#contact" className="btn">
                  <i className="fa-solid fa-paper-plane"></i>Contact Me
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default About;
