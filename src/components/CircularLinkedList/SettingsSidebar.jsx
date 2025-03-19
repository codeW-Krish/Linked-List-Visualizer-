import React from 'react';
import { X, Settings, Zap, Trash2, RotateCcw } from 'lucide-react';
import '../../styles/CircularLinkedListVisualizer.css';

const SettingsSidebar = ({ 
  showSettings, 
  setShowSettings, 
  animationSpeed, 
  setAnimationSpeed, 
  clearNodes, 
  clearSteps, 
  animationActive 
}) => {
  if (!showSettings) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <Settings size={18} className="mr-2" />
          Settings
        </h2>
        <button onClick={() => setShowSettings(false)} className="sidebar-close">
          <X size={18} />
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">
            <Zap size={16} />
            Animation Speed
          </h3>
          <div className="settings-description">Adjust how fast the animations play</div>
          <select 
            value={animationSpeed} 
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            className="input-field w-full"
            disabled={animationActive}
          >
            <option value="2000">Slow</option>
            <option value="1000">Medium</option>
            <option value="500">Fast</option>
          </select>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Management</h3>
          <button 
            onClick={clearNodes} 
            disabled={animationActive}
            className="btn-danger"
          >
            <Trash2 size={16} />
            Clear Circular List
          </button>
          
          <button 
            onClick={clearSteps} 
            disabled={animationActive}
            className="btn-clear"
          >
            <RotateCcw size={16} />
            Clear Operation Steps
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar; 