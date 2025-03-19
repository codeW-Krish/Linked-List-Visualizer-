import React from 'react';
import { X, Info, Clock, Palette } from 'lucide-react';
import '../../../src/styles/LinkedListVisualizer.css';

const InfoSidebar = ({ showInfo, setShowInfo }) => {
  if (!showInfo) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <Info size={18} className="mr-2" />
          Operation Details
        </h2>
        <button onClick={() => setShowInfo(false)} className="sidebar-close">
          <X size={18} />
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Insert Operations</h3>
          <ul className="info-list">
            <li>Insert at Head: Adds a new node at the beginning</li>
            <li>Insert at End: Adds a new node at the end</li>
            <li>Insert at Index: Adds a new node at specified position</li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Delete Operations</h3>
          <ul className="info-list">
            <li>Delete at Head: Removes the first node</li>
            <li>Delete at End: Removes the last node</li>
            <li>Delete at Index: Removes node at specified position</li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">
            <Clock size={16} /> 
            Time Complexity
          </h3>
          <table className="info-complexity-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Insert at Head</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Insert at End</td>
                <td>O(n) / O(1)*</td>
              </tr>
              <tr>
                <td>Insert at Index</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>Delete at Head</td>
                <td>O(1)</td>
              </tr>
              <tr>
                <td>Delete at End</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td>Delete at Index</td>
                <td>O(n)</td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs text-gray-500 mt-2">* O(1) with tail pointer</div>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">
            <Palette size={16} />
            Color Legend
          </h3>
          <ul className="list-none">
            <li className="color-legend-item">
              <div className="color-sample bg-green-100 border border-green-500"></div>
              <span>Newly inserted node</span>
            </li>
            <li className="color-legend-item">
              <div className="color-sample bg-yellow-100 border border-yellow-500"></div>
              <span>Node being operated on</span>
            </li>
            <li className="color-legend-item">
              <div className="color-sample opacity-50 border border-gray-500"></div>
              <span>Node being deleted</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar; 