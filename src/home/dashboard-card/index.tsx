import React from 'react';
import { Link } from 'react-router-dom';


// Chart Data Type
interface ChartDataset {
  data: number[];
  fill: boolean;
  backgroundColor: (context: any) => string;
  borderColor: string;
  borderWidth: number;
  pointRadius: number;
  pointHoverRadius: number;
  pointBackgroundColor: string;
  pointHoverBackgroundColor: string;
  pointBorderWidth: number;
  pointHoverBorderWidth: number;
  clip: number;
  tension: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export const DashboardCard :React.FC = () =>  {

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Acme Plus</h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">$24,780</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div>
        </div>
      </div>
    </div>
  );
}

