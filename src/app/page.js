"use client";

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Scissors, Trash2, PawPrint, Scale, Phone, Search, AlertCircle, CheckCircle2, Loader2, Truck, ShieldAlert, MessageCircle } from 'lucide-react';

const DEFAULT_FORM_DATA = {
  owner: '', phone: '', pet: '', breed: '', weight: '', date: '', time: '', service: 'Bath', aggressive: false
};

export default function Home() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3500);
  };

  const fetchAppointments = async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required Fields Validation
    if (!formData.owner.trim()) {
      showToast("Please fill the Pet Owner field to finish the appointment", "error");
      return;
    }
    if (!formData.phone.trim()) {
      showToast("Please fill the Phone field to finish the appointment", "error");
      return;
    }
    if (!formData.pet.trim()) {
      showToast("Please fill the Pet Name field to finish the appointment", "error");
      return;
    }
    if (!formData.breed.trim()) {
      showToast("Please fill the Breed field to finish the appointment", "error");
      return;
    }
    if (!formData.date) {
      showToast("Please fill the Date field to finish the appointment", "error");
      return;
    }
    if (!formData.time) {
      showToast("Please fill the Time field to finish the appointment", "error");
      return;
    }
    if (!formData.weight) {
      showToast("Please fill the Weight field to finish the appointment", "error");
      return;
    }

    // Business Validations
    if (parseFloat(formData.weight) < 0) {
      showToast("Weight cannot be negative", "error");
      return;
    }
    
    const selectedDate = new Date(formData.date + "T00:00:00");
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (selectedDate < today) {
      showToast("Cannot schedule in the past", "error");
      return;
    }
    
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      showToast("Appointments only Monday to Friday", "error");
      return;
    }
    
    const timeHour = parseInt(formData.time.split(':')[0]);
    const timeMinute = parseInt(formData.time.split(':')[1]);
    
    if (timeMinute !== 0 && timeMinute !== 30) {
      showToast("Appointments must be at :00 or :30", "error");
      return;
    }

    const minutes = timeHour * 60 + timeMinute;
    const minTime = 10 * 60; // 10:00
    const maxTime = 18 * 60; // 18:00
    if (minutes < minTime || minutes > maxTime) {
      showToast("Business hours are 10:00 to 18:00", "error");
      return;
    }

    setIsLoading(true);
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormData(DEFAULT_FORM_DATA);
      showToast("Appointment successfully created!", "success");
      fetchAppointments();
    } catch (err) {
      showToast("Error creating appointment", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    showToast("Appointment cancelled", "success");
    fetchAppointments();
  };

  const filteredAppointments = appointments.filter(app => {
    const petName = app.pet || '';
    const ownerName = app.owner || '';
    return petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ownerName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 font-sans text-slate-800 relative">
      
      {/* Toast Notification */}
      {toast.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform z-50 ${toast.type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' : 'bg-green-100 text-green-800 border-l-4 border-green-500'}`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center text-white space-y-4 pt-10">
          <img src="/pets.png" alt="Cute Dog and Cat" className="w-48 h-48 mx-auto rounded-2xl shadow-xl border-4 border-white/50 object-cover bg-white" />
          <h1 className="text-5xl font-extrabold tracking-tight">Paws & Bubbles Spa</h1>
          <p className="text-lg opacity-90">Schedule your pet's relaxation moment</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-indigo-900">New Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-5" data-testid="appointment-form" noValidate>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Pet Owner</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="text" id="owner-input" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none" placeholder="Ex: Mary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="tel" id="phone-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none" placeholder="Ex: 91234-5678" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Pet Name</label>
                  <div className="relative">
                    <PawPrint className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="text" id="pet-input" value={formData.pet} onChange={e => setFormData({...formData, pet: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Ex: Rex" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Breed</label>
                  <div className="relative">
                    <PawPrint className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="text" id="breed-input" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Ex: Poodle" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="date" id="date-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Time (10h-18h)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select id="time-input" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none appearance-none">
                      <option value="" disabled hidden>Select time</option>
                      {Array.from({ length: 17 }).map((_, i) => {
                        const hour = Math.floor(i / 2) + 10;
                        const minute = i % 2 === 0 ? '00' : '30';
                        const timeStr = `${hour}:${minute}`;
                        return <option key={timeStr} value={timeStr}>{timeStr}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Weight (kg)</label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="number" step="0.1" id="weight-input" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Ex: 5.5" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Service</label>
                  <div className="relative">
                    <Scissors className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select id="service-input" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none appearance-none">
                      <option>Bath</option>
                      <option>Grooming</option>
                      <option>Bath & Grooming</option>
                      <option>Nail Clipping</option>
                      <option>Bath & Nail Clipping</option>
                      <option>Bath, Grooming & Nail Clipping</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="aggressive-input" checked={formData.aggressive} onChange={e => setFormData({...formData, aggressive: e.target.checked})} className="rounded text-indigo-600 focus:ring-indigo-400 w-4 h-4" />
                  <span className="text-sm font-semibold text-red-600 flex items-center gap-1"><ShieldAlert className="w-4 h-4" /> Is the pet aggressive?</span>
                </label>
              </div>

              <button disabled={isLoading} type="submit" id="submit-button" className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {isLoading ? "Saving..." : "Confirm Appointment"}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">Today's Schedule</h2>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" id="search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by pet or owner name..." className="w-full pl-10 pr-4 py-2 rounded-xl border-gray-200 bg-white focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2" id="appointment-list">
              {filteredAppointments.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">No appointments found.</div>
              ) : (
                filteredAppointments.map(app => (
                  <div key={app.id} className="appointment-item bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                    <div>
                      <div className="font-bold text-lg text-indigo-900 flex items-center gap-2">
                        {app.pet} 
                        {app.aggressive && <ShieldAlert className="w-4 h-4 text-red-500" title="Aggressive Pet" />}
                        <span className="text-sm font-normal text-gray-500">({app.owner}{app.phone ? ` - ${app.phone}` : ''})</span>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-3 mt-1">
                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {app.date}</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {app.time}</span>
                        {app.breed && <span className="flex items-center"><PawPrint className="w-3 h-3 mr-1" /> {app.breed}</span>}
                        {app.weight && <span className="flex items-center"><Scale className="w-3 h-3 mr-1" /> {app.weight}kg</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs font-semibold text-pink-600 bg-pink-50 inline-block px-2 py-1 rounded-full">{app.service}</div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(app.id)} className="delete-button text-gray-300 hover:text-red-500 transition-colors p-2" aria-label="Cancel appointment">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 text-center">Pricing by Size</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-2xl shadow-sm border border-indigo-200 text-center flex-1 hover:shadow-md transition-shadow">
              <div className="font-bold text-xl text-indigo-900 mb-2">Small Pet</div>
              <div className="text-gray-600 text-sm mb-4">Under 10kg</div>
              <div className="text-3xl font-extrabold text-indigo-600">€18</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-100 p-6 rounded-2xl shadow-sm border border-purple-200 text-center flex-1 hover:shadow-md transition-shadow">
              <div className="font-bold text-xl text-purple-900 mb-2">Medium Pet</div>
              <div className="text-gray-600 text-sm mb-4">10kg - 25kg</div>
              <div className="text-3xl font-extrabold text-purple-600">€25</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-2xl shadow-sm border border-pink-200 text-center flex-1 hover:shadow-md transition-shadow">
              <div className="font-bold text-xl text-pink-900 mb-2">Large Pet</div>
              <div className="text-gray-600 text-sm mb-4">Over 25kg</div>
              <div className="text-3xl font-extrabold text-pink-600">€30</div>
            </div>
          </div>
        </div>

        {/* Contact / Footer */}
        <div className="text-center text-white/90 pt-4 pb-2">
          <div className="inline-flex items-center gap-2 bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10 shadow-lg">
            <MessageCircle className="w-6 h-6 text-green-400" />
            <span className="text-lg">Any doubts? Contact us on WhatsApp: <strong className="tracking-wide">+55 11 99999-9999</strong> 🐶😸😊</span>
          </div>
        </div>
      </div>
    </main>
  );
}
