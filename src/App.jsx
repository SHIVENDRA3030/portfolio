import './App.css'
import Scene3D from './components/Scene3D'

function App() {
  return (
    <>
      <Scene3D />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Welcome to My Portfolio
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            maxWidth: '600px',
            opacity: 0.9
          }}>
            Creative Developer & 3D Enthusiast
          </p>
          <button style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Explore My Work
          </button>
        </section>

        {/* About Section */}
        <section style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 2rem',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About Me</h2>
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '800px', 
            lineHeight: 1.8,
            textAlign: 'center'
          }}>
            I'm a passionate developer with expertise in creating immersive web experiences. 
            With a strong foundation in modern web technologies and a love for 3D graphics, 
            I bring ideas to life through interactive and visually stunning applications.
          </p>
        </section>

        {/* Skills Section */}
        <section style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 2rem'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Skills</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            width: '100%'
          }}>
            {['React', 'Three.js', 'TypeScript', 'Node.js', 'WebGL', 'Python'].map((skill, index) => (
              <div key={skill} style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{skill}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 2rem',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Projects</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%'
          }}>
            {[1, 2, 3].map((project) => (
              <div key={project} style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Project {project}</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                  An innovative solution built with cutting-edge technologies to solve real-world problems.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Get In Touch</h2>
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '600px', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Interested in working together? Let's connect and create something amazing!
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Email', 'LinkedIn', 'GitHub', 'Twitter'].map((social) => (
              <button key={social} style={{
                padding: '0.8rem 1.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.borderColor = 'rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
              >
                {social}
              </button>
            ))}
          </div>
          <footer style={{
            marginTop: '4rem',
            opacity: 0.7,
            fontSize: '0.9rem'
          }}>
            © 2024 My Portfolio. Built with React Three Fiber.
          </footer>
        </section>
      </div>
    </>
  )
}

export default App
