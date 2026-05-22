import { useEffect, useMemo, useRef, useState } from 'react';
import { AuthStatusBar } from './AuthGate';
import { ProtectedContent } from './ProtectedContent';

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'internships' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const MARQUEE_ITEMS = [
  'Quality Auditing',
  'Risk Assessment',
  'Process Development',
  'Data Analytics',
  'Microsoft Office',
  'Compliance Reporting',
  'Project Management',
  'Web App Development',
  'Visual Basic Application',
  'Automation Reports',
  'Quality Auditing',
  'Risk Assessment',
  'Process Development',
  'Data Analytics',
  'Microsoft Office',
  'Compliance Reporting',
  'Project Management',
];

const SKILLS = [
  {
    icon: '📊',
    name: 'Quality Auditing',
    desc: 'Experienced in audit standards, compliance checks, and operational auditing.',
    pct: 95,
  },
  {
    icon: '📈',
    name: 'Risk Assessment Analysis',
    desc: 'Identifying risks, control gaps, and recommending corrective actions.',
    pct: 90,
  },
  {
    icon: '🗂️',
    name: 'Process Development',
    desc: 'Designing and improving workflows and reporting processes.',
    pct: 88,
  },
  {
    icon: '💻',
    name: 'Web & Desktop Applications',
    desc: 'Ability to develop desktop and web-based systems.',
    pct: 80,
  },
  {
    icon: '📑',
    name: 'Microsoft Applications',
    desc: 'Advanced use of Microsoft Office and reporting tools.',
    pct: 92,
  },
  {
    icon: '⚙️',
    name: 'Automation & Analytics',
    desc: 'Automating reports and analyzing business operational data.',
    pct: 85,
  },
];

const INTERNSHIPS = [
  {
    role: 'Information Systems Auditor',
    company: 'Unlimited Network of Opportunities International Corp.',
    desc: 'Develop and execute plans and procedures based on approved annual audit plan. Perform audits of online platforms, IT Infrastructure, testing, and penetration report. Reconciliation/Balancing of Financial & Operational Records. Evaluate and conclude upon the operating effectiveness of operating system/database security, user security, segregation of duties, interface security/error monitoring, systems change. management, and IT risk posture of 3rd party service providers, among others. Evaluate system security, and operational efficiency of IT systems. Perform external vulnerability and internal infrastructure/application security assurance reviews. Document results of audit procedures in the form of audit working papers.Prepare and maintain audit reports, documenting findings, recommendations, and the status of corrective actions. Recommend improvements to enhance operations and mitigate vulnerabilities. Participate in discussion of audit results with the stakeholders and board of directors.',
  },
  {
    role: 'Quality Audit Lead',
    company: 'Unisys',
    desc: 'Reviewed contracts, streamlined reporting processes, and trained junior auditors.',
  }, 
  {
    role: 'Senior Audit Officer',
    company: 'S1 Technologies',
    desc: 'Reviewed contracts, streamlined reporting processes, and trained junior auditors.',
  },
  {
    role: 'Field Audit Supervisor',
    company: 'Ginebra San Miguel',
    desc: 'Managed audit activities, mentored junior auditors, and ensured regulatory compliance.',
  },
];

const PROJECTS = [
  {
    num: '01',
    title: 'KRAJN IT Consulting Services',
    desc: 'Business systems development and IT consulting solutions.',
    tags: ['IT Consulting', 'Web Apps', 'Automation'],
    link: 'https://krajn.netlify.app/',
  },
  {
    num: '02',
    title: 'Compliance Reporting Automation',
    desc: 'Automated compliance and audit reporting system for operational efficiency.',
    tags: ['Automation', 'Reporting', 'Audit'],
    link: '#',
  },
  {
    num: '03',
    title: 'Audit Monitoring Dashboard',
    desc: 'Centralized dashboard for tracking audit findings and corrective actions.',
    tags: ['Dashboard', 'Analytics', 'Audit'],
    link: '#',
  },
  {
    num: '04',
    title: 'Business Process Tracking',
    desc: 'Internal monitoring and workflow tracking solution for operations.',
    tags: ['Process', 'Workflow', 'Management'],
    link: '#',
  },
];

const CERTIFICATIONS = [
  { icon: '🎓', name: 'Lean Six Sigma Course' },
  { icon: '🔐', name: 'Data Privacy Protection & Awareness' },
  { icon: '📘', name: 'Strategic Project Management' },
  { icon: '💡', name: 'Design Thinking 101' },
];

