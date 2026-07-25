import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Stars, 
  Text, 
  Float, 
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Sparkles,
  Environment,
  ContactShadows
} from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import './App.css'

// Glassmorphic 3D Shape Component (Spline-style)
function GlassShape({ position, rotation, scale, color, geometry = 'icosahedron' }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + rotation[0]
      meshRef.current.rotation.y = Math.cos(t * 0.2) * 0.2 + rotation[1]
      meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.1 + rotation[2]
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.8, 32, 32]} />}
        {geometry === 'torus' && <torusGeometry args={[0.7, 0.25, 24, 32]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.8}
          roughness={0.15}
          transmission={0.95}
          ior={1.6}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.6}
          temporalDistortion={0.2}
          color={color}
        />
      </mesh>
    </Float>
  )
}

// Animated 3D Name Component
function HeroName3D() {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.rotation.y = Math.sin(t / 3) * 0.05
      groupRef.current.position.y = Math.sin(t / 2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          fontSize={2.8}
          letterSpacing={-0.08}
          fontWeight={800}
          anchorX="center"
          anchorY="middle"
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          SHIVENDRA
          <meshStandardMaterial 
            color={hovered ? "#64ffda" : "#ffffff"} 
            emissive={hovered ? "#64ffda" : "#000000"}
            emissiveIntensity={hovered ? 0.8 : 0}
            roughness={0.1}
            metalness={0.9}
          />
        </Text>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15} position={[0, -1.3, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          fontSize={1.3}
          letterSpacing={0.15}
          fontWeight={500}
          anchorX="center"
          anchorY="middle"
          color="#a8b2d1"
        >
          KUMAR
        </Text>
      </Float>
    </group>
  )
}

// 3D Background Scene with Spline aesthetics
function Scene() {
  return (
    <>
      <Stars radius={150} depth={70} count={8000} factor={5} saturation={0} fade speed={0.8} />
      <Sparkles count={150} scale={14} size={5} speed={0.3} opacity={0.6} color="#64ffda" />
      
      <ambientLight intensity={0.6} />
      <spotLight position={[15, 15, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
      <pointLight position={[-15, -10, -10]} intensity={0.8} color="#64ffda" />
      <pointLight position={[10, 10, -5]} intensity={0.6} color="#ff0080" />
      
      {/* Glassmorphic floating shapes */}
      <GlassShape position={[-6, 3, -8]} rotation={[0.3, 0.2, 0.1]} scale={3} color="#4facfe" geometry="icosahedron" />
      <GlassShape position={[6, -3, -7]} rotation={[-0.2, -0.3, 0.15]} scale={3.5} color="#00f2fe" geometry="sphere" />
      <GlassShape position={[-5, -4, -6]} rotation={[0.15, -0.25, 0.2]} scale={2.2} color="#64ffda" geometry="octahedron" />
      <GlassShape position={[5, 4, -9]} rotation={[-0.25, 0.15, -0.1]} scale={2.8} color="#ff0080" geometry="torus" />
      <GlassShape position={[0, 5, -10]} rotation={[0.1, 0.1, 0]} scale={2} color="#ffe66d" geometry="icosahedron" />
      
      {/* 3D Name in center */}
      <HeroName3D />
      
      <ContactShadows 
        position={[0, -4, 0]} 
        opacity={0.5} 
        scale={25} 
        blur={2.5} 
        far={5} 
        color="#000000" 
      />
      
      <Environment preset="city" />
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
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <Scene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>
      
      <div className="content-wrapper">
        {/* Hero Section */}
        <Section id="hero" color="transparent">
          <div className="hero-content">
            <h1 className="hero-greeting">Hello, I'm</h1>
            <p className="hero-description">
              DevOps Engineer | Full Stack Developer | Cloud Enthusiast
            </p>
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
