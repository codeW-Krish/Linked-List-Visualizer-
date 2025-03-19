import React from 'react';
import { ArrowRight } from 'lucide-react';
import Node from './Node';
import '../../../src/styles/LinkedListVisualizer.css';

const Visualization = ({ nodes }) => {
  return (
    <div className="visualization-area">
      {nodes.length === 0 ? (
        <div className="empty-list">
          <div>
            <div className="mb-2 text-gray-400">Empty list</div>
            <div>Add a node using the controls above to begin</div>
          </div>
        </div>
      ) : (
        <div className="node-container">
          {nodes.map((node, idx) => (
            <div className="node-with-arrow" key={idx}>
              <Node
                value={node.value}
                index={idx}
                highlighted={node.highlighted}
                appearing={node.appearing}
                fading={node.fading}
                isHead={idx === 0}
                isTail={idx === nodes.length - 1}
              />
              {idx < nodes.length - 1 ? (
                <div className="arrow-connector">
                  <ArrowRight size={28} strokeWidth={2.5} />
                </div>
              ) : (
                <div className="null-pointer" data-testid="null-pointer">
                  <div className="null-circle">
                    <span>NULL</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Visualization; 