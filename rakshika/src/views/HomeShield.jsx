import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, MapPin, Mic, Video, Navigation, PhoneCall, AlertTriangle, ShieldCheck, Settings } from 'lucide-react';

export default function HomeShield() {
  const navigate = useNavigate();
  const [locationStatus, setLocationStatus] = useState('Acquiring GPS...');
  const [isPassiveActive, setIsPassiveActive] = useState(true);

  // Simulate Geolocation ping for realistic UI state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocationStatus('Accurate to 4 meters');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    { icon: PhoneCall, label: 'Fake Call', color: 'bg-indigo-500/20 text-indigo-400', border: 'border-indigo-500/30', route: '/emergency?action=fakecall' },
    { icon: Navigation, label: 'Safe Walk', color: 'bg-emerald-500/20 text-emerald-400', border: 'border-emerald-500/30', route: '/routes' },
    { icon: Mic, label: 'Record Audio', color: 'bg-amber-500/20 text-amber-400', border: 'border-amber-500/30', route: '/vault?action=audio' },
    { icon: Video, label: 'Record Video', color: 'bg-rose-500/20 text-rose-400', border: 'border-rose-500/30', route: '/vault?action=video' },
  ];

  return (
    <div className="w-full flex flex-col pt-safe px-4 pb-6 space-y-6">
      
      {/* Header & Status Indicator */}
      <header className="flex justify-between items-center mt-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Rakshika</h1>
          <div className="flex items-center mt-1 space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-safe animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">Monitoring Active</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 active:scale-95 transition-transform"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Primary Ambient Shield Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-6 shadow-xl"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck size={120} />
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-white mb-1">Ambient Protection</h2>
              <p className="text-sm text-slate-400 max-w-[80%] leading-relaxed">
                Scream detection and sudden motion algorithms are actively scanning.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-dark/40 rounded-2xl p-3 border border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">Location Precision</span>
                <span className="text-sm text-white font-medium">{locationStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Threat Level / Regional Intel */}
      <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-center space-x-3">
          <AlertTriangle size={20} className="text-amber-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-amber-500">Moderate Risk Area</span>
            <span className="text-xs text-slate-400">Based on recent community reports</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/routes')}
          className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wide"
        >
          View Map
        </button>
      </div>

      {/* Quick Action Grid */}
      <div className="flex flex-col space-y-3">
        <h3 className="text-sm font-semibold tracking-wide text-slate-300 uppercase pl-1">Tactical Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, idx) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(action.route)}
                className={`flex flex-col items-start p-4 rounded-2xl border bg-slate-800/40 backdrop-blur-sm ${action.border} transition-transform active:scale-95`}
              >
                <div className={`p-2.5 rounded-xl ${action.color} mb-3`}>
                  <ActionIcon size={20} strokeWidth={2.5} />
                </div>
                <span className="font-medium text-sm text-white">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}