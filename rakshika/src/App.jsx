import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// New Architecture: Route Management Integration
import AppRoutes from './routes/AppRoutes.jsx'

// Strictly Preserved Existing Imports
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  // Strictly Preserved Existing State
  const [count, setCount] = useState(0)

  // Real Rakshika System State Logic
  const [user, setUser] = useState(null)
  const [authResolved, setAuthResolved] = useState(false)
  const [showLegacyBoilerplate, setShowLegacyBoilerplate] = useState(false)

  // System Hook: Real-time Firebase Authentication Gate
  useEffect(() => {
    try {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setAuthResolved(true);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase Auth not initialized. Ensure firebase.js is configured.", error);
      setAuthResolved(true);
    }
  }, [])

  // Security Gate Loading State
  if (!authResolved) {
    return (
      <div className="h-screen w-full bg-dark flex flex-col items-center justify-center text-safe">
        <div className="w-12 h-12 border-4 border-safe border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-sans text-sm tracking-widest uppercase">Initializing Security Layer...</p>
      </div>
    )
  }

  // Real Application Router Mount
  if (!showLegacyBoilerplate) {
    return (
      <BrowserRouter>
        <AppRoutes user={user} />
      </BrowserRouter>
    )
  }

  // Strictly Preserved Existing Code Block
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App