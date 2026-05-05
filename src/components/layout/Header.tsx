import { Link } from 'react-router-dom';
import successAcademyLogo from '@/assets/success-academy-logo.png';

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <img src={successAcademyLogo} alt="Success Academy" className="h-9" />
        <div>
          <h1 className="text-lg font-semibold text-foreground leading-tight">
            Content Management System
          </h1>
        </div>
      </Link>
      <nav className="flex items-center gap-4">
        <Link 
          to="/" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Search
        </Link>
        <Link 
          to="/browse" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Browse
        </Link>
      </nav>
    </header>
  );
}
