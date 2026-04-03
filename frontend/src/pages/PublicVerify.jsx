import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ShieldCheck, ShieldAlert, Upload, Search, CheckCircle, XCircle } from 'lucide-react';

const PublicVerify = () => {
  const { uniqueId } = useParams();
  const [certId, setCertId] = useState(uniqueId || '');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  
  // Advanced Check States
  const [file, setFile] = useState(null);
  const [docCheckStatus, setDocCheckStatus] = useState(null); // 'checking', 'valid', 'invalid'

  useEffect(() => {
    // If mounted with a uniqueId, auto-check it
    if (uniqueId) {
      handleVerification(uniqueId);
    }
  }, [uniqueId]);

  // QR Scanner Setup
  useEffect(() => {
    if (!uniqueId) {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: {width: 250, height: 250} }, false);
      scanner.render((text) => {
        scanner.clear();
        // Assume text is URL ending with uniqueId
        const parts = text.split('/');
        const scannedId = parts[parts.length - 1];
        setCertId(scannedId);
        handleVerification(scannedId);
      }, (error) => {
        // quiet fail on scan errors while looking for a code
      });
      return () => scanner.clear().catch(e => console.log('Scanner cleanup failed', e));
    }
  }, [uniqueId]);

  const handleVerification = async (idToVerify) => {
    setChecking(true);
    setResult(null);
    setDocCheckStatus(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/verify/${idToVerify}`);
      setResult(response.data);
    } catch (err) {
      setResult({ valid: false, msg: err.response?.data?.msg || 'Could not verify. This certificate might not exist.' });
    }
    setChecking(false);
  };

  const verifyDocumentHash = async (e) => {
    e.preventDefault();
    if (!file) return;
    setDocCheckStatus('checking');

    const data = new FormData();
    data.append('document', file);

    try {
      const res = await axios.post(`http://localhost:5000/api/verify/check-document/${certId}`, data);
      setDocCheckStatus(res.data.valid ? 'valid' : 'invalid');
    } catch (err) {
      setDocCheckStatus('invalid');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Validate Academic Identity</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Verify the authenticity of a credential instantly using the VidyaChain immutable ledger.
        </p>
      </div>

      {!result && !uniqueId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* QR Scanner */}
          <div className="glass p-6 rounded-xl flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-white">Scan QR Code</h3>
            <div id="reader" className="w-full max-w-sm rounded overflow-hidden"></div>
            <p className="text-xs text-slate-500 mt-4 text-center">Allow camera permissions if prompted</p>
          </div>

          {/* Manual Entry */}
          <div className="glass p-6 rounded-xl flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-4 text-white">Enter Credential ID</h3>
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={certId} 
                onChange={(e) => setCertId(e.target.value)}
                placeholder="e.g. jx9k2l1..."
                className="flex-1 rounded-md border border-border bg-slate-800/50 px-3 py-2 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button 
                onClick={() => handleVerification(certId)}
                disabled={!certId || checking}
                className="bg-primary hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium transition-colors disabled:opacity-50 flex items-center"
              >
                {checking ? 'Checking...' : <><Search className="w-4 h-4 mr-1"/> Verify</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {result.valid ? (
              <div className="glass overflow-hidden rounded-xl border border-green-500/30">
                <div className="bg-green-500/10 p-6 border-b border-green-500/20 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Verified Authentic</h2>
                  <p className="text-green-400 mt-1 flex justify-center items-center">
                    <ShieldCheck className="w-4 h-4 mr-1" /> Found on Blockchain Ledger
                  </p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Student</p>
                    <p className="text-lg font-semibold text-white">{result.data.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Institution</p>
                    <p className="text-lg font-semibold text-white">{result.data.institution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Degree</p>
                    <p className="text-lg font-semibold text-white">{result.data.degree}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Issue Date</p>
                    <p className="text-lg font-semibold text-white">{new Date(result.data.issueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass p-8 rounded-xl border border-red-500/30 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-500 mb-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <XCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Invalid Credential</h2>
                <p className="text-red-400 flex justify-center items-center">
                  <ShieldAlert className="w-4 h-4 mr-1" /> {result.msg}
                </p>
                <div className="mt-6 flex justify-center">
                   <button onClick={() => setResult(null)} className="text-sm underline text-slate-400 hover:text-white">Verify Another</button>
                </div>
              </div>
            )}

            {/* Advanced Verification (Deep Check) */}
            {result.valid && (
              <div className="glass p-6 rounded-xl relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-4">Deep Verification (Anti-Tamper Check)</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Upload the digital PDF certificate. We will compare its SHA-256 hash against the immutable ledger to ensure it hasn't been altered.
                </p>
                
                <form onSubmit={verifyDocumentHash} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <input type="file" required onChange={e => setFile(e.target.files[0])} className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all"/>
                  <button type="submit" disabled={!file || docCheckStatus === 'checking'} className="bg-primary hover:bg-blue-600 text-white w-full md:w-auto px-6 py-2 rounded-md font-medium whitespace-nowrap disabled:opacity-50">
                    Verify Document Hash
                  </button>
                </form>

                {docCheckStatus === 'valid' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3 text-green-400">
                    <ShieldCheck className="w-6 h-6" />
                    <div>
                      <p className="font-bold">Match Perfect</p>
                      <p className="text-sm opacity-90">Document hash matches the ledger. It has not been tampered with.</p>
                    </div>
                  </motion.div>
                )}

                {docCheckStatus === 'invalid' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-3 text-red-500">
                    <ShieldAlert className="w-6 h-6" />
                    <div>
                      <p className="font-bold">HASH MISMATCH DETECTED</p>
                      <p className="text-sm opacity-90">This document has been modified since it was issued!</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PublicVerify;
