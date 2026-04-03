import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'admin') navigate('/admin');
      else navigate('/student');
    } catch (err) {
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or <Link to="/register" className="font-medium text-primary hover:text-blue-400">create a new account</Link>
        </p>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-slate-300">Email address</label>
              <div className="mt-1">
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full appearance-none rounded-md border border-border bg-slate-800/50 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1">
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full appearance-none rounded-md border border-border bg-slate-800/50 px-3 py-2 text-white placeholder-slate-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 items-center space-x-2 transition-all">
                <LogIn className="w-4 h-4" />
                <span>Sign in</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
