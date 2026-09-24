import React, { useState } from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { X, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const MunicipalAlertModal: React.FC = () => {
  const {
    isMunicipalAlertModalOpen,
    setIsMunicipalAlertModalOpen,
    selectedZone,
    triggerMunicipalAlert
  } = useCityPulse();

  const [department, setDepartment] = useState('JMC_DRAINAGE');
  const [dispatchType, setDispatchType] = useState('PUMP_DEPLOYMENT');
  const [notes, setNotes] = useState('Deploy Mobile Pump Unit #04 to Paanch Batti Circle immediately to relieve Sanganeri outfall surcharge.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isMunicipalAlertModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      triggerMunicipalAlert(
        selectedZone.name,
        `[${department}] ${dispatchType}: ${notes}`
      );
      setIsSubmitting(false);
      setIsMunicipalAlertModalOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#182923]/60 backdrop-blur-[12px] animate-in fade-in duration-200">
      <div className="bg-[#ffffff] border border-[#c2c8c4]/80 rounded-[0.25rem] max-w-lg w-full shadow-print-lg flex flex-col text-[#181d19]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#eaefe8] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-[#8a2d2d]" />
            <div>
              <span className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold block">
                CIVIC DISPATCH PROTOCOL
              </span>
              <h2 className="font-serif text-xl font-medium text-[#182923]">
                Issue Municipal Action Order
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsMunicipalAlertModalOpen(false)}
            className="w-8 h-8 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#52606f] hover:text-[#182923] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="font-sans text-xs font-semibold text-[#182923] uppercase tracking-[0.06em]">
              Target Civic Sector
            </label>
            <input
              type="text"
              readOnly
              value={`${selectedZone.code} · ${selectedZone.name}`}
              className="w-full px-3.5 py-2.5 bg-[#f0f5ee] border border-[#c2c8c4]/80 rounded-[0.25rem] font-sans text-xs text-[#182923] cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-sans text-xs font-semibold text-[#182923] uppercase tracking-[0.06em]">
              Recipient Municipal Department
            </label>
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#c2c8c4] focus:border-[#3a4856] focus:ring-2 focus:ring-[#7879f1]/25 rounded-[0.25rem] font-sans text-xs text-[#182923] outline-none"
            >
              <option value="JMC_DRAINAGE">Jaipur Municipal Corporation · Drainage Wing</option>
              <option value="TRAFFIC_POLICE">Jaipur Traffic Police · Control Room</option>
              <option value="JCTSL_TRANSIT">JCTSL · Bus Transit Operations</option>
              <option value="DISASTER_CELL">Rajasthan State Disaster Management Authority</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-sans text-xs font-semibold text-[#182923] uppercase tracking-[0.06em]">
              Dispatch Protocol Action
            </label>
            <select
              value={dispatchType}
              onChange={e => setDispatchType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#c2c8c4] focus:border-[#3a4856] focus:ring-2 focus:ring-[#7879f1]/25 rounded-[0.25rem] font-sans text-xs text-[#182923] outline-none"
            >
              <option value="PUMP_DEPLOYMENT">Emergency Mobile Pump Deployment (Unit #04)</option>
              <option value="TRAFFIC_DIVERSION">Arterial Friction Diversion (M.I. Road → Sansar Chandra)</option>
              <option value="GRATE_CLEARANCE">Catch-Basin Silt Clearance Crew</option>
              <option value="CITIZEN_BROADCAST">Public Traffic Advisory Push Notification</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-sans text-xs font-semibold text-[#182923] uppercase tracking-[0.06em]">
              Operational Brief & Field Instructions
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Enter instructions for field command..."
              className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#c2c8c4] focus:border-[#3a4856] focus:ring-2 focus:ring-[#7879f1]/25 rounded-[0.25rem] font-sans text-xs text-[#182923] outline-none placeholder-[#737875]"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-[#eaefe8] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsMunicipalAlertModalOpen(false)}
              className="h-9 px-4 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-9 px-5 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase flex items-center space-x-2 transition-all shadow-print disabled:opacity-50 focus:ring-2 focus:ring-[#7879f1]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH ACTION ORDER'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
