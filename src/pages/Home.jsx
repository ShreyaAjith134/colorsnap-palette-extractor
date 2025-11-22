/*Home.jsx*/
import { Link } from 'react-router-dom';
import Header from "../components/Header";  // Import from components folder
import './Home.css';
import mainSplash from '../assets/main-splash.png';

// LinkButton component that combines Link and PositionedButton
function LinkButton({ to, x, y, children, className = '' }) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <button 
        className={`btn ${className}`.trim()}
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`
        }}
      >
        {children}
      </button>
    </Link>
  );
}

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="main-splash">
        <img src={mainSplash} alt="Main Splash" className="main-splash-img"/>
      </div>
      
      <LinkButton to="/upload" x={580} y={400} className="primary">
        Try Now
      </LinkButton>
    </div>
  );
}

export default Home;