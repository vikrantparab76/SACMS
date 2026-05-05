import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LayoutGrid } from 'lucide-react';
import successAcademyLogo from '@/assets/success-academy-logo.png';

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/browse');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <LayoutGrid className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Content Management System</h1>
          <img src={successAcademyLogo} alt="Success Academy" className="h-5 mx-auto" />
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to access the CMS</p>
          </div>

          <Button 
            onClick={handleLogin}
            className="w-full h-12 text-base gap-2"
            size="lg"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 Success Academy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Index;
