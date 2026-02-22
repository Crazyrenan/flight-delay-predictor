import { useState, useEffect } from 'react';
import axios from 'axios';
import { BadgeDollarSign, Loader2 } from 'lucide-react';

const PriceOracle = () => {
  const [formData, setFormData] = useState({
    airline: '',
    origin: '',
    destination: '',
    duration_mins: 120
  });

  const [options, setOptions] = useState<{airlines: string[], cities: string[]}>({ airlines: [], cities: [] });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{estimated_price: number} | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/options');
        setOptions(res.data);
      } catch (err) {
        console.error("Gagal memuat opsi:", err);
      }
    };
    fetchOptions();
  }, []);

  const handlePredictPrice = async () => {
    setLoading(true);
    setResult(null);
    try {
      const token = localStorage.getItem("user_token");
      const response = await axios.post('http://127.0.0.1:8000/api/predict-price', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(response.data);
    } catch (error) {
      alert("Gagal memprediksi harga. Pastikan sesi Anda valid!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full grid grid-cols-12 gap-6 mx-auto">
      <div className="col-span-12 mb-6">
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
          Price<span className="text-blue-600"> Oracle</span>
        </h2>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Neural Price Estimation Engine</p>
      </div>

      <div className="col-span-12 lg:col-span-7 bg-slate-900/40 border border-slate-800 p-10 rounded-4xl backdrop-blur-md">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <div className="col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Carrier</label>
            <select 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:border-blue-500 text-slate-300"
              value={formData.airline}
              onChange={(e) => setFormData({...formData, airline: e.target.value})}
            >
              <option value="">Select Airline</option>
              {options.airlines.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="col-span-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Destination</label>
            <select 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:border-blue-500 text-slate-300"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            >
              <option value="">Select City</option>
              {options.cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="col-span-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Duration (Mins)</label>
            <input 
              type="number" 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none text-slate-300"
              value={formData.duration_mins}
              onChange={(e) => setFormData({...formData, duration_mins: parseInt(e.target.value) || 0})}
            />
          </div>
        </div>

        <button 
          onClick={handlePredictPrice}
          disabled={loading}
          className="w-full mt-10 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-900/20"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : 'Calculate Fair Price'}
        </button>
      </div>

      <div className="col-span-12 lg:col-span-5 h-full min-h-[400px]">
        {result ? (
          <div className="h-full bg-gradient-to-b from-slate-900 to-black border border-slate-800 p-10 rounded-5xl flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 blur-[120px] rounded-full opacity-20 bg-blue-600"></div>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Estimated Fare</h3>
            <h3 className="text-6xl font-black mb-6 tracking-tighter italic text-white">
              <span className="text-2xl not-italic opacity-50 mr-2">$</span>
              {result.estimated_price.toLocaleString()}
            </h3>
            <div className="py-4 px-8 rounded-2xl border border-blue-500/30 bg-blue-500/20 text-blue-400 font-black uppercase tracking-widest text-sm">
              Market Oracle Verified
            </div>
          </div>
        ) : (
          <div className="h-full border-2 border-dashed border-slate-800/50 rounded-5xl flex flex-col items-center justify-center p-12 text-slate-700 bg-slate-900/10 text-center">
            <BadgeDollarSign className="opacity-10 animate-pulse mb-4" size={64} />
            <p className="font-bold uppercase tracking-widest text-[10px]">Awaiting Price Logic...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceOracle;