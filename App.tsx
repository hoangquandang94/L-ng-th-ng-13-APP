import React, { useState, useEffect } from 'react';
import { PredictionMatrix } from './components/PredictionMatrix';
import { ActualsInput } from './components/ActualsInput';
import { Leaderboard } from './components/Leaderboard';
import { PredictionData, ActualData } from './types';
import { INITIAL_PREDICTIONS, INITIAL_ACTUALS } from './constants';
import { Calculator, BarChart3, Settings2 } from 'lucide-react';
import { Button } from './components/ui/Button';

function App() {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'input' | 'actuals' | 'results'>('input');
  
  const [predictions, setPredictions] = useState<PredictionData>(() => {
    const saved = localStorage.getItem('salary_predictions');
    return saved ? JSON.parse(saved) : INITIAL_PREDICTIONS;
  });

  const [actuals, setActuals] = useState<ActualData>(() => {
    const saved = localStorage.getItem('salary_actuals');
    return saved ? JSON.parse(saved) : INITIAL_ACTUALS;
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('salary_predictions', JSON.stringify(predictions));
  }, [predictions]);

  useEffect(() => {
    localStorage.setItem('salary_actuals', JSON.stringify(actuals));
  }, [actuals]);

  // --- Handlers ---
  const handlePredictionUpdate = (predictor: string, subject: string, value: string) => {
    const numValue = value === '' ? '' : parseFloat(value);
    setPredictions(prev => ({
      ...prev,
      [predictor]: {
        ...prev[predictor],
        [subject]: numValue
      }
    }));
  };

  const handleActualUpdate = (subject: string, value: string) => {
    const numValue = value === '' ? '' : parseFloat(value);
    setActuals(prev => ({
      ...prev,
      [subject]: numValue
    }));
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác.')) {
        setPredictions(INITIAL_PREDICTIONS);
        setActuals(INITIAL_ACTUALS);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
               <Calculator className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Lương Tháng 13</h1>
            <h1 className="text-xl font-bold text-slate-800 sm:hidden">13th Salary</h1>
          </div>
          
          <nav className="flex space-x-1">
             <Button 
                variant={activeTab === 'input' ? 'primary' : 'ghost'} 
                onClick={() => setActiveTab('input')}
                size="sm"
             >
                <span className="hidden sm:inline">Dự Đoán</span>
                <span className="sm:hidden">Nhập</span>
             </Button>
             <Button 
                variant={activeTab === 'actuals' ? 'primary' : 'ghost'} 
                onClick={() => setActiveTab('actuals')}
                size="sm"
             >
                <span className="hidden sm:inline">Thực Tế</span>
                <span className="sm:hidden">KQ</span>
             </Button>
             <Button 
                variant={activeTab === 'results' ? 'primary' : 'ghost'} 
                onClick={() => setActiveTab('results')}
                size="sm"
             >
                <span className="hidden sm:inline">Kết Quả</span>
                <span className="sm:hidden">BXH</span>
             </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Helper Banner */}
        <div className="mb-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Cuộc đua Dự Đoán Thưởng Tết</h2>
            <p className="text-emerald-50 max-w-2xl">
              Nhập dự đoán của bạn về % lương tháng 13 cho các thành viên trong nhóm. 
              Sau khi có kết quả thực tế, hệ thống sẽ tính toán xem ai là "Nhà Tiên Tri" tài ba nhất!
            </p>
        </div>

        <div className="space-y-8">
          {activeTab === 'input' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <PredictionMatrix 
                 predictions={predictions} 
                 onUpdate={handlePredictionUpdate} 
               />
            </div>
          )}

          {activeTab === 'actuals' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <ActualsInput 
                actuals={actuals} 
                onUpdate={handleActualUpdate} 
              />
            </div>
          )}

          {activeTab === 'results' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Leaderboard 
                predictions={predictions} 
                actuals={actuals} 
              />
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
            <button 
                onClick={handleClearAll}
                className="text-sm text-red-500 hover:text-red-700 underline decoration-red-500/30"
            >
                Xóa toàn bộ dữ liệu và làm lại
            </button>
        </div>
      </main>
    </div>
  );
}

export default App;
