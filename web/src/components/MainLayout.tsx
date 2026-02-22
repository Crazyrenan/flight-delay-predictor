import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  PlaneTakeoff, LogOut, User, LayoutDashboard, 
  Timer, BadgeDollarSign 
} from 'lucide-react';

interface Props { children: ReactNode; }

const MainLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("user_name") || "Operator";

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Delay Predictor', path: '/delay-predictor', icon: <Timer size={20} /> },
    { name: 'Price Oracle', path: '/price-oracle', icon: <BadgeDollarSign size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 font-sans">
      {/* SIDEBAR FIXED */}
      <aside className="w-64 border-r border-slate-800 flex flex-col p-6 fixed h-full bg-[#0f172a] z-50">
        <div className="flex items-center gap-2 mb-10 px-2">
          <PlaneTakeoff className="text-blue-500 w-8 h-8" />
          <h1 className="text-xl font-black italic tracking-tighter">WINDBREAKER<span className="text-blue-600">.AI</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                location.pathname === item.path 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-800 pt-6 mt-6">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
              <User size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Status: Active</p>
              <p className="text-sm font-bold truncate w-32">{userName}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;