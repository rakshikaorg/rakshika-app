import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Strict Module Code-Splitting: Layout Wrappers
const MobileShell = lazy(() => import('../layouts/MobileShell'));
const TraumaSafeWrapper = lazy(() => import('../layouts/TraumaSafeWrapper'));

// Strict Module Code-Splitting: Primary Screen Views
const HomeShield = lazy(() => import('../views/HomeShield'));
const EmergencyConsole = lazy(() => import('../views/EmergencyConsole'));
const SafeRoutes = lazy(() => import('../views/SafeRoutes'));
const EvidenceVault = lazy(() => import('../views/EvidenceVault'));
const CyberSafety = lazy(() => import('../views/CyberSafety'));
const CommunityNetwork = lazy(() => import('../views/CommunityNetwork'));
const SurvivorSupport = lazy(() => import('../views/SurvivorSupport'));
const SettingsProfile = lazy(() => import('../views/SettingsProfile'));

export default function AppRoutes({ user }) {
  // Offline-first PWA standard loading fallback
  const PageLoader = () => (
    <div className="h-screen w-full bg-dark flex flex-col items-center justify-center text-safe">
      <div className="w-10 h-10 border-4 border-safe border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Core Application Shell Routes (Contains Bottom Navigation) */}
          <Route element={<MobileShell user={user} />}>
            <Route path="/" element={<HomeShield />} />
            <Route path="/routes" element={<SafeRoutes />} />
            <Route path="/vault" element={<EvidenceVault />} />
            <Route path="/cyber" element={<CyberSafety />} />
            <Route path="/community" element={<CommunityNetwork />} />
            <Route path="/settings" element={<SettingsProfile />} />
          </Route>

          {/* Trauma-Sensitive Wrapper Routes (Discreet UI/UX) */}
          <Route element={<TraumaSafeWrapper user={user} />}>
            <Route path="/support" element={<SurvivorSupport />} />
          </Route>

          {/* High-Priority Emergency Console (No Shell, Full Screen) */}
          <Route path="/emergency" element={<EmergencyConsole />} />

          {/* Strict Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}