import React from 'react';
import { Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';
import '../../../src/styles/LinkedListVisualizer.css';

const Controls = ({
  value,
  setValue,
  index,
  setIndex,
  insertAtHead,
  insertAtEnd,
  insertAtIndex,
  deleteAtHead,
  deleteAtEnd,
  deleteAtIndex,
  animationActive,
  nodesLength
}) => {
  return (
    <div className="controls-container">
      <div className="controls-inputs">
        <div className="input-group">
          <label className="input-label">Node Value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="input-field"
            disabled={animationActive}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Position Index</label>
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(parseInt(e.target.value) || 0)}
            placeholder="Index"
            className="input-field w-20"
            min="0"
            disabled={animationActive}
          />
        </div>
      </div>
      
      <div className="controls-buttons">
        <div className="controls-group">
          <div className="controls-group-label">Insert Operations</div>
          <div className="controls-group-buttons">
            <button 
              onClick={insertAtHead}
              disabled={animationActive}
              className="btn btn-insert"
              title="Add node at the beginning of the list"
            >
              <ArrowLeft size={16} />
              Head
            </button>
            <button 
              onClick={insertAtEnd}
              disabled={animationActive}
              className="btn btn-insert"
              title="Add node at the end of the list"
            >
              Tail
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={insertAtIndex}
              disabled={animationActive}
              className="btn btn-insert"
              title={`Add node at index ${index}`}
            >
              <Plus size={16} />
              At Index {index}
            </button>
          </div>
        </div>

        <div className="controls-group">
          <div className="controls-group-label">Delete Operations</div>
          <div className="controls-group-buttons">
            <button 
              onClick={deleteAtHead}
              disabled={animationActive || nodesLength === 0}
              className="btn btn-delete"
              title="Remove the first node"
            >
              <X size={16} />
              Head
            </button>
            <button 
              onClick={deleteAtEnd}
              disabled={animationActive || nodesLength === 0}
              className="btn btn-delete"
              title="Remove the last node"
            >
              <X size={16} />
              Tail
            </button>
            <button 
              onClick={deleteAtIndex}
              disabled={animationActive || nodesLength === 0}
              className="btn btn-delete"
              title={`Remove node at index ${index}`}
            >
              <X size={16} />
              At Index {index}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls; 