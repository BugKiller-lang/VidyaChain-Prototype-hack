import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Award, Calendar, Hash, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCerts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/student/my-certificates');
        setCerts(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchMyCerts();
  }, []);

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center text-primary">Loading your vault...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-2">My Credential Vault</h1>
      <p className="text-slate-400 mb-10">Access and share your blockchain-verified academic certificates.</p>

      {certs.length === 0 ? (
        <div className="glass p-12 text-center rounded-xl">
          <Award className="w-16 h-16 mx-auto text-slate-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No credentials yet</h3>
          <p className="text-slate-400">Certificates issued to your email will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, index) => (
            <motion.div 
              key={cert._id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full">
                  Verified
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{cert.degree}</h3>
              <p className="text-slate-300 font-medium mb-4">{cert.institution}</p>
              
              <div className="space-y-2 text-sm text-slate-400 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4" />
                  <span className="font-mono text-xs truncate" title={cert.fileHash}>{cert.fileHash.substring(0, 16)}...</span>
                </div>
              </div>

              <Link 
                to={`/verify/${cert.uniqueId}`}
                className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors border border-slate-700"
              >
                <span>View Public Link</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
