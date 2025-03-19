import React from 'react';
import { Plus, Minus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import '../../styles/CircularLinkedListVisualizer.css';

const Controls = ({
  inputValue,
  setInputValue,
  inputIndex,
  setInputIndex,
  onInsertHead,
  onInsertEnd,
  onInsertIndex,
  onDeleteHead,
  onDeleteEnd,
  onDeleteIndex,
  onClear,
  isAnimating,
}) => {
  return (
    <div className="controls-container">
      <div className="controls-inputs">
        <div className="input-group">
          <label className="input-label">Node Value</label>
          <input
            type="number"
            className="input-field"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnimating}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Position Index</label>
          <input
            type="number"
            className="input-field"
            placeholder="Index"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            disabled={isAnimating}
            min="0"
          />
        </div>
      </div>

      <div className="controls-buttons">
        <div className="controls-group">
          <div className="controls-group-label">Insert Operations</div>
          <div className="controls-group-buttons">
            <button 
              onClick={onInsertHead}
              disabled={isAnimating}
              className="btn btn-insert"
            >
              <ArrowLeft size={16} />
              Head
            </button>
            <button 
              onClick={onInsertEnd}
              disabled={isAnimating}
              className="btn btn-insert"
            >
              Tail
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={onInsertIndex}
              disabled={isAnimating}
              className="btn btn-insert"
            >
              <Plus size={16} />
              At Index
            </button>
          </div>
        </div>

        <div className="controls-group">
          <div className="controls-group-label">Delete Operations</div>
          <div className="controls-group-buttons">
            <button 
              onClick={onDeleteHead}
              disabled={isAnimating}
              className="btn btn-delete"
            >
              <Minus size={16} />
              Head
            </button>
            <button 
              onClick={onDeleteEnd}
              disabled={isAnimating}
              className="btn btn-delete"
            >
              <Minus size={16} />
              Tail
            </button>
            <button 
              onClick={onDeleteIndex}
              disabled={isAnimating}
              className="btn btn-delete"
            >
              <Minus size={16} />
              At Index
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClear}
          disabled={isAnimating}
          className="btn btn-clear"
        >
          <Trash2 size={16} />
          Clear List
        </button>
      </div>
    </div>
  );
};

export default Controls; 