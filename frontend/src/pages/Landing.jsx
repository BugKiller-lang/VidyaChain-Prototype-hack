import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, Fingerprint, QrCode, ArrowRight, 
  Database, Lock, Zap, CheckCircle, Upload, Search, 
  Star, Check, ShieldCheck, Activity, Users, Award
} from 'lucide-react';

// --- CURSOR GLOW COMPONENT ---
const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.05), transparent 40%)`
      }}
    />
  );
};

// --- STAT COUNTER COMPONENT ---
const StatCounter = ({ end, label, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 2000;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [end]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">{label}</div>
    </div>
  );
};


const Landing = () => {
  return (
    <div className="relative isolate min-h-screen bg-[#06080F] text-slate-300 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <CursorGlow />

      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-0 -ml-40 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* --- 1. HERO SECTION --- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-32 items-center justify-between min-h-[90vh]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 pt-8"
        >
          <div className="mb-8 hidden sm:flex">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-400 ring-1 ring-white/10 hover:ring-white/20 transition-all cursor-default glass">
              Hackathon Prototype v1.0. <a href="#" className="font-semibold text-purple-400 ml-1"><span className="absolute inset-0" aria-hidden="true"></span>Read announcement <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1]">
            Decentralized Trust for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Academic Credentials
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-400 max-w-lg">
            Stop credential fraud instantly. VidyaChain digitizes and secures certificates onto an immutable ledger, verifiable anywhere in the world using just a QR code.
          </p>
          
          <div className="mt-10 flex items-center gap-x-6">
            <Link to="/register" className="group relative rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all hover:bg-slate-100 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Initialize Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/verify" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors">
              <QrCode className="w-4 h-4" />
              <span>Verify Certificate</span>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none relative perspective-1000"
        >
          {/* Animated 3D-ish Card container */}
          <div className="relative w-[320px] md:w-[400px] aspect-[4/5] rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl flex flex-col p-8 overflow-hidden group">
            {/* Inner background glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-2xl group-hover:opacity-100 transition-opacity opacity-50 z-0"></div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
               <div className="p-4 bg-white rounded-2xl shadow-xl mb-8 transform group-hover:scale-105 transition-transform duration-500">
                 <QrCode className="w-40 h-40 text-slate-900" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Scan to Verify</h3>
               <p className="text-slate-400 text-sm mb-6">Point your camera to validate credential integrity.</p>
               
               <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 mb-6"></div>
               
               <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20 backdrop-blur-md">
                 <ShieldCheck className="w-4 h-4" />
                 <span className="text-sm font-semibold tracking-wide">CRYPTOGRAPHICALLY SECURE</span>
               </div>
            </div>

            {/* Floating Badges */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-6 -right-8 bg-slate-800/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center space-x-2 shadow-xl z-20">
               <Database className="w-4 h-4 text-blue-400" />
               <span className="text-xs font-bold text-white">Ledger Synced</span>
            </motion.div>
            
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute bottom-16 -left-10 bg-slate-800/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center space-x-2 shadow-xl z-20">
               <Fingerprint className="w-4 h-4 text-purple-400" />
               <div className="flex flex-col items-start">
                 <span className="text-[10px] text-slate-400 uppercase tracking-wider">SHA-256 Verified</span>
                 <span className="text-xs font-mono text-white">0x9F4...A1B</span>
               </div>
            </motion.div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }} className="absolute top-1/2 -right-12 bg-slate-800/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center space-x-2 shadow-xl z-20">
               <Lock className="w-4 h-4 text-green-400" />
               <span className="text-xs font-bold text-white">Tamper-Proof</span>
            </motion.div>
          </div>
        </motion.div>
      </div>


      {/* --- 2. TRUST & STATS SECTION --- */}
      <div className="relative z-10 py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
             <StatCounter end={10000} suffix="+" label="Certificates Secured" />
             <StatCounter end={500} suffix="+" label="Partner Institutions" />
             <StatCounter end={99.9} suffix="%" label="Fraud Detection Accuracy" />
          </div>
        </div>
      </div>


      {/* --- 3. DYNAMIC FEATURES SECTION --- */}
      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-24">
            <h2 className="text-base font-semibold leading-7 text-purple-400 tracking-wide uppercase">Core Technology</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Engineered for absolute trust
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Blockchain Security', desc: 'Certificates are permanently logged into an immutable decentralized ledger preventing retrospective forgery.', icon: Database, color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { title: 'QR Code Verification', desc: 'Scan and automatically cross-reference the physical credentials with the digital ledger hashes instantly.', icon: QrCode, color: 'text-purple-400', bg: 'bg-purple-400/10' },
              { title: 'Tamper Detection', desc: 'Byte-level hash generation (SHA-256) catches even malicious single-pixel edits to PDF files guaranteed.', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-400/10' },
              { title: 'Instant Validation', desc: 'Zero wait times. Employers verify academic achievements in milliseconds globally without API costs.', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            ].map((feat, i) => (
              <motion.div 
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/[0.07] transition-colors overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full ${feat.bg} blur-3xl group-hover:scale-150 transition-transform duration-700 ease-out`}></div>
                <div className={`inline-flex items-center justify-center p-3 rounded-xl ${feat.bg} mb-6`}>
                  <feat.icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* --- 4. PRODUCT MOCKUP SECTION --- */}
      <div className="relative z-10 py-24 sm:py-32 bg-slate-900/40 border-y border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Experience the Dashboard</h2>
                 <p className="text-lg text-slate-400 mb-8">
                   VidyaChain provides a sleek, modern interface for university administrators to bulk-issue and manage verifiable credentials with zero friction.
                 </p>
                 <ul className="space-y-4">
                   {['One-click PDF to Blockchain generation', 'Real-time validation statuses', 'Activity log & fraud analytics'].map((item, i) => (
                      <li key={i} className="flex items-center space-x-3 text-slate-300">
                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                   ))}
                 </ul>
                 <div className="mt-10">
                   <Link to="/register" className="text-purple-400 font-semibold hover:text-purple-300 flex items-center group">
                     Explore Dashboard Demo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </div>
              </div>

              {/* Realistic UI Mockup container */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative perspective-1000"
              >
                 <div className="relative rounded-2xl border border-white/10 bg-[#0F1219] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg]">
                    
                    {/* Mockup Header */}
                    <div className="border-b border-white/5 bg-white/[0.02] p-4 flex items-center justify-between">
                       <div className="flex space-x-2">
                         <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                         <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                       </div>
                       <div className="text-xs text-slate-500 font-medium font-mono">admin.vidyachain.com</div>
                       <div className="w-10"></div>
                    </div>

                    {/* Mockup Body */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                       {/* Sidebar Mock */}
                       <div className="hidden md:flex flex-col space-y-4 w-48 pt-4">
                          <div className="h-8 w-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                             <ShieldAlert className="w-5 h-5" />
                          </div>
                          {['Dashboard', 'Issue Credentials', 'Activity Log', 'Settings'].map((nav, i) => (
                             <div key={i} className={`h-8 rounded-md flex items-center px-3 text-sm ${i === 1 ? 'bg-white/10 text-white font-medium' : 'text-slate-500'}`}>
                               {nav}
                             </div>
                          ))}
                       </div>

                       {/* Main Content Mock */}
                       <div className="flex-1 space-y-6">
                          <div className="flex justify-between items-end border-b border-white/5 pb-4">
                             <div>
                               <div className="text-lg font-bold text-white">Issue Single Credential</div>
                               <div className="text-xs text-slate-500 mt-1">Upload exactly 1 PDF document for hashing.</div>
                             </div>
                          </div>

                          <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/[0.01]">
                             <Upload className="w-8 h-8 text-slate-400 mb-3" />
                             <div className="text-sm font-medium text-white mb-1">Drag and drop file here</div>
                             <div className="text-xs text-slate-500">PDF, JPG up to 10MB</div>
                          </div>

                          {/* Success Mock Overlay */}
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, repeat: Infinity, repeatDelay: 5, duration: 0.5 }}
                            className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center justify-between"
                          >
                             <div className="flex items-center space-x-3">
                               <CheckCircle className="w-5 h-5 text-green-400" />
                               <div>
                                 <div className="text-sm font-medium text-white">B.Sc Computer Science.pdf</div>
                                 <div className="text-xs text-green-400/70">Hashed & Synced</div>
                               </div>
                             </div>
                             <div className="bg-white p-1 rounded border border-white/10">
                               <QrCode className="w-8 h-8 text-slate-900" />
                             </div>
                          </motion.div>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>


      {/* --- 5. HOW IT WORKS (STEP FLOW) --- */}
      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-20">
             <h2 className="text-3xl font-bold tracking-tight text-white mb-4">How It Works</h2>
             <p className="text-slate-400">Three simple steps to secure the future of academic achievements.</p>
          </div>

          <div className="relative">
             {/* Line connecting steps */}
             <div className="hidden lg:block absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/50 to-green-500/20 z-0"></div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                {[
                  { step: 1, title: "Upload Certificate", desc: "Universities upload digital PDFs containing grade schemas via dashboard.", icon: Upload, shadow: "shadow-blue-500/20", border: 'border-blue-500/30' },
                  { step: 2, title: "Generate Hash + QR", desc: "System locks cryptographic signature into the ledger and issues dynamic QR code.", icon: Fingerprint, shadow: "shadow-purple-500/20", border: 'border-purple-500/30' },
                  { step: 3, title: "Scan & Verify", desc: "Recruiters scan the QR and verify authenticity, ensuring zero manipulation.", icon: Search, shadow: "shadow-green-500/20", border: 'border-green-500/30' }
                ].map((item, i) => (
                  <motion.div 
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center text-center group"
                  >
                     <div className={`w-24 h-24 rounded-full bg-[#0a0d14] border-2 ${item.border} flex items-center justify-center mb-6 shadow-xl ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-10 h-10 text-white" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">Step {item.step}: {item.title}</h3>
                     <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>


      {/* --- 6. TESTIMONIALS SECTION --- */}
      <div className="relative z-10 py-24 bg-slate-900/20 border-y border-white/5">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-16">Trusted by the Ecosystem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { name: "Dr. Sarah Chen", role: "University Admin", txt: "VidyaChain completely eradicated our manual credential checking backlog. The bulk issuance tool is a lifesaver.", i: Users },
                 { name: "Marcus Rodriguez", role: "Sr. Tech Recruiter", txt: "I simply scan the QR code on a candidate's resume and know instantly if their degree is legit. No more waiting weeks for university replies.", i: Activity },
                 { name: "Priya Sharma", role: "Recent Graduate", txt: "Having a cryptographically verifiable degree link on my LinkedIn makes me stand out. I own my credential forever.", i: Award },
               ].map((rev, i) => (
                 <motion.div 
                   key={rev.name}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.15 }}
                   className="glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
                 >
                    <div className="flex text-yellow-400 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-slate-300 mb-6 italic">"{rev.txt}"</p>
                    <div className="flex items-center space-x-4 border-t border-white/10 pt-4">
                       <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                         <rev.i className="w-5 h-5 text-purple-400" />
                       </div>
                       <div>
                         <div className="text-white font-bold text-sm">{rev.name}</div>
                         <div className="text-slate-500 text-xs">{rev.role}</div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>


      {/* --- 7. PRICING SECTION --- */}
      <div className="relative z-10 py-24 sm:py-32">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-white mb-4">Transparent Pricing</h2>
               <p className="text-slate-400">Scale trust across your institution affordably.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
               {[
                 { tier: "Basic", price: "Free", sub: "Forever", features: ["100 Verifications/mo", "Standard QR Validation", "Community Support"], glow: false },
                 { tier: "Pro", price: "₹499", sub: "/month", features: ["Unlimited Certificates", "Immutable Blockchain Storage", "Advanced Analytics Dashboard", "Priority Support"], glow: true },
                 { tier: "Enterprise", price: "Custom", sub: "Billed Annually", features: ["Multi-University Integration", "RESTful API Access", "Dedicated Success Manager", "White-label UI"], glow: false }
               ].map((p, i) => (
                 <motion.div 
                   key={p.tier}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className={`relative rounded-3xl p-8 flex flex-col h-full bg-slate-900/80 border ${p.glow ? 'border-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.2)] md:-mt-8 md:mb-8' : 'border-white/10'}`}
                 >
                    {p.glow && <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>}
                    
                    <h3 className="text-xl font-medium text-white mb-2">{p.tier}</h3>
                    <div className="flex items-baseline gap-x-2 mb-6 border-b border-white/5 pb-6">
                      <span className="text-4xl font-bold tracking-tight text-white">{p.price}</span>
                      <span className="text-sm font-semibold leading-6 text-slate-400">{p.sub}</span>
                    </div>
                    
                    <ul className="flex-1 space-y-4 mb-8">
                       {p.features.map(f => (
                         <li key={f} className="flex items-start gap-x-3 text-sm text-slate-300">
                           <Check className="h-5 w-5 flex-none text-purple-400" />
                           {f}
                         </li>
                       ))}
                    </ul>

                    <button className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all ${p.glow ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                       Choose {p.tier}
                    </button>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>


      {/* --- 8. FINAL CTA --- */}
      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
           <div className="relative rounded-3xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 overflow-hidden px-6 py-16 sm:px-12 sm:py-24 text-center glass">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              
              <h2 className="relative z-10 text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6">
                 Stop Fake Degrees.<br/> Start Verifying Trust.
              </h2>
              <p className="relative z-10 mx-auto max-w-xl text-lg text-slate-300 mb-10">
                 Join hundreds of universities actively protecting their brand reputation and securing thousands of student credentials.
              </p>
              
              <div className="relative z-10">
                 <Link to="/register" className="inline-flex items-center space-x-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300">
                   <span>Get Started Now</span>
                   <ArrowRight className="w-5 h-5" />
                 </Link>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;
