import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, User, Phone, Mail } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookDemo: (booking: { id: string; clientName: string; email: string; phone: string; date: string; time: string; machineInterest: string }) => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose, onBookDemo }) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-10');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [machineInterest, setMachineInterest] = useState('Apex-X400 Heavy Duty CNC Lathe');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  if (!isOpen) return null;

  const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM', '05:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = {
      id: `DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      email,
      phone,
      date: selectedDate,
      time: selectedTime,
      machineInterest
    };
    onBookDemo(newBooking);
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-blue-200 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Schedule Live Factory Video Demo & Call</h3>
            <p className="text-xs text-slate-500">Pick a convenient time slot for a live walk-through with our CNC chief engineer.</p>
          </div>
        </div>

        {bookedSuccess ? (
          <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">Live Demo Session Booked Successfully!</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              We have sent calendar confirmation details and Google Meet link to <strong className="text-blue-600">{email}</strong> for {selectedDate} at {selectedTime}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5 font-bold">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5 font-bold">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all ${selectedTime === slot ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-blue-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ing. Saim Farooq"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-semibold">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="saim@mughaltech.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-semibold">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0743065"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-semibold">Machine of Interest</label>
                  <select
                    value={machineInterest}
                    onChange={(e) => setMachineInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                  >
                    <option value="Apex-X400 Heavy Duty CNC Lathe">Apex-X400 Heavy Duty CNC Lathe</option>
                    <option value="Titan-T600 Ultra-Precision Turning Center">Titan-T600 Ultra-Precision Turning Center</option>
                    <option value="Vortex-M505 Vertical Milling Center">Vortex-M505 Vertical Milling Center</option>
                    <option value="Custom Factory Setup">Custom Factory Setup</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Live Demo & Factory Call Booking</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
