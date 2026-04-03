import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Code, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <nav className="border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight">VidyaChain</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/verify" className="text-sm font-medium hover:text-primary transition-colors">Verify</Link>
              {user ? (
                <>
                  <Link 
                    to={user.role === 'admin' ? '/admin' : '/student'} 
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm font-medium text-slate-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                  <Link 
                    to="/register" 
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-border py-8 mt-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ShieldCheck className="h-5 w-5 text-primary opacity-70" />
            <span>© 2026 VidyaChain. Decentralized Academic Trust.</span>
          </div>
          <div className="flex space-x-6">
             <a href="#" className="hover:text-white transition">Privacy Policy</a>
             <a href="#" className="hover:text-white transition">Terms of Service</a>
             <a href="https://github.com/vidyachain" className="flex items-center space-x-1 hover:text-white transition">
               <Code className="w-4 h-4" /> <span>Source</span>
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
