import React from 'react';
import '../../styles/CircularLinkedListVisualizer.css';

const Node = ({ value, index, highlighted, appearing, fading, isHead, isTail }) => {
  // Determine the node's visual state based on props
  const nodeClasses = `node ${
    highlighted ? 'node-highlighted' : 'node-normal'
  } ${fading ? 'node-fading' : ''} ${appearing ? 'node-appearing' : ''}`;

  return (
    <div className={nodeClasses}>
      {/* Show Head/Tail indicator if applicable */}
      {isHead && <div className="node-position head-label">Head</div>}
      {isTail && <div className="node-position tail-label">Tail</div>}
      
      {/* Subtle background glow effect */}
      <div className="node-glow"></div>
      
      {/* Display the node value in the center */}
      <div className="node-value">{value}</div>
      
      {/* Display the node index */}
      <div className="node-index">{index}</div>
    </div>
  );
};

export default Node; 