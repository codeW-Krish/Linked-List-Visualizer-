import React from 'react';
import '../../../src/styles/LinkedListVisualizer.css';

const StepsList = ({ steps }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Operation Steps</h2>
      <div className="steps-container">
        {steps.length === 0 ? (
          <div className="steps-empty">No operation performed yet</div>
        ) : (
          <ul className="steps-list">
            {steps.map((step, index) => (
              <li key={index} className="step-item">
                <div className="step-arrow">→</div>
                <div className="step-content">{step}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StepsList; 