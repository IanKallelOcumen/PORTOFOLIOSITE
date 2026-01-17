import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { BackgroundEffects } from './components/BackgroundEffects';
import { FloatingElements } from './components/FloatingElements';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BackToTop } from './components/BackToTop';
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

  const navigateToView = useCallback((view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  // Memoized view content
  const viewContent = useCallback(() => {
    const navigationBar = (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 relative z-10">
        <Navigation showBack={true} onBack={() => navigateToView('home')} />
      </div>
    );

    switch (currentView) {
      case 'home':
        return null;
      case 'landing':
        return (
          <div>
            {navigationBar}
            <PersonalLandingPage />
          </div>
        );
      case 'todo':
        return (
          <div>
            {navigationBar}
            <TodoApp />
          </div>
        );
      case 'weather':
        return (
          <div>
            {navigationBar}
            <WeatherDashboard />
          </div>
        );
      case 'recipe':
        return (
          <div>
            {navigationBar}
            <RecipeApp />
          </div>
        );
      case 'ecommerce':
        return (
          <div>
            {navigationBar}
            <EcommerceStore />
          </div>
        );
      case 'project-board':
        return (
          <div>
            {navigationBar}
            <ProjectBoard />
          </div>
        );
      case 'resume':
        return (
          <div>
            {navigationBar}
            <Resume />
          </div>
        );
      default:
        return null;
    }
  }, [currentView, navigateToView]);

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

        {currentView !== 'home' && viewContent()}
        
        {currentView === 'home' && <Footer />}
      </div>

      <BackToTop />
    </div>
  );
}