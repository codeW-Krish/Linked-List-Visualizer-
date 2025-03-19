import React from 'react';
import { X, Info, Clock, Palette } from 'lucide-react';
import '../../styles/CircularLinkedListVisualizer.css';

const InfoSidebar = ({ showInfo, setShowInfo }) => {
  if (!showInfo) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <Info size={18} className="mr-2" />
          Circular Linked List
        </h2>
        <button onClick={() => setShowInfo(false)} className="sidebar-close">
          <X size={18} />
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Definition</h3>
          <p>
            A circular linked list is a variation of the linked list where the last node points back to the first node, creating a circular structure.
          </p>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Key Features</h3>
          <ul className="info-list">
            <li>Last node points to the first node</li>
            <li>No NULL pointer at the end</li>
            <li>Can be traversed indefinitely</li>
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
          <div className="complexity-note">* O(1) with tail pointer</div>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">
            <Palette size={16} />
            Color Legend
          </h3>
          <ul className="color-legend-list">
            <li className="color-legend-item">
              <div className="color-sample inserted-sample"></div>
              <span>Newly inserted node</span>
            </li>
            <li className="color-legend-item">
              <div className="color-sample highlighted-sample"></div>
              <span>Node being operated on</span>
            </li>
            <li className="color-legend-item">
              <div className="color-sample deleted-sample"></div>
              <span>Node being deleted</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar; 