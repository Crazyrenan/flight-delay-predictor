import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, CheckCircle2, Zap, Globe, ShieldCheck } from 'lucide-react';

const Landing = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    )
    .fromTo(textRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden selection:bg-blue-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-sm bg-slate-900/30 border-b border-white/5">
        <div className="text-xl font-black italic tracking-tighter">
          SKY-CAST<span className="text-blue-500">.AI</span>
        </div>
        <div className="flex gap-4 text-sm font-bold">
          <Link to="/login" className="px-4 py-2 hover:text-blue-400 transition-colors">LOGIN</Link>
          <Link to="/dashboard" className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-all">
            GET STARTED
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>

        <div ref={heroRef} className="max-w-5xl mx-auto space-y-6">
          <p className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            Next Gen Flight Analytics
          </p>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600">
            PREDICT <br/>
            THE FUTURE.
          </h1>
        </div>

        <div ref={textRef} className="max-w-2xl mx-auto mt-8 mb-12">
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            Stop guessing. Start knowing. Powered by XGBoost & Neural Networks to analyze flight patterns with <span className="text-white font-bold">98.4% accuracy</span>.
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-col md:flex-row gap-4 items-center">
          <Link to="/dashboard" className="group relative px-8 py-4 bg-blue-600 rounded-full font-black tracking-widest text-sm hover:bg-blue-500 transition-all flex items-center gap-3">
            LAUNCH DASHBOARD
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
          </Link>
          <span className="text-slate-500 text-xs font-mono">NO CREDIT CARD REQUIRED</span>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-32 px-4 border-t border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-yellow-400" />}
              title="Real-Time Analysis"
              desc="Process thousands of flight vectors in milliseconds using our optimized FastAPI engine."
            />
            <FeatureCard 
              icon={<Globe className="text-blue-400" />}
              title="Global Coverage"
              desc="Data from major airlines including AA, DL, and WN across comprehensive US routes."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-400" />}
              title="Enterprise Grade"
              desc="Bank-level encryption and 99.9% uptime for mission-critical travel planning."
            />
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">SIMPLE PRICING.</h2>
          <p className="text-slate-400">Choose the plan that fits your travel frequency.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="p-10 rounded-[2rem] border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-slate-700 transition-all">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-black mb-6">$0 <span className="text-lg font-normal text-slate-500">/mo</span></div>
            <ul className="space-y-4 mb-10 text-left text-slate-300">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> 3 Predictions / Day</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Basic Flight Stats</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Community Support</li>
            </ul>
            <Link to="/dashboard" className="block w-full py-4 rounded-xl border border-slate-700 hover:bg-slate-800 font-bold transition-all">
              Try For Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative p-10 rounded-[2rem] border border-blue-500/50 bg-blue-900/10 backdrop-blur-sm">
            <div className="absolute top-0 right-0 bg-blue-600 text-xs font-black px-4 py-2 rounded-bl-xl rounded-tr-[2rem]">POPULAR</div>
            <h3 className="text-2xl font-bold mb-2 text-white">Pro Traveler</h3>
            <div className="text-4xl font-black mb-6">$12 <span className="text-lg font-normal text-slate-500">/mo</span></div>
            <ul className="space-y-4 mb-10 text-left text-slate-200">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Unlimited Predictions</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Advanced Risk Score</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> API Access</li>
            </ul>
            <button className="block w-full py-4 rounded-xl bg-white text-black font-black hover:bg-blue-50 transition-all">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 text-sm font-mono border-t border-white/5 mt-20">
        © 2026 SKY-CAST.AI INC. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

// Component kecil untuk fitur
const FeatureCard = ({ icon, title, desc }: {icon: any, title: string, desc: string}) => (
  <div className="p-8 rounded-3xl bg-slate-800/20 border border-white/5 hover:bg-slate-800/40 transition-all group">
    <div className="mb-6 w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;