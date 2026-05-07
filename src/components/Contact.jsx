import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ewp981t';
const EMAILJS_TEMPLATE_ID = 'template_a534vxh';
const EMAILJS_PUBLIC_KEY = 'r2h-ELGYTcchwdWL5';

function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({ from_name: '', from_email: '', subject: '', message: '' });
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMessage = (text, type) => {
    setFormMessage({ text, type });
    setTimeout(() => setFormMessage({ text: '', type: '' }), 5000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { from_name, from_email, subject, message } = formData;
    if (!from_name.trim() || !from_email.trim() || !subject.trim() || !message.trim()) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      showMessage("Thank you! Your message has been sent successfully.", 'success');
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      showMessage('Oops! Something went wrong. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-header">
          <h1 className="section-title">Get In <span>Touch</span></h1>
          <div className="title-underline"></div>
          <p className="contact-subtitle">Have a project in mind or want to collaborate? I'd love to hear from you!</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <p className="info-description">Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="info-details">
                  <h3>Email</h3>
                  <a href="mailto:kavindurishan6@gmail.com">kavindurishan6@gmail.com</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-phone"></i></div>
                <div className="info-details">
                  <h3>Phone</h3>
                  <a href="tel:+94778277802">+94 778 277 802</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="info-details">
                  <h3>Location</h3>
                  <p>166/5, Stanely Thilakarathna Mawatha, Nugegoda</p>
                </div>
              </div>
            </div>
            <div className="footer-socials">
              <a href="https://github.com/kavindurishan" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/kavindu-rishan-modarage-448624330/" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://web.facebook.com/kavindu.rishan.2025" aria-label="Facebook"><i className="fa-brands fa-square-facebook"></i></a>
              <a href="https://wa.me/94778277802" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="contact-form-container">
            <form id="contactForm" className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name"><i className="fa-solid fa-user"></i> Full Name</label>
                <input type="text" id="name" name="from_name" placeholder="Enter your name" required value={formData.from_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email Address</label>
                <input type="email" id="email" name="from_email" placeholder="Enter your email" required value={formData.from_email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="subject"><i className="fa-solid fa-tag"></i> Subject</label>
                <input type="text" id="subject" name="subject" placeholder="What's this about?" required value={formData.subject} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message"><i className="fa-solid fa-message"></i> Message</label>
                <textarea id="message" name="message" rows="6" placeholder="Tell me about your project or inquiry..." required value={formData.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (<><i className="fa-solid fa-spinner fa-spin"></i> Sending...</>) : (<><i className="fa-solid fa-paper-plane"></i> <span id="btnText">Send Message</span></>)}
              </button>
              {formMessage.text && (
                <div id="formMessage" className={`form-message ${formMessage.type}`} style={{ display: 'block' }}>{formMessage.text}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
