import { useTypingEffect } from '../hooks/useTypingEffect';

function Hero() {
  const nameText = useTypingEffect('Kavindu Rishan Modarage', {
    typingSpeed: 90,
    deletingSpeed: 50,
    pauseDuration: 1500,
  });

  const subtitleText = useTypingEffect(
    ['Software Engineer Undergraduate | SLIIT', 'Full Stack Web Developer'],
    { typingSpeed: 80, deletingSpeed: 50, pauseDuration: 2000 }
  );

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span id="name-typing">{nameText}</span>
            </h1>

            <h2 className="hero-subtitle">
              <span id="typing-text">{subtitleText}</span>
              <span className="cursor">|</span>
            </h2>

            <p>
              Software Engineering undergraduate with a strong foundation in
              programming and problem-solving. Passionate about developing efficient, scalable,
              and user-friendly software solutions.
            </p>

            <div className="btn-group">
              <a href="#projects" className="btn btn-primary">
                <i className="fa-solid fa-rocket"></i>View Projects
              </a>
              <a href="#contact" className="btn">
                <i className="fa-solid fa-envelope"></i>Get in Touch
              </a>
            </div>
          </div>
          <div className="profile-container">
            <div className="profile-wrapper">
              <img src="/images/propic2.png" alt="Profile Picture" className="profile-img" />
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
