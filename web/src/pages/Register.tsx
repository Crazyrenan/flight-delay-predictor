import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  ArrowRight, 
  Plane, 
  Lock, 
  Mail, 
  Loader2,
  User
} from 'lucide-react';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const visualRef = useRef(null);
  const navigate = useNavigate();

  // Animasi Masuk
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(visualRef.current, {
        x: 50, // Muncul dari kanan
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
      
      gsap.from(formRef.current, {
        x: -50, // Muncul dari kiri
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
    });
    return () => ctx.revert();
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi Register
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      
      {/* --- LEFT SIDE: FORM (Control Panel) --- */}
      <div className="flex items-center justify-center p-6 bg-[#0f172a] relative order-2 lg:order-1">
        {/* Background Glow */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div ref={formRef} className="w-full max-w-md space-y-10 relative z-10">
          
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tighter mb-2">Join the Fleet.</h1>
            <p className="text-slate-500">Create your account to access predictive flight telemetry.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  required
                  placeholder="Captain John Doe"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium placeholder-slate-700"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="pilot@windbreaker.ai"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium placeholder-slate-700"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Set Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium placeholder-slate-700"
                />
              </div>
              <p className="text-[10px] text-slate-600 pl-2">Must be at least 8 characters with 1 special symbol.</p>
            </div>

            {/* Register Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Initialize Account <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* Social / Google Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-4 text-slate-600 font-bold tracking-widest">Or register via</span></div>
          </div>

          <button className="w-full bg-white hover:bg-slate-200 text-slate-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-sm border border-slate-200">
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <p className="text-center text-slate-600 text-sm">
            Already have clearance? <Link to="/login" className="text-blue-500 font-bold hover:text-blue-400">Login Here</Link>
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: VISUAL (The View from 30,000ft) --- */}
      <div ref={visualRef} className="relative hidden lg:flex flex-col justify-between p-12 bg-slate-900 overflow-hidden order-1 lg:order-2">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-slate-900/90 via-blue-900/20 to-slate-900/60"></div>
        
        {/* Content */}
        <div className="relative z-10 flex justify-end">
           <div className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            WINDBREAKER<span className="text-blue-500">.AI</span>
            <Plane className="text-blue-500" />
          </div>
        </div>

        <div className="relative z-10 max-w-lg ml-auto text-right">
          <h2 className="text-6xl font-black tracking-tighter leading-[0.9] mb-6">
            PREPARE FOR<br/>
            <span className="text-blue-500">DEPARTURE.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Join thousands of travelers and airlines using AI to mitigate risk and predict the unpredictable.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest justify-end">
          <span>NEW ACCOUNT REGISTRATION</span>
          <span>•</span>
          <span>SECURE PROTOCOL</span>
        </div>
      </div>

    </div>
  );
};

export default Register;