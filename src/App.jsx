import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import './App.css'

// 3D Background Component
function Scene() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-5, 2, -5]}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#ff6b6b" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[5, -2, -3]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <MeshDistortMaterial color="#4ecdc4" distort={0.3} speed={1.5} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={0.8}>
        <mesh position={[-4, -3, -6]}>
          <octahedronGeometry args={[1.2]} />
          <MeshDistortMaterial color="#ffe66d" distort={0.5} speed={1.8} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[4, 3, -4]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial color="#ff9ff3" distort={0.6} speed={2.2} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </>
  )
}

// Section Component with 3D scroll effect
function Section({ children, id, color }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`section ${isVisible ? 'visible' : ''}`}
      style={{ backgroundColor: color }}
    >
      <div className="section-content">
        {children}
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Scene />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div className="content-wrapper">
        {/* Hero Section */}
        <Section id="hero" color="transparent">
          <div className="hero-content">
            <h1 className="glitch" data-text="Shivendra Kumar">Shivendra Kumar</h1>
            <p className="subtitle">BTech Computer Science Student | DevOps Enthusiast | Web Developer</p>
            <div className="contact-info">
              <p>📧 shivendra9795kumar@gmail.com</p>
              <p>📱 +91 8052758722</p>
              <p>📍 Mathura</p>
            </div>
            <div className="cta-buttons">
              <a href="#projects" className="btn primary">View Projects</a>
              <a href="#contact" className="btn secondary">Contact Me</a>
            </div>
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" color="rgba(26, 26, 46, 0.9)">
          <h2>About Me</h2>
          <p className="objective">
            Motivated BTech student in Computer Science with leadership experience as General Secretary of CSED Club. 
            Passionate about DevOps, web development, and cloud technologies, with strong foundation in software 
            development driving my commitment to innovation.
          </p>
          
          <div className="education-card glass-card">
            <h3>🎓 Education</h3>
            <div className="edu-item">
              <h4>B.Tech, Computer Science</h4>
              <p>GLA University, Mathura</p>
              <p>2023 - 2027</p>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" color="rgba(15, 52, 96, 0.9)">
          <h2>Projects</h2>
          
          <div className="project-grid">
            <div className="project-card glass-card">
              <h3>🚚 Delhivery Clone - Logistics Platform</h3>
              <p className="project-date">Nov 2025 - Present</p>
              <p>Features real-time package tracking, multiple delivery modes (Express, Truck, Supply Chain), 
                 live status updates, interactive dashboard with analytics, pickup scheduling, rate calculator, and admin panel.</p>
              <div className="tech-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Real-time</span>
              </div>
              <a href="#" className="project-link">View Project ↗</a>
            </div>

            <div className="project-card glass-card">
              <h3>💻 CodeCraft Enterprise - College Coding Assessment SaaS</h3>
              <p className="project-date">Feb 2026 - Present</p>
              <p>Developed a SaaS coding platform for colleges with secure online exams, auto-grading, role-based portals, 
                 and analytics, plus Judge0 execution and LeetCode/Codeforces integration.</p>
              <div className="tech-tags">
                <span>SaaS</span>
                <span>Auto-grading</span>
                <span>Judge0</span>
                <span>Analytics</span>
              </div>
              <a href="#" className="project-link">View Project ↗</a>
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" color="rgba(26, 26, 46, 0.9)">
          <h2>Skills & Expertise</h2>
          
          <div className="skills-container">
            <div className="skill-category glass-card">
              <h3>🚀 Development</h3>
              <div className="skill-tags">
                <span>React</span>
                <span>Angular 2.0/7.0</span>
                <span>Node.js</span>
                <span>JavaScript</span>
                <span>Python</span>
                <span>HTML/CSS</span>
                <span>MongoDB</span>
              </div>
            </div>

            <div className="skill-category glass-card">
              <h3>☁️ DevOps & Cloud</h3>
              <div className="skill-tags">
                <span>DevOps</span>
                <span>Software Testing</span>
                <span>GitHub</span>
              </div>
            </div>

            <div className="skill-category glass-card">
              <h3>🤖 AI & GenAI Tools</h3>
              <div className="skill-tags">
                <span>Vibe Coding</span>
                <span>Claude</span>
                <span>Prompt Engineering</span>
                <span>GitHub Copilot</span>
                <span>Cursor</span>
                <span>Lovable</span>
                <span>Replit</span>
                <span>Windsurf</span>
              </div>
            </div>

            <div className="skill-category glass-card">
              <h3>🎨 Design & Others</h3>
              <div className="skill-tags">
                <span>Canva</span>
                <span>WordPress</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Achievements Section */}
        <Section id="achievements" color="rgba(15, 52, 96, 0.9)">
          <h2>Achievements & Activities</h2>
          
          <div className="achievements-grid">
            <div className="achievement-card glass-card">
              <h3>🏆 Smart India Hackathon 2025</h3>
              <p>Secured 3rd place in Internal Smart India Hackathon 2025 (Software Category)</p>
            </div>

            <div className="achievement-card glass-card">
              <h3>⭐ Featured on 21st.dev</h3>
              <p>Frontend UI component "Halide Topo Hero" featured in Best of the Week on 21st.dev</p>
            </div>

            <div className="achievement-card glass-card">
              <h3>🌐 AR Cultural Heritage Platform</h3>
              <p>Developed AR-Based Cultural Heritage Preservation Platform with low-bandwidth support for rural users</p>
            </div>

            <div className="achievement-card glass-card">
              <h3>📸 Published Photographer</h3>
              <p>Published photographer on iStock</p>
            </div>
          </div>

          <div className="leadership-section glass-card">
            <h3>👔 Leadership Experience</h3>
            <div className="timeline">
              <div className="timeline-item">
                <h4>General Secretary, CSED Club</h4>
                <p>Led teams, coordinated club operations, and organized technical and skill-development events</p>
              </div>
              <div className="timeline-item">
                <h4>Media Cell Head → Co-Head → Design Team Member</h4>
                <p>Progressed through roles managing media, branding, and digital outreach for club activities</p>
              </div>
              <div className="timeline-item">
                <h4>TechStars'25 Organizer</h4>
                <p>Part of organizing committee for 3-day startup event promoting innovation and entrepreneurship</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" color="transparent">
          <div className="contact-section glass-card">
            <h2>Get In Touch</h2>
            <p>Ready to collaborate on innovative projects? Let's connect!</p>
            
            <div className="contact-links">
              <a href="mailto:shivendra9795kumar@gmail.com" className="contact-btn">
                📧 Email Me
              </a>
              <a href="tel:+918052758722" className="contact-btn">
                📱 Call Me
              </a>
              <a href="https://github.com/SHIVENDRA3030" target="_blank" rel="noopener noreferrer" className="contact-btn">
                💼 GitHub
              </a>
              <a href="#" className="contact-btn">
                📄 Portfolio ↗
              </a>
            </div>
            
            <footer>
              <p>&copy; 2025 Shivendra Kumar. All rights reserved.</p>
            </footer>
          </div>
        </Section>
      </div>
    </>
  )
}

export default App
