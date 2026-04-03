import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(formData.name, formData.email, formData.password, formData.role);
      if (user.role === 'admin') navigate('/admin');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed.');
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Create your account</h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:text-blue-400">Sign in</Link>
        </p>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-slate-300">Name</label>
              <div className="mt-1">
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="block w-full rounded-md border border-border bg-slate-800/50 px-3 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Email address</label>
              <div className="mt-1">
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="block w-full rounded-md border border-border bg-slate-800/50 px-3 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1">
                <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="block w-full rounded-md border border-border bg-slate-800/50 px-3 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Role (For Demo)</label>
              <div className="mt-1">
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="block w-full rounded-md border border-border bg-slate-800/50 px-3 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm">
                  <option value="student">Student</option>
                  <option value="admin">Admin / University</option>
                </select>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none items-center space-x-2 transition-all">
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
