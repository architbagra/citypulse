import React from 'react';
import { useCityPulse } from '../context/CityPulseContext';
import { CheckCircle2, X } from 'lucide-react';

export const NotificationBanner: React.FC = () => {
  const { alertNotification } = useCityPulse();

  if (!alertNotification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#182923] text-white border border-[#3a4856]/50 rounded-[0.25rem] p-4 shadow-print-lg flex items-start space-x-3 text-xs font-sans">
        <CheckCircle2 className="w-5 h-5 text-[#b7cbc2] shrink-0 mt-0.5" />
        <div className="space-y-1 flex-1">
          <div className="font-bold text-white uppercase tracking-[0.06em] text-[11px]">
            Municipal Action Broadcast Logged
          </div>
          <p className="text-[#edf2eb] leading-relaxed text-[12px]">
            {alertNotification}
          </p>
        </div>
      </div>
    </div>
  );
};