const STATS = [
  { num: '10+', label: 'Years Experience' },
  { num: '500+', label: 'Audit Reports' },
  { num: '5+', label: 'Systems Developed' },
  { num: '100%', label: 'Commitment' },
];

const TECH_TAGS = [
  'Auditing',
  'Compliance',
  'Risk Assessment',
  'Data Analytics',
  'Microsoft Office',
  'Visual Basic Applications',
  'Web Development',
  'Process Improvement',
  'Project Management',
  'Back End Automation',
];

const resumeUrl = '/Resume_Ken_Rante.pdf';

// Generate a unique key for resume downloads
const generateDownloadKey = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${timestamp}-${randomSuffix}`;
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    'bot-field': '',
  });

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const roleRef = useRef(null);

  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  const scrollTo = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    setMenuOpen(false);
  };

  const handleResumeDownload = (event) => {
    event.preventDefault();
    
    // Generate a unique download key
    const downloadKey = generateDownloadKey();
    
    // Store download metadata in localStorage for tracking
    const downloads = JSON.parse(localStorage.getItem('resumeDownloads') || '[]');
    downloads.push({
      key: downloadKey,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('resumeDownloads', JSON.stringify(downloads));
    
    // Create filename with download key
    const filename = `Resume_Ken_Rante_${downloadKey}.pdf`;
    
    // Fetch and download the PDF with the key metadata
    fetch(resumeUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Download failed:', error));
  };

  useEffect(() => {
    const roles = [
      'Quality Audit Lead',
      'Information Systems',
      'IT Consultant',
      'Process Improvement Specialist',
      'Risk Assessment Analyst',
      'Full Stack Developer',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const type = () => {
      const currentRole = roles[roleIndex];

      const text = deleting
        ? currentRole.slice(0, charIndex - 1)
        : currentRole.slice(0, charIndex + 1);

      if (roleRef.current) {
        roleRef.current.textContent = `Experienced Auditor — ${text}`;
      }

      if (!deleting) {
        charIndex += 1;

        if (charIndex === currentRole.length) {
          deleting = true;
          timeoutId = window.setTimeout(type, 1800);
          return;
        }
      } else {
        charIndex -= 1;

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      timeoutId = window.setTimeout(type, deleting ? 40 : 80);
    };

    timeoutId = window.setTimeout(type, 500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    document
      .querySelectorAll('section')
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus('invalid');
      setErrorMessage('Please complete all fields.');
      return;
    }

    if (form['bot-field']) {
      setStatus('error');
      setErrorMessage('Bot submission blocked.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const formData = new FormData(event.target);

      if (formspreeEndpoint) {
        await fetch(formspreeEndpoint, {
          method: 'POST',
          body: formData,
        });
      } else {
        await fetch('/', {
          method: 'POST',
          body: formData,
        });
      }

      setStatus('success');

      setForm({
        name: '',
        email: '',
        message: '',
        'bot-field': '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        'Unable to send message right now. Please try again later.'
      );
    }
  };

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={
              activeSection === item.id ? 'nav-link active' : 'nav-link'
            }
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        </li>
      )),
    [activeSection]
  );

  return (
    <div className="app-shell">
      <AuthStatusBar />
      
      <header className="site-header">
        <button
          type="button"
          className="logo"
          onClick={() => scrollTo('hero')}
        >
          KR
        </button>

        <button
          type="button"
          className="menu-toggle"
          aria-label={
            menuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? '✕' : '☰'}</span>
        </button>

        <nav className={menuOpen ? 'site-nav open' : 'site-nav'}>
          <ul>{navItems}</ul>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-background" />

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">
                // Informations Systems Auditor || Project & IT Consultant
              </p>

              <h1>
                Ken Redel
                <br />
                <span>Rante</span>
              </h1>

              <p ref={roleRef} className="hero-role">
                Professional Auditor — IT Consultant
              </p>

              <div className="hero-buttons">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => scrollTo('projects')}
                >
                  View Work
                </button>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => scrollTo('contact')}
                >
                  Let's Talk
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="resume-badge">
                <a
                  href={resumeUrl}
                  onClick={handleResumeDownload}
                  className="badge-link"
                >
                  <span>⬇</span> Download CV
                </a>
              </div>

              <div className="hero-card">
                <div className="photo-frame">
                  <img
                    src="/profile.jpg"
                    alt="Ken Redel Rante portrait"
                    className="hero-photo"
                  />
                </div>

                <div className="photo-label">
                  Open for Career Growth, Consulting & Projects
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee">
            {MARQUEE_ITEMS.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="marquee-item"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <section id="about" className="section-block">
          <div className="section-head">
            <span className="section-label">About Me</span>

            <h2>
              Turning <span>Ideas</span>
              <br />
              Into Solutions
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-number">{stat.num}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="about-copy">
              <p>
                Hey! I'm <strong>Ken Redel Rante</strong> — Founder of KRAJN IT Consulting Services and a seasoned auditor with
                extensive experience in auditing, compliance, operational improvement, and business systems development. 
				I specialize in internal controls auditing, process improvement, Beyond auditing, automation reporting, 
				and IT consulting solutions that help organizations improve efficiency and compliance.
				I am a <strong>professional IT projects lead and a full stack developer</strong>,
				specializing in designing, deploying, and maintaining enterprise-grade solutions.
				My expertise spans modern web frameworks, database optimization, cloud 
				integration, and scalable system architecture — enabling businesses to 
				achieve both technical reliability and operational transparency.
				</p>

              <p>
                I'm open for consulting, auditing projects, system
                development, and career growth opportunities.
              </p>

              <div className="tech-tags">
                {TECH_TAGS.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="section-block section-alt"
        >
          <div className="section-head">
            <span className="section-label">Core Expertise</span>

            <h2>
              Professional <span>Skills</span>
            </h2>
          </div>

          <div className="skills-grid">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>

                <div className="skill-name">{skill.name}</div>

                <div className="skill-desc">{skill.desc}</div>

                <div className="skill-bar-wrap">
                  <div
                    className="skill-bar"
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <ProtectedContent>
          <section id="internships" className="section-block">
            <div className="section-head">
              <span className="section-label">Experience</span>

              <h2>
                Professional <span>Experience</span>
              </h2>
            </div>

            <div className="internships-grid">
              {INTERNSHIPS.map((item) => (
                <article
                  key={item.company}
                  className="internship-card"
                >
                  <h3>{item.role}</h3>

                  <p className="company-name">{item.company}</p>

                  <p>{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="section-head section-head--compact">
              <span className="section-label">Credentials</span>

              <h2>
                Certifi<span>cations</span>
              </h2>
            </div>

            <div className="certs-grid">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="cert-card">
                  <div className="cert-icon">{cert.icon}</div>

                  <div className="cert-name">{cert.name}</div>
                </div>
              ))}
            </div>
          </section>
        </ProtectedContent>

        <ProtectedContent>
          <section
            id="projects"
            className="section-block section-alt"
          >
            <div className="section-head">
              <span className="section-label">Selected Work</span>

              <h2>
                Featured <span>Projects</span>
              </h2>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((project) => (
                <a
                  key={project.num}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                >
                  <div className="project-index">
                    {project.num}
                  </div>

                  <div className="project-body">
                    <h3>{project.title}</h3>

                    <p>{project.desc}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="project-arrow">↗</span>
                </a>
              ))}
            </div>
          </section>
        </ProtectedContent>

        <section id="contact" className="section-block">
          <div className="section-head">
            <span className="section-label">Get In Touch</span>

            <h2>
              Let's Build
              <br />
              <span>Something</span>
              <br />
              Great.
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-copy">
              <p>
                I'm open for consulting, auditing projects,
                business system development, and collaborative
                opportunities.
              </p>

              <div className="contact-links">
                <a
                  href="mailto:iamkenrante@gmail.com"
                  className="contact-link"
                >
                  ✉ iamkenrante@gmail.com
                </a>

                <a
                  href="tel:+639602857779"
                  className="contact-link"
                >
                  ☎ +63 960 285 7779
                </a>

                <a
                  href="https://krajn.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  ◈ KRAJN IT Consulting Services
                </a>
              </div>
            </div>

            <div className="contact-form-card">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="contact"
                />

                <input
                  type="hidden"
                  name="bot-field"
                  value={form['bot-field']}
                />

                <label className="field-label">
                  Name

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className="field-label">
                  Email

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="field-label">
                  Message

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about your project..."
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="btn-primary btn-submit"
                >
                  {status === 'sending'
                    ? 'Sending…'
                    : status === 'success'
                    ? 'Message Sent ✓'
                    : 'Send Message'}
                </button>

                {status === 'invalid' && (
                  <p className="form-status form-status--warning">
                    {errorMessage}
                  </p>
                )}

                {status === 'error' && (
                  <p className="form-status form-status--error">
                    {errorMessage}
                  </p>
                )}

                {status === 'success' && (
                  <p className="form-status form-status--success">
                    Thanks! I’ll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>
          © 2026 Ken Redel Rante | KRAJN IT Consulting
          Services | Philippines
        </span>

        <span className="footer-brand">KR</span>
      </footer>
    </div>
  );
}

export default App;