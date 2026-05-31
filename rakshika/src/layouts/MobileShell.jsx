import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Map, AlertCircle, HardDrive, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileShell({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Primary navigation array mapped to your core application modules
  const navItems = [
    { path: '/', icon: Shield, label: 'Home' },
    { path: '/routes', icon: Map, label: 'Routes' },
    { path: '/vault', icon: HardDrive, label: 'Vault' },
    { path: '/community', icon: Users, label: 'Network' },
  ];

  return (
    <div className="min-h-screen bg-dark text-slate-200 font-sans flex flex-col relative overflow-hidden">
      
      {/* Dynamic Content Area: Inherits views based on AppRoutes.jsx */}
      <main className="flex-1 overflow-y-auto pb-28 relative z-0">
        <Outlet context={{ user }} />
      </main>

      {/* Persistent Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full bg-dark/85 backdrop-blur-lg border-t border-slate-800 pb-safe pt-2 px-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center max-w-md mx-auto relative px-2">
          
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            // Inject the raised SOS Emergency Trigger precisely in the center (index 2)
            if (index === 2) {
              return (
                <React.Fragment key="sos-trigger-insert">
                  <button
                    onClick={() => navigate('/emergency')}
                    className="relative -top-8 bg-danger text-white rounded-full p-4 shadow-[0_0_20px_rgba(225,29,72,0.4)] flex flex-col items-center justify-center animate-sos-pulse border-4 border-dark focus:outline-none z-50 transition-transform active:scale-90"
                    aria-label="Activate Emergency SOS"
                  >
                    <AlertCircle size={32} strokeWidth={2.5} />
                  </button>
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center justify-center w-16 h-14 transition-colors ${isActive ? 'text-safe' : 'text-slate-500'}`}
                  >
                    <div className="relative flex flex-col items-center">
                      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                      <span className="text-[10px] mt-1.5 font-medium tracking-wide">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute -bottom-2.5 w-1.5 h-1.5 bg-safe rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </div>
                  </NavLink>
                </React.Fragment>
              );
            }

            // Standard Navigation Items
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-16 h-14 transition-colors ${isActive ? 'text-safe' : 'text-slate-500'}`}
              >
                <div className="relative flex flex-col items-center">
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] mt-1.5 font-medium tracking-wide">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-2.5 w-1.5 h-1.5 bg-safe rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              </NavLink>
            );
          })}
          
        </div>
      </nav>
    </div>
  );
}