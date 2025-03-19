import React from 'react';
import '../../styles/CircularLinkedListVisualizer.css';

const StepsList = ({ steps }) => {
  return (
    <div className="visualization-card-content">
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