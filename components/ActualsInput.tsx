import React from 'react';
import { MEMBERS } from '../constants';
import { ActualData } from '../types';
import { Lock } from 'lucide-react';

interface ActualsInputProps {
  actuals: ActualData;
  onUpdate: (subject: string, value: string) => void;
  isLocked?: boolean;
}

export const ActualsInput: React.FC<ActualsInputProps> = ({ actuals, onUpdate, isLocked = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-emerald-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-emerald-900">Kết Quả Thực Tế</h2>
          <p className="text-sm text-emerald-700">Điền % thực tế nhận được để tính điểm.</p>
        </div>
        <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
           <Lock size={20} />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {MEMBERS.map((subject) => {
            const val = actuals[subject];
            return (
              <div key={subject} className="relative">
                <label className="block text-xs font-semibold text-emerald-800 mb-1">
                  {subject}
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    min="0"
                    value={val === '' ? '' : val}
                    onChange={(e) => onUpdate(subject, e.target.value)}
                    disabled={isLocked}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-emerald-900 ring-1 ring-inset ring-emerald-200 placeholder:text-emerald-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-emerald-50/50"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-emerald-600 sm:text-sm font-bold">%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
