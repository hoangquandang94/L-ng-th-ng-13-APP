import React from 'react';
import { MEMBERS } from '../constants';
import { PredictionData, ActualData, ScoreBoardItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface LeaderboardProps {
  predictions: PredictionData;
  actuals: ActualData;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ predictions, actuals }) => {
  // Calculate scores
  const scores: ScoreBoardItem[] = MEMBERS.map(predictor => {
    let totalError = 0;
    let totalPredicted = 0;
    let totalActual = 0;
    let bias = 0;
    let validCount = 0;

    MEMBERS.forEach(subject => {
      const pred = predictions[predictor]?.[subject];
      const act = actuals[subject];

      if (typeof pred === 'number' && typeof act === 'number') {
        const error = Math.abs(pred - act);
        totalError += error;
        totalPredicted += pred;
        totalActual += act;
        bias += (pred - act);
        validCount++;
      }
    });

    return {
      predictor,
      totalError,
      totalPredicted,
      totalActual,
      bias,
      validCount
    };
  }).sort((a, b) => a.totalError - b.totalError); // Sort by lowest error (best score)

  const isDataIncomplete = scores.every(s => s.validCount === 0);

  if (isDataIncomplete) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="text-slate-400 mb-2">Chưa có dữ liệu</div>
        <p className="text-slate-500">Vui lòng nhập dự đoán và kết quả thực tế để xem bảng xếp hạng.</p>
      </div>
    );
  }

  // Prepare data for chart
  const chartData = scores.map(s => ({
    name: s.predictor,
    'Tổng sai lệch (Error)': s.totalError,
    'Độ lệch (Bias)': s.bias
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800">Bảng Xếp Hạng Độ Chính Xác</h2>
          <p className="text-sm text-slate-500">Người có tổng sai lệch thấp nhất là người chiến thắng.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hạng</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Thành Viên</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Tổng Sai Lệch</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Tổng Dự Đoán</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Tổng Thực Tế</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Xu Hướng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {scores.map((score, idx) => (
                <tr key={score.predictor} className={idx === 0 ? "bg-emerald-50/50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {idx === 0 ? <span className="text-xl">👑</span> : idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{score.predictor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-slate-900">{score.totalError.toFixed(1)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500">{score.totalPredicted.toFixed(1)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500">{score.totalActual.toFixed(1)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      score.bias > 0 
                        ? 'bg-blue-100 text-blue-800' 
                        : score.bias < 0 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {score.bias > 0 ? 'Lạc quan' : score.bias < 0 ? 'Bi quan' : 'Chuẩn xác'} ({score.bias > 0 ? '+' : ''}{score.bias.toFixed(1)})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-96">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Biểu đồ Sai Số (Thấp hơn là tốt hơn)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={60} tick={{fontSize: 12}} />
              <YAxis />
              <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top"/>
              <Bar dataKey="Tổng sai lệch (Error)" fill="#10b981" radius={[4, 4, 0, 0]}>
                {
                    chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#059669' : '#34d399'} />
                    ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
};
