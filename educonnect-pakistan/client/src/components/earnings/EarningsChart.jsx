import React from "react";

const EarningsChart = ({ weekly, monthly }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">💸 Earnings Summary</h3>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">📆 Weekly Earnings</h4>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {Object.entries(weekly).map(([week, total]) => (
            <li key={week}>
              <span className="font-medium">{week}</span>: Rs. {total}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2">📅 Monthly Earnings</h4>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {Object.entries(monthly).map(([month, total]) => (
            <li key={month}>
              <span className="font-medium">{month}</span>: Rs. {total}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EarningsChart;
