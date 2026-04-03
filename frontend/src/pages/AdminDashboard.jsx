import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, CheckCircle, Copy, Link as LinkIcon, AlertTriangle, 
  LayoutDashboard, Activity, CheckSquare, Zap, ShieldAlert, Cpu, FileDiff, 
  Users, Bell, Play, FileSearch, X, Loader2, Award
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

// --- STUB DATA FOR CHARTS ---
const lineData = [
  { name: 'Mon', verifications: 40 }, { name: 'Tue', verifications: 30 },
  { name: 'Wed', verifications: 60 }, { name: 'Thu', verifications: 45 },
  { name: 'Fri', verifications: 90 }, { name: 'Sat', verifications: 65 },
  { name: 'Sun', verifications: 120 }
];
const barData = [
  { name: 'Jan', genuine: 400, fake: 24 }, { name: 'Feb', genuine: 300, fake: 13 },
  { name: 'Mar', genuine: 550, fake: 48 }, { name: 'Apr', genuine: 450, fake: 18 }
];
const pieData = [
  { name: 'QR Scan', value: 65 }, { name: 'PDF Upload', value: 25 }, { name: 'API Check', value: 10 }
];
const COLORS = ['#8b5cf6', '#3b82f6', '#10b981'];

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="glass p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-default">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${color} group-hover:opacity-40 transition-opacity`}></div>
    <div className="flex justify-between items-start">
      <div>
         <p className="text-slate-400 text-sm font-medium">{title}</p>
         <h3 className="text-4xl font-bold text-white mt-2 tracking-tight">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-white/5`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  // Issue States
  const [formData, setFormData] = useState({ studentName: '', studentEmail: '', institution: '', degree: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [issuedCerts, setIssuedCerts] = useState([]);

  // AI & Tamper States
  const [aiScore, setAiScore] = useState(null);
  const [tamperCheck, setTamperCheck] = useState(false);

  // Simulated WebSocket Effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-[#1e293b]/90 backdrop-blur-lg shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-white/10 overflow-hidden`}>
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-bold text-white">Live Verification</p>
                  <p className="mt-1 text-sm text-slate-300">Google Inc. verified Jane Doe's B.Sc via API.</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-white/10">
              <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-white">Close</button>
            </div>
          </div>
        ));
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const runHackathonDemo = async () => {
    setIsDemoRunning(true);
    toast.success('Initializing Neural Check Network Protocol...', { icon: '🧠', duration: 3000 });
    
    await new Promise(r => setTimeout(r, 2000));
    setActiveTab('issue');
    toast('Automating Certificate Issuance...', { icon: '🤖' });
    
    setFormData({ studentName: 'Alan Turing', studentEmail: 'alan@demo.com', institution: 'Demo University', degree: 'Ph.D Cryptography' });
    
    await new Promise(r => setTimeout(r, 2000));
    toast.success('Ledger Merged & QR Generated!', { icon: '🔗' });
    
    await new Promise(r => setTimeout(r, 2000));
    setActiveTab('ai_detect');
    toast.error('ALERT: Suspect Document Uploaded locally...', { duration: 4000 });
    
    await new Promise(r => setTimeout(r, 2000));
    setAiScore({ score: 14, flags: ['Signature mismatch detected', 'Font rendering inconsistency across regions'] });
    
    await new Promise(r => setTimeout(r, 3000));
    setActiveTab('overview');
    toast('Demo Sequence Complete.', { icon: '🎬' });
    setIsDemoRunning(false);
  };

  const handleIssue = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please upload a document to hash');
    setLoading(true);
    const data = new FormData();
    data.append('document', file);
    data.append('studentName', formData.studentName);
    data.append('studentEmail', formData.studentEmail);
    data.append('institution', formData.institution);
    data.append('degree', formData.degree);

    try {
      const res = await axios.post('http://localhost:5000/api/admin/issue', data);
      toast.success('Certificate Issued Successfully');
      setIssuedCerts([res.data.certificate, ...issuedCerts]); // mock response
      setFormData({ studentName: '', studentEmail: '', institution: '', degree: '' });
      setFile(null);
    } catch (err) {
      toast.error('Error issuing certificate');
    }
    setLoading(false);
  };

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'issue', icon: Zap, label: 'Issue Certificate' },
    { id: 'ai_detect', icon: Cpu, label: 'AI Detection' },
    { id: 'tamper', icon: FileDiff, label: 'Tamper Check' },
    { id: 'bulk_verify', icon: CheckSquare, label: 'Verifier Panel' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background relative isolate">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />

      {/* --- SIDEBAR --- */}
      <motion.div animate={{ width: isSidebarOpen ? 260 : 72 }} className="h-full glass border-r border-border transition-all flex flex-col z-20 overflow-hidden flex-shrink-0">
        <div className="p-4 flex items-center justify-between border-b border-white/5">
           <div className={`font-bold text-lg text-white whitespace-nowrap overflow-hidden transition-all ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>Workspace</div>
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
              <LayoutDashboard size={20} />
           </button>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto w-full">
           {tabs.map((tab) => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
             >
                <tab.icon className={`h-5 w-5 flex-shrink-0 ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`} />
                <span className={`ml-3 font-medium whitespace-nowrap transition-opacity ${isSidebarOpen ? 'opacity-100 display-block' : 'opacity-0 hidden'}`}>{tab.label}</span>
             </button>
           ))}
        </div>

        <div className="p-4 border-t border-white/5">
           <button onClick={runHackathonDemo} disabled={isDemoRunning} className={`w-full flex items-center justify-center p-3 rounded-xl transition-colors ${isDemoRunning ? 'bg-purple-600/50 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'} text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]`}>
              {isDemoRunning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              {isSidebarOpen && <span className="ml-2 font-bold whitespace-nowrap">Run Demo</span>}
           </button>
        </div>
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 h-full overflow-y-auto px-6 lg:px-10 py-8 relative z-10 w-full no-scrollbar">
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-slate-800/80 rounded-full border border-white/10 hover:bg-slate-700 text-slate-300 relative group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 group-hover:animate-ping"></span>
              </button>
              <div className="flex items-center space-x-3 bg-slate-800/50 p-1 pr-4 rounded-full border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">AM</div>
                <div className="text-sm font-medium text-slate-300">Admin Mode</div>
              </div>
            </div>
         </div>

         <AnimatePresence mode="wait">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Certificates Issued" value="12,485" icon={Award} color="bg-blue-500" delay={0} />
                    <StatCard title="Verified Requests Today" value="3,212" icon={CheckCircle} color="bg-green-500" delay={0.1} />
                    <StatCard title="Fraud Attempts Detected" value="48" icon={AlertTriangle} color="bg-red-500" delay={0.2} />
                    <StatCard title="Active Institutions" value="156" icon={Users} color="bg-purple-500" delay={0.3} />
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 glass p-6 rounded-2xl">
                       <h3 className="text-lg font-semibold text-white mb-6">Verification Requests Over Time</h3>
                       <div className="h-72 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                           <LineChart data={lineData}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                             <XAxis dataKey="name" stroke="#94a3b8" />
                             <YAxis stroke="#94a3b8" />
                             <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
                             <Line type="monotone" dataKey="verifications" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                           </LineChart>
                         </ResponsiveContainer>
                       </div>
                    </div>
                    <div className="glass p-6 rounded-2xl flex flex-col">
                       <h3 className="text-lg font-semibold text-white mb-6">Verification Sources</h3>
                       <div className="flex-1 w-full min-h-[250px]">
                         <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                               {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                             </Pie>
                             <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
                           </PieChart>
                         </ResponsiveContainer>
                       </div>
                       <div className="flex justify-center space-x-4 mt-4">
                         {pieData.map((d,i) => (
                           <div key={d.name} className="flex items-center text-xs text-slate-400">
                              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[i] }}></span>{d.name}
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>

                 {/* Recent Activity Timeline */}
                 <div className="glass p-6 rounded-2xl flex-1">
                    <h3 className="text-lg font-semibold text-white mb-6">Live Activity Stream</h3>
                    <div className="space-y-6">
                       {[
                         { msg: "Student M. Rodriguez successfully verified via QR.", time: "2 min ago", type: 'success' },
                         { msg: "ALERT: Hash mismatch detected on degree upload attempt.", time: "14 min ago", type: 'danger' },
                         { msg: "Stanford University bulk issued 450 credentials.", time: "1 hr ago", type: 'info' }
                       ].map((log, i) => (
                         <div key={i} className="flex items-start">
                            <div className="relative flex-shrink-0 flex items-center justify-center">
                              {log.type === 'success' && <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-400" /></div>}
                              {log.type === 'danger' && <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"><ShieldAlert className="w-4 h-4 text-red-500" /></div>}
                              {log.type === 'info' && <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Activity className="w-4 h-4 text-blue-400" /></div>}
                              {i !== 2 && <div className="absolute top-10 bottom-[-24px] left-1/2 w-px -translate-x-1/2 bg-white/10"></div>}
                            </div>
                            <div className="ml-4 flex min-w-0 flex-1 justify-between space-x-4 pt-1">
                               <div><p className="text-sm text-slate-300">{log.msg}</p></div>
                               <div className="whitespace-nowrap text-right text-xs text-slate-500">{log.time}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}

            {/* ISSUE CERTIFICATE TAB */}
            {activeTab === 'issue' && (
              <motion.div key="issue" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-3xl">
                       <h2 className="text-2xl font-bold mb-6 text-white">Generate Hash & Issue</h2>
                       <form onSubmit={handleIssue} className="space-y-6">
                         <div className="grid grid-cols-2 gap-4">
                           <div>
                             <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Student Name</label>
                             <input required type="text" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="block w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" placeholder="John Doe" />
                           </div>
                           <div>
                             <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Student Email</label>
                             <input required type="email" value={formData.studentEmail} onChange={e => setFormData({...formData, studentEmail: e.target.value})} className="block w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" placeholder="john@example.com" />
                           </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                           <div>
                             <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Institution</label>
                             <input required type="text" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="block w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" placeholder="MIT" />
                           </div>
                           <div>
                             <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Degree</label>
                             <input required type="text" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} className="block w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner" placeholder="B.S. Physics" />
                           </div>
                         </div>
                         <div>
                           <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Upload Certificate (PDF)</label>
                           <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-600 border-dashed rounded-2xl cursor-pointer bg-slate-900/30 hover:bg-slate-800/80 hover:border-primary/50 transition-all relative overflow-hidden group">
                             <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10 text-center">
                               {file ? (
                                  <>
                                    <FileText className="w-10 h-10 mb-3 text-green-400" />
                                    <p className="text-sm text-white font-bold">{file.name}</p>
                                    <p className="text-xs text-green-400 mt-1">Ready to Hash</p>
                                  </>
                               ) : (
                                  <>
                                    <Upload className="w-10 h-10 mb-3 text-slate-500 group-hover:text-primary transition-colors" />
                                    <p className="mb-2 text-sm text-slate-300 font-medium">Click or drag PDF to upload</p>
                                    <p className="text-xs text-slate-500">Maximum size 10MB</p>
                                  </>
                               )}
                             </div>
                             <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
                           </label>
                         </div>
                         <button disabled={loading} type="submit" className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] text-base font-bold text-white bg-primary hover:bg-blue-600 hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all focus:ring-offset-[#06080F]">
                           {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Sign & Push to Ledger <ArrowRight className="inline ml-2" size={18} /></span>}
                         </button>
                       </form>
                    </div>

                    <div className="flex flex-col max-h-[700px]">
                      <div className="glass p-8 rounded-3xl flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                         <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
                         <QrCode className="w-32 h-32 text-slate-800 bg-white p-4 rounded-3xl shadow-xl mb-8 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500" />
                         <h3 className="text-2xl font-bold text-white mb-2">Live Sync Preview</h3>
                         <p className="text-slate-400 text-center text-sm px-6 mb-8">Once issued, the cryptographically signed hash will be broadcasted to the trust network instantly.</p>
                         
                         <div className="w-full max-w-sm space-y-3">
                            <div className="flex justify-between text-xs text-slate-500 font-mono border-b border-white/5 pb-2">
                              <span>SYNC STATUS</span>
                              <span className="text-blue-400">WAITING</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 font-mono border-b border-white/5 pb-2">
                              <span>BLOCK CONFIRMATIONS</span>
                              <span className="text-slate-300">0</span>
                            </div>
                         </div>
                      </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* AI DETECTION TAB */}
            {activeTab === 'ai_detect' && (
              <motion.div key="ai" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto space-y-8 mt-10">
                 <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-purple-500/30">
                      <Cpu className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">DeepFake Document Detection</h2>
                    <p className="text-slate-400 text-lg">Harness neural networks to identify microscopic font mismatches, pixel bleeding, and cloned digital signatures.</p>
                 </div>

                 {aiScore ? (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass p-10 rounded-3xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                       <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                          <div className="flex flex-col items-center justify-center flex-shrink-0">
                             <div className="relative w-48 h-48 rounded-full border-[10px] border-slate-800 flex items-center justify-center shadow-inner">
                                {/* SVG Circular Gauge */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                  <circle cx="96" cy="96" r="86" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                                  <circle cx="96" cy="96" r="86" fill="transparent" stroke="#ef4444" strokeWidth="10" strokeDasharray="540" strokeDashoffset={540 - (540 * aiScore.score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="text-center">
                                   <div className="text-5xl font-black text-red-500">{aiScore.score}%</div>
                                   <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Authentic</div>
                                </div>
                             </div>
                             <div className="mt-6 px-4 py-2 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400 font-bold text-sm tracking-wide">
                               HIGH PROBABILITY FRAUD
                             </div>
                          </div>

                          <div className="flex-1 w-full space-y-6">
                             <div>
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center"><ShieldAlert className="mr-2 text-red-500" /> Anomalies Detected</h3>
                                <div className="h-px w-full bg-gradient-to-r from-red-500/50 to-transparent mb-4"></div>
                                <ul className="space-y-4">
                                   {aiScore.flags.map((f, i) => (
                                     <li key={i} className="flex items-start text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mr-3 mt-0.5" />
                                        <span className="font-medium">{f}</span>
                                     </li>
                                   ))}
                                </ul>
                             </div>
                             <button onClick={() => setAiScore(null)} className="text-sm font-semibold text-slate-400 hover:text-white underline underline-offset-4">Reset Analysis</button>
                          </div>
                       </div>
                    </motion.div>
                 ) : (
                    <div className="glass p-12 rounded-3xl flex flex-col items-center justify-center text-center border border-white/5 border-dashed">
                       <FileSearch className="w-16 h-16 text-slate-500 mb-6" />
                       <h3 className="text-xl font-bold text-white mb-2">Upload File for Visual Analysis</h3>
                       <p className="text-slate-400 max-w-md mx-auto mb-8">Even if a document's hash matches the ledger, our AI scan identifies if it was forged using stolen private keys or signature cloning.</p>
                       <button onClick={() => setAiScore({ score: 14, flags: ['Signature mismatch detected', 'Font rendering inconsistency across regions'] })} className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-md">
                         Run AI Analysis
                       </button>
                    </div>
                 )}
              </motion.div>
            )}

         </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
