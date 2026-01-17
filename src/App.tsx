import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { BackgroundEffects } from './components/BackgroundEffects';
import { FloatingElements } from './components/FloatingElements';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { PersonalLandingPage } from './components/projects/PersonalLandingPage';
import { TodoApp } from './components/projects/TodoApp';
import { WeatherDashboard } from './components/projects/WeatherDashboard';
import { RecipeApp } from './components/projects/RecipeApp';
import { EcommerceStore } from './components/projects/EcommerceStore';
import { ProjectBoard } from './components/projects/ProjectBoard';
import { CursorEffects } from './components/CursorEffects';
import { Resume } from './components/Resume';

type View = 'home' | 'landing' | 'todo' | 'weather' | 'recipe' | 'ecommerce' | 'project-board' | 'resume';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame to throttle updates
      rafRef.current = requestAnimationFrame(() => {
        // Only update if position actually changed significantly (reduce unnecessary renders)
        const deltaX = Math.abs(e.clientX - lastPositionRef.current.x);
        const deltaY = Math.abs(e.clientY - lastPositionRef.current.y);
        
        if (deltaX > 5 || deltaY > 5) {
          lastPositionRef.current = { x: e.clientX, y: e.clientY };
          setMousePosition({ x: e.clientX, y: e.clientY });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const navigateToView = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden touch-manipulation">
      {currentView === 'home' && (
        <>
          <BackgroundEffects mousePosition={mousePosition} />
          <FloatingElements />
          <CursorEffects mousePosition={mousePosition} />
        </>
      )}
      
      <div className={currentView === 'home' ? 'max-w-[1400px] mx-auto min-h-screen px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10' : ''}>
        {currentView === 'home' && (
          <Navigation 
            showBack={false} 
            onBack={() => navigateToView('home')}
          />
        )}

        {currentView === 'home' && (
          <HomeView onProjectClick={navigateToView} mousePosition={mousePosition} />
        )}
        {currentView === 'landing' && (
          <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
              <Navigation showBack={true} onBack={() => navigateToView('home')} />
            </div>
            <PersonalLandingPage />
          </div>
        )}
        {currentView === 'todo' && (
          <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
              <Navigation showBack={true} onBack={() => navigateToView('home')} />
            </div>
            <TodoApp />
          </div>
        )}
        {currentView === 'weather' && (
          <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
              <Navigation showBack={true} onBack={() => navigateToView('home')} />
            </div>
            <WeatherDashboard />
          </div>
        )}
        {currentView === 'recipe' && (
          <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
              <Navigation showBack={true} onBack={() => navigateToView('home')} />
            </div>
            <RecipeApp />
          </div>
        )}
        {currentView === 'ecommerce' && (
          <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
              <Navigation showBack={true} onBack={() => navigateToView('home')} />
            </div>
            <EcommerceStore />
          </div>
        )}
        {currentView === 'project-board' && (
          <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
              <Navigation showBack={true} onBack={() => navigateToView('home')} />
            </div>
            <ProjectBoard />
          </div>
        )}
        {currentView === 'resume' && (
          <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
              <Navigation showBack={true} onBack={() => navigateToView('home')} />
            </div>
            <Resume />
          </div>
        )}
        
        {currentView === 'home' && <Footer />}
      </div>
    </div>
  );
}