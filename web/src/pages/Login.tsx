import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  ArrowRight, 
  Plane, 
  Lock, 
  Mail, 
  Loader2,
  Fingerprint
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const formRef = useRef(null);
  const visualRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(visualRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
      
      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
    });
    return () => ctx.revert();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // FastAPI OAuth2 requires form data
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_token", data.access_token);
        localStorage.setItem("user_name", data.user_name);
        // Arahkan ke dashboard
        navigate('/dashboard');
      } else {
        setError(data.detail || "Autentikasi gagal.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans grid grid-cols-1 lg:grid-cols-2 overflow-hidden selection:bg-blue-500 selection:text-white">
      
      <div ref={visualRef} className="relative hidden lg:flex flex-col justify-between p-12 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-slate-900/80 via-blue-900/20 to-slate-900/90"></div>
        
        {/* Content */}
        <div className="relative z-10">
           <div className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            <Plane className="text-blue-500" />
            WINDBREAKER<span className="text-blue-500">.AI</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-6xl font-black tracking-tighter leading-[0.9] mb-6">
            CAPTAIN,<br/>
            <span className="text-blue-500">WELCOME BACK.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Access your flight telemetry dashboard and predictive models. System is ready for takeoff.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <span>SECURE CONNECTION</span>
          <span>•</span>
          <span>ENCRYPTED V.2.1</span>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM (Control Panel) --- */}
      <div className="flex items-center justify-center p-6 bg-[#0f172a] relative">
        {/* Mobile Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div ref={formRef} className="w-full max-w-md space-y-10 relative z-10">
          
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tighter mb-2">Identify Yourself.</h1>
            <p className="text-slate-500">Enter your credentials to access the neural network.</p>
          </div>

          {/* Menampilkan pesan error dari Backend */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase tracking-widest p-4 rounded-xl">
              ERROR: {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@windbreaker.ai"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium placeholder-slate-700"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors">LOST ACCESS?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium placeholder-slate-700"
                />
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Initiate Session <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* Social / Alternative */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-4 text-slate-600 font-bold tracking-widest">Or access via</span></div>
          </div>

          <button className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 active:scale-[0.98] text-slate-300 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-sm">
            <Fingerprint size={18} className="text-slate-500" />
            Biometric / SSO Passkey
          </button>

          <p className="text-center text-slate-600 text-sm">
            New to the system? <Link to="/register" className="text-blue-500 font-bold hover:text-blue-400 transition-colors">Request Clearance</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;