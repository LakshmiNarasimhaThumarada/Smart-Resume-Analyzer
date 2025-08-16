import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
 // Assuming NavBar is in src/components
import AnalyzePage from './pages/AnalyzePage';
import ResultPage from './pages/Resultpage';
import JobDescriptionPage from './pages/JobDescriptionPage';
import Footer from './components/Footer'; // Assuming Footer is in src/components
import AINewsPage from './components/AINewsPage'; // Assuming AINewsPage is in src/components


function App() {
  return (
    <BrowserRouter>
      {/* NavBar is placed here, outside of Routes, so it always renders */}


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/job-descriptions" element={<JobDescriptionPage />} />
        {/* Make sure this path matches the Link in your NavBar if you renamed it */}
        <Route path="/ai-news-page" element={<AINewsPage />} /> {/* Changed path to match your NavBar's link for consistency */}
  
        <Route path="/result" element={<ResultPage />} />
      </Routes>

      {/* Footer is placed here, outside of Routes, so it always renders */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;