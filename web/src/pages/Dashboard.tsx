import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Activity, LineChart, Zap, Server
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={contentRef} className="max-w-6xl w-full mx-auto">
      {/* HEADER SECTION */}
      <div className="mb-10 animate-card">
        <h1 className="text-4xl font-black tracking-tighter mb-2 italic">Command Center.</h1>
        <p className="text-slate-400 text-lg font-medium">
          Select a neural module to begin telemetry analysis and real-time inference.
        </p>
      </div>

      {/* SYSTEM STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl animate-card backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <Server size={18} className="text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">API Status</span>
          </div>
          <p className="text-3xl font-black tracking-tighter text-white">ONLINE</p>
        </div>
        
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl animate-card backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <Zap size={18} className="text-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Model Accuracy</span>
          </div>
          <p className="text-3xl font-black tracking-tighter text-white">94.2%</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl animate-card backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <Activity size={18} className="text-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Uptime Rate</span>
          </div>
          <p className="text-3xl font-black tracking-tighter text-white">99.9%</p>
        </div>
      </div>

      <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 animate-card ml-2">
        Available AI Modules
      </h2>

      {/* FEATURE CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module 1: Delay Predictor */}
        <div 
          onClick={() => navigate('/delay-predictor')} 
          className="group cursor-pointer bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 p-8 rounded-4xl transition-all hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-blue-900/20 relative overflow-hidden animate-card"
        >
          <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={200} />
          </div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <Activity className="text-blue-500" size={24} />
          </div>
          <h3 className="text-2xl font-black tracking-tighter mb-3">Delay Predictor</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
            Utilize our XGBoost model to analyze flight routes and historical carrier data to predict arrival delays.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
            Launch Module <Activity size={14} />
          </div>
        </div>

        {/* Module 2: Price Oracle */}
        <div 
          onClick={() => navigate('/price-oracle')} 
          className="group cursor-pointer bg-slate-900/60 border border-slate-800 hover:border-green-500/50 p-8 rounded-4xl transition-all hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-green-900/20 relative overflow-hidden animate-card"
        >
          <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <LineChart size={200} />
          </div>
          <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:scale-110 transition-transform">
            <LineChart className="text-green-500" size={24} />
          </div>
          <h3 className="text-2xl font-black tracking-tighter mb-3">Price Oracle</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
            Forecast optimal ticket fares based on live market averages, routing codes, and travel durations.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-widest">
            Launch Module <LineChart size={14} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;