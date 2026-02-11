import React, { useState } from 'react';
import { MEMBERS } from '../constants';
import { PredictionData } from '../types';
import { ArrowRight, Save } from 'lucide-react';

interface PredictionMatrixProps {
  predictions: PredictionData;
  onUpdate: (predictor: string, subject: string, value: string) => void;
}

export const PredictionMatrix: React.FC<PredictionMatrixProps> = ({ predictions, onUpdate }) => {
  const [activePredictor, setActivePredictor] = useState<string>(MEMBERS[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Nhập Dự Đoán</h2>
          <p className="text-sm text-slate-500">Chọn thành viên và điền dự đoán % lương tháng 13 cho mọi người.</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-slate-700 whitespace-nowrap">Người dự đoán:</label>
          <select 
            value={activePredictor}
            onChange={(e) => setActivePredictor(e.target.value)}
            className="h-10 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm border bg-white"
          >
            {MEMBERS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MEMBERS.map((subject) => {
            const val = predictions[activePredictor]?.[subject];
            const isSelf = activePredictor === subject;
            
            return (
              <div key={subject} className={`relative rounded-lg border p-3 transition-colors ${isSelf ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-emerald-300'}`}>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Dự đoán cho {subject} {isSelf && '(Bản thân)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="500"
                    placeholder="0"
                    value={val === '' ? '' : val}
                    onChange={(e) => onUpdate(activePredictor, subject, e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-slate-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-slate-50 px-6 py-3 flex justify-end">
         <div className="text-xs text-slate-500 italic">
            Dữ liệu được lưu tự động trên trình duyệt của bạn.
         </div>
      </div>
    </div>
  );
};
