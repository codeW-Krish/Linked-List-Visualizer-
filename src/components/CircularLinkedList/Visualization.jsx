import React, { useEffect, useRef } from 'react';
import Node from './Node';
import { ArrowRight } from 'lucide-react';
import '../../styles/CircularLinkedListVisualizer.css';

const Visualization = ({ nodes }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // For horizontal display, use the width of the container
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    // Calculate node spacing and positioning
    const nodeSize = 80; // Node width and height
    const nodeSpacing = Math.min(150, Math.max(100, (containerWidth - 100) / (nodes.length || 1)));
    const startX = Math.max(50, (containerWidth - (nodes.length - 1) * nodeSpacing) / 2);
    const centerY = containerHeight / 2;
    
    // Calculate positions for each node in a horizontal line
    const positions = nodes.map((_, index) => {
      return {
        x: startX + index * nodeSpacing,
        y: centerY
      };
    });

    // Update node positions
    const nodeWrappers = container.getElementsByClassName('circular-node-wrapper');
    Array.from(nodeWrappers).forEach((wrapper, index) => {
      wrapper.style.transform = `translate(${positions[index].x - nodeSize/2}px, ${positions[index].y - nodeSize/2}px)`;
    });

    // Update connector positions between nodes
    const connectors = container.getElementsByClassName('circular-connector');
    Array.from(connectors).forEach((connector, index) => {
      if (index < nodes.length - 1) {
        const start = positions[index];
        // Calculate connector properties
        const length = nodeSpacing - nodeSize + 20; // Adjust to connect nodes properly
        
        // Position connector
        connector.style.width = `${length}px`;
        connector.style.height = '3px';
        connector.style.left = `${start.x + nodeSize/2 - 10}px`;
        connector.style.top = `${start.y}px`;
        connector.style.transform = 'rotate(0deg)'; // Horizontal connector
        connector.style.display = 'block';
        
        // Position the arrow icon
        const arrowIcon = connector.querySelector('.connector-arrow');
        if (arrowIcon) {
          arrowIcon.style.right = '-8px';
          arrowIcon.style.top = '-7px';
        }
      } else {
        // Hide the last regular connector as we'll use the return arrow instead
        connector.style.display = 'none';
      }
    });

    // Position the return arrow from last node to head
    if (nodes.length > 0) {
      const returnArrow = container.querySelector('.return-arrow');
      if (returnArrow) {
        if (nodes.length === 1) {
          // Special case for a single node: create a loop to self
          const node = positions[0];
          const loopSize = 60;
          
          returnArrow.style.width = `${loopSize}px`;
          returnArrow.style.height = `${loopSize/2}px`;
          returnArrow.style.left = `${node.x + nodeSize/2}px`;
          returnArrow.style.top = `${node.y - loopSize/2}px`;
          returnArrow.style.borderRadius = '50% 50% 0 0';
          returnArrow.style.border = '3px solid var(--primary-light)';
          returnArrow.style.borderBottom = 'none';
          returnArrow.style.background = 'none';
          returnArrow.style.display = 'block';
          returnArrow.style.position = 'absolute';
          
          // Position the arrow icon
          const arrowIcon = returnArrow.querySelector('.return-arrow-icon');
          if (arrowIcon) {
            arrowIcon.style.right = '5px';
            arrowIcon.style.top = `${loopSize/2 - 10}px`;
            arrowIcon.style.transform = 'rotate(90deg)';
          }
        } else {
          // For multiple nodes, create a clean direct arrow from last to first node
          returnArrow.style.display = 'block';
          returnArrow.style.border = 'none';
          returnArrow.style.background = 'none';
          
          // Create a straight return arrow that goes above all nodes
          const lastNode = positions[nodes.length - 1];
          const firstNode = positions[0];
          
          // Create an arrow that goes above all nodes
          const topOffset = 50; // Distance above nodes
          
          // Vertical line up from the last node
          const upLine = document.createElement('div');
          upLine.style.position = 'absolute';
          upLine.style.width = '3px';
          upLine.style.height = `${topOffset}px`;
          upLine.style.backgroundColor = 'var(--primary-light)';
          upLine.style.left = `${lastNode.x}px`;
          upLine.style.top = `${centerY - topOffset}px`;
          upLine.style.boxShadow = '0 0 8px rgba(99, 102, 241, 0.4)';
          returnArrow.appendChild(upLine);
          
          // Horizontal line connecting the top of the up line to above the first node
          const topLine = document.createElement('div');
          topLine.style.position = 'absolute';
          topLine.style.width = `${lastNode.x - firstNode.x}px`;
          topLine.style.height = '3px';
          topLine.style.backgroundColor = 'var(--primary-light)';
          topLine.style.left = `${firstNode.x}px`;
          topLine.style.top = `${centerY - topOffset}px`;
          topLine.style.boxShadow = '0 0 8px rgba(99, 102, 241, 0.4)';
          returnArrow.appendChild(topLine);
          
          // Vertical line down to the first node
          const downLine = document.createElement('div');
          downLine.style.position = 'absolute';
          downLine.style.width = '3px';
          downLine.style.height = `${topOffset}px`;
          downLine.style.backgroundColor = 'var(--primary-light)';
          downLine.style.left = `${firstNode.x}px`;
          downLine.style.top = `${centerY - topOffset}px`;
          downLine.style.boxShadow = '0 0 8px rgba(99, 102, 241, 0.4)';
          returnArrow.appendChild(downLine);
          
          // Add arrow head pointing to the first node
          const arrowHead = document.createElement('div');
          arrowHead.style.position = 'absolute';
          arrowHead.style.top = `${centerY - 9}px`;
          arrowHead.style.left = `${firstNode.x - 7}px`;
          
          const arrowIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          arrowIcon.setAttribute('width', '18');
          arrowIcon.setAttribute('height', '18');
          arrowIcon.setAttribute('viewBox', '0 0 24 24');
          arrowIcon.setAttribute('fill', 'none');
          arrowIcon.setAttribute('stroke', 'var(--primary-light)');
          arrowIcon.setAttribute('stroke-width', '2');
          arrowIcon.setAttribute('stroke-linecap', 'round');
          arrowIcon.setAttribute('stroke-linejoin', 'round');
          arrowIcon.innerHTML = '<polyline points="9 18 15 12 9 6"></polyline>';
          arrowIcon.style.transform = 'rotate(-90deg)';
          arrowIcon.style.backgroundColor = 'white';
          arrowIcon.style.borderRadius = '50%';
          arrowIcon.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
          
          // Adjust for dark theme
          if (document.documentElement.classList.contains('dark-theme')) {
            arrowIcon.style.backgroundColor = '#1a202c';
          }
          
          arrowHead.appendChild(arrowIcon);
          returnArrow.appendChild(arrowHead);
        }
      }
    }
  }, [nodes]);

  if (nodes.length === 0) {
    return (
      <div className="circular-empty-list">
        Add a node to visualize the circular linked list
      </div>
    );
  }

  return (
    <div className="circular-list-container" ref={containerRef}>
      <div className="circular-node-container">
        {/* Nodes */}
        {nodes.map((node, index) => (
          <div key={index} className="circular-node-wrapper">
            <Node
              value={node.value}
              index={index}
              highlighted={node.highlighted}
              appearing={node.appearing}
              fading={node.fading}
              isHead={index === 0}
              isTail={index === nodes.length - 1} // Mark the last node
            />
          </div>
        ))}
        
        {/* Node connectors */}
        {nodes.map((_, index) => (
          <div key={`connector-${index}`} className="circular-connector">
            <ArrowRight className="connector-arrow" size={18} color="var(--primary-light)" />
          </div>
        ))}
        
        {/* Return arrow - special handling in useEffect */}
        <div className="return-arrow">
          <ArrowRight className="return-arrow-icon" size={18} color="var(--primary-light)" />
        </div>
      </div>
    </div>
  );
};

export default Visualization; 