import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  ArrowRight, 
  BarChart3, 
  PieChart, 
  Activity 
} from 'lucide-react';

const Landing = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-app-bg text-slate-100 font-sans overflow-hidden selection:bg-blue-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-sm bg-slate-900/30 border-b border-white/5">
        <div className="text-xl font-black italic tracking-tighter">
          WINDBREAKER<span className="text-blue-500">.AI</span>
        </div>
        <div className="flex gap-4 text-sm font-bold">
          <Link to="/login" className="px-4 py-2 hover:text-blue-400 transition-colors">LOGIN</Link>
          <Link to="/register" className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-white/5 uppercase tracking-widest text-[10px] flex items-center justify-center">
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        <div ref={heroRef} className="max-w-5xl mx-auto space-y-6">
          <p className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Next Gen Flight Analytics</p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-linear-to-b from-white via-slate-200 to-slate-600 uppercase">
            Predict <br/> The Future.
          </h1>
        </div>
        <div ref={textRef} className="max-w-2xl mx-auto mt-8 mb-12">
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            Powered by XGBoost & Neural Networks to analyze flight patterns with <span className="text-white font-bold italic">98.4% accuracy</span>.
          </p>
        </div>
        <div ref={ctaRef} className="flex flex-col md:flex-row gap-4 items-center">
          <Link to="/dashboard" className="group relative px-8 py-4 bg-blue-600 rounded-full font-black tracking-widest text-sm hover:bg-blue-500 transition-all flex items-center gap-3 shadow-2xl shadow-blue-600/20">
            LAUNCH DASHBOARD
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* --- SECTION: COMPANY BIO --- */}
      <section ref={bioRef} className="py-32 px-4 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 uppercase">
              The Story of <br/>
              <span className="text-blue-500">Windbreaker.</span>
            </h2>
          </div>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-medium">
            <p>
              Lahir dari kebutuhan akan kepastian di tengah ketidakpastian logistik penerbangan global. 
              <span className="text-white font-bold"> Windbreaker.ai</span> hadir sebagai pelindung rencana perjalanan Anda.
            </p>
            <p>
              Dimulai dari riset mendalam di <span className="text-slate-200">Universitas Multimedia Nusantara</span>, kami menganalisis jutaan data untuk menemukan pola keterlambatan. Nama kami melambangkan ketangguhan—seperti jaket Windbreaker yang melindungi Anda dari terpaan rintangan.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION: DATA INSIGHTS --- */}
      <section className="py-32 px-4 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase text-white">Data Insights.</h2>
            <p className="text-slate-500 font-mono tracking-widest uppercase text-xs">Real-time telemetry processing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DataCard 
              icon={<Activity className="text-blue-500 w-8 h-8" />}
              label="Model Accuracy"
              value="98.4"
              suffix="%"
              color="bg-blue-500"
              width="w-[98.4%]"
            />
            <DataCard 
              icon={<BarChart3 className="text-green-500 w-8 h-8" />}
              label="Historical Records"
              value="2.4"
              suffix="M+"
              color="bg-green-500"
              subtext="FLIGHT VECTORS ANALYZED"
            />
            <DataCard 
              icon={<PieChart className="text-purple-500 w-8 h-8" />}
              label="Avg Latency"
              value="140"
              suffix="ms"
              color="bg-purple-500"
              subtext="FASTAPI RESPONSE TIME"
            />
          </div>
        </div>
      </section>

      {/* --- SECTION: PRICING --- */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">Pricing Plans.</h2>
          <p className="text-slate-500 font-mono tracking-widest uppercase text-xs">Choose your level of certainty</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* TIER 1: FREE (The Explorer) */}
          <div className="p-10 rounded-4xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm flex flex-col hover:border-slate-700 transition-colors">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-2 text-[10px]">Explorer</h3>
              <div className="text-5xl font-black tracking-tighter">$0<span className="text-lg font-normal text-slate-600">/mo</span></div>
            </div>
            <ul className="space-y-4 mb-10 grow">
              <PricingFeature text="3 AI Predictions / day" active />
              <PricingFeature text="Standard Carriers Only" active />
              <PricingFeature text="Basic Risk Assessment" active />
              <PricingFeature text="Email Support" active />
              <PricingFeature text="Advanced Analytics" active={false} />
            </ul>
            <Link to="/dashboard" className="block w-full py-4 text-center rounded-xl border border-slate-700 hover:bg-slate-800 font-bold transition-all uppercase text-[10px] tracking-widest">
              Get Started
            </Link>
          </div>

          {/* TIER 2: PRO (The Frequent Flyer) */}
          <div className="relative p-10 rounded-4xl border-2 border-blue-500 bg-blue-600/5 backdrop-blur-md flex flex-col transform md:-translate-y-4 shadow-2xl shadow-blue-500/10">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-[8px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-2 text-[10px]">Frequent Flyer</h3>
              <div className="text-5xl font-black tracking-tighter">$12<span className="text-lg font-normal text-slate-500">/mo</span></div>
            </div>
            <ul className="space-y-4 mb-10 grow">
              <PricingFeature text="Unlimited AI Predictions" active />
              <PricingFeature text="All Carriers Worldwide" active />
              <PricingFeature text="Real-time Weather Integration" active />
              <PricingFeature text="Detailed Delay Probability" active />
              <PricingFeature text="Priority 24/7 Support" active />
            </ul>
            <button className="block w-full py-4 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 uppercase text-[10px] tracking-widest">
              Upgrade to Pro
            </button>
          </div>

          {/* TIER 3: ENTERPRISE (The Aviator) - COMING SOON */}
          <div className="p-10 rounded-4xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm flex flex-col opacity-80">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-2 text-[10px]">Aviator</h3>
              <div className="text-5xl font-black tracking-tighter text-slate-600">$29<span className="text-lg font-normal text-slate-700">/mo</span></div>
            </div>
            <ul className="space-y-4 mb-10 grow">
              <PricingFeature text="Full API Access" active />
              <PricingFeature text="Historical Trend Export" active />
              <PricingFeature text="Custom Alert Systems" active />
              <PricingFeature text="Team Collaboration" active />
              <PricingFeature text="Live Satellite Tracking" active={false} isComingSoon />
            </ul>
            <button disabled className="block w-full py-4 rounded-xl border border-slate-800 text-slate-600 font-bold cursor-not-allowed uppercase text-[10px] tracking-widest">
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 text-sm font-mono border-t border-white/5 mt-20">
        © 2026 WINDBREAKER.AI INC. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

const DataCard = ({ icon, label, value, suffix, color, width, subtext }: any) => (
  <div className="bg-slate-950 p-8 rounded-4xl border border-white/5 relative overflow-hidden group">
    <div className="mb-10 flex justify-between items-start">
      <div className="p-3 bg-slate-900 rounded-2xl">{icon}</div>
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{label}</h3>
    </div>
    <div className="flex items-end gap-2 mb-4">
      <span className="text-6xl font-black italic tracking-tighter">{value}</span>
      <span className={`text-2xl font-bold mb-2 ${color.replace('bg-', 'text-')}`}>{suffix}</span>
    </div>
    {width ? (
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className={`${color} h-full ${width} animate-pulse`}></div>
      </div>
    ) : (
      <p className="text-[10px] text-slate-600 font-black tracking-widest">{subtext}</p>
    )}
  </div>
);

const PricingFeature = ({ text, active, isComingSoon }: { text: string; active: boolean; isComingSoon?: boolean }) => (
  <li className={`flex items-center gap-3 text-[12px] ${active ? 'text-slate-300' : 'text-slate-600'}`}>
    <div className={`w-1 h-1 rounded-full ${active ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`}></div>
    <span className={isComingSoon ? 'italic font-medium' : 'font-medium'}>
      {text} {isComingSoon && <span className="text-[8px] bg-slate-800 px-2 py-0.5 rounded ml-1 text-slate-400 font-bold uppercase tracking-tighter">Soon</span>}
    </span>
  </li>
);

export default Landing;