import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Sun, Moon, Info, Settings, List, Database } from 'lucide-react';
import Controls from './Controls';
import Visualization from './Visualization';
import InfoSidebar from './InfoSidebar';
import SettingsSidebar from './SettingsSidebar';
import StepsList from './StepsList';
import '../../styles/CircularLinkedListVisualizer.css';

const CircularLinkedListVisualizer = () => {
  // State for the linked list
  const [nodes, setNodes] = useState([]);
  const [nextId, setNextId] = useState(1);

  // State for user inputs
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(0);

  // State for animations
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  // State for UI
  const [message, setMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [steps, setSteps] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if the user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('darkMode');
    // Return true if darkMode is explicitly set to 'true', otherwise default to system preference or false
    return savedTheme === 'true' ? true : 
           (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply dark mode class to root element when theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    // Save theme preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Helper function to create a new node
  const createNode = useCallback((value) => {
    const newNode = {
      id: nextId,
      value: value,
      highlighted: false,
      fading: false,
      appearing: false,
    };
    setNextId(prevId => prevId + 1);
    return newNode;
  }, [nextId]);

  // Add a step to the steps list
  const addStep = (stepText) => {
    setSteps(prevSteps => [...prevSteps, stepText]);
  };

  // Clear steps
  const clearSteps = () => {
    setSteps([]);
  };

  // Clear nodes
  const clearNodes = () => {
    setNodes([]);
    clearSteps();
  };

  // Insert at head animation
  const insertAtHead = async () => {
    if (!value) {
      setMessage('Please enter a value');
      return;
    }
    
    setIsAnimating(true);
    setMessage('');
    clearSteps();
    
    addStep(`Creating new node with value: ${value}`);
    addStep(`Updating new node's next pointer to the current head`);
    addStep(`Setting new node as the head`);
    
    const newNode = createNode(value);
    newNode.appearing = true;
    
    setNodes(prevNodes => [newNode, ...prevNodes]);
    addStep(`Node with value ${value} inserted successfully at head`);
    
    setValue('');
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    setNodes(prevNodes => 
      prevNodes.map(node => ({ ...node, highlighted: false, appearing: false }))
    );
    setIsAnimating(false);
  };

  // Insert at end animation
  const insertAtEnd = async () => {
    if (!value) {
      setMessage('Please enter a value');
      return;
    }
    
    setIsAnimating(true);
    setMessage('');
    clearSteps();
    
    addStep(`Creating new node with value: ${value}`);
    if (nodes.length === 0) {
      addStep(`List is empty, new node becomes the head`);
    } else {
      addStep(`Traversing to the end of the list`);
      addStep(`Setting last node's next pointer to the new node`);
    }
    
    const newNode = createNode(value);
    newNode.appearing = true;
    
    setNodes(prevNodes => [...prevNodes, newNode]);
    addStep(`Node with value ${value} inserted successfully at end`);
    
    setValue('');
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    setNodes(prevNodes => 
      prevNodes.map(node => ({ ...node, highlighted: false, appearing: false }))
    );
    setIsAnimating(false);
  };

  // Helper function to animate traversal in circular list
  const animateTraversal = async (targetIndex) => {
    // Create a copy of the nodes
    const nodesCopy = [...nodes];
    
    // Highlight each node in sequence up to the target index
    for (let i = 0; i <= targetIndex; i++) {
      setNodes(prevNodes => 
        prevNodes.map((node, idx) => ({
          ...node,
          highlighted: idx === i
        }))
      );
      
      // Pause for a fraction of the animation speed
      await new Promise(resolve => setTimeout(resolve, animationSpeed / 3));
    }
    
    // Return to the original nodes state
    return nodesCopy;
  };

  // Insert at index animation with traversal visualization
  const insertAtIndex = async () => {
    if (!value) {
      setMessage('Please enter a value');
      return;
    }
    
    if (index < 0 || index > nodes.length) {
      setMessage(`Index must be between 0 and ${nodes.length}`);
      return;
    }
    
    setIsAnimating(true);
    setMessage('');
    clearSteps();
    
    addStep(`Creating new node with value: ${value}`);
    
    if (index > 0) {
      addStep(`Traversing to node at index ${index - 1}`);
      
      // Visualize traversal
      await animateTraversal(index - 1);
      
      addStep(`Updating pointers at index ${index}`);
    } else {
      // Special case for inserting at head
      addStep(`Inserting at the beginning of the circular list`);
      if (nodes.length > 0) {
        addStep(`Updating the last node's next pointer to the new head`);
      }
    }
    
    const newNode = createNode(value);
    newNode.appearing = true;
    
    setNodes(prevNodes => [
      ...prevNodes.slice(0, index),
      newNode,
      ...prevNodes.slice(index)
    ]);
    addStep(`Node with value ${value} inserted successfully at index ${index}`);
    
    setValue('');
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    setNodes(prevNodes => 
      prevNodes.map(node => ({ ...node, highlighted: false, appearing: false }))
    );
    setIsAnimating(false);
  };

  // Delete at head animation
  const deleteAtHead = async () => {
    if (nodes.length === 0) {
      setMessage('List is empty');
      return;
    }
    
    setIsAnimating(true);
    setMessage('');
    clearSteps();
    
    addStep(`Identifying the head node to delete`);
    addStep(`Updating head pointer to the second node`);
    
    setNodes(prevNodes => {
      const newNodes = [...prevNodes];
      if (newNodes[0]) {
        newNodes[0] = { ...newNodes[0], highlighted: true, fading: true };
      }
      return newNodes;
    });
    addStep(`Removing node from memory`);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    
    setNodes(prevNodes => prevNodes.slice(1));
    addStep(`Node deleted successfully from head`);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    setIsAnimating(false);
  };

  // Delete at end animation
  const deleteAtEnd = async () => {
    if (nodes.length === 0) {
      setMessage('List is empty');
      return;
    }
    
    setIsAnimating(true);
    setMessage('');
    clearSteps();
    
    if (nodes.length === 1) {
      addStep(`Removing the only node in the circular list`);
    } else {
      addStep(`Traversing to find the last node`);
      addStep(`Updating the last node's next pointer to the head`);
    }
    
    setNodes(prevNodes => {
      const newNodes = [...prevNodes];
      const lastIndex = newNodes.length - 1;
      if (newNodes[lastIndex]) {
        newNodes[lastIndex] = { ...newNodes[lastIndex], highlighted: true, fading: true };
      }
      return newNodes;
    });
    addStep(`Removing node from memory`);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    
    setNodes(prevNodes => prevNodes.slice(0, -1));
    addStep(`Node deleted successfully from end`);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    setIsAnimating(false);
  };

  // Delete at index animation with traversal visualization
  const deleteAtIndex = async () => {
    if (nodes.length === 0) {
      setMessage('List is empty');
      return;
    }
    
    if (index < 0 || index >= nodes.length) {
      setMessage(`Index must be between 0 and ${nodes.length - 1}`);
      return;
    }
    
    setIsAnimating(true);
    setMessage('');
    clearSteps();
    
    if (index === 0) {
      // Special case for deleting head
      addStep(`Removing the head node of the circular list`);
      if (nodes.length > 1) {
        addStep(`Updating the last node's next pointer to the new head`);
      }
    } else {
      addStep(`Traversing to node at index ${index - 1}`);
      
      // Visualize traversal
      await animateTraversal(index - 1);
      
      addStep(`Updating node at index ${index - 1} to point to node at index ${(index + 1) % nodes.length}`);
    }
    
    setNodes(prevNodes => {
      const newNodes = [...prevNodes];
      if (newNodes[index]) {
        newNodes[index] = { ...newNodes[index], highlighted: true, fading: true };
      }
      return newNodes;
    });
    addStep(`Removing node from memory`);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    
    setNodes(prevNodes => [
      ...prevNodes.slice(0, index),
      ...prevNodes.slice(index + 1)
    ]);
    addStep(`Node deleted successfully from index ${index}`);
    
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    setIsAnimating(false);
  };

  return (
    <div className="main-container">
      {/* Top Navigation Bar */}
      <div className="main-header">
        <div className="header-content">
          <div className="app-title">
            <RefreshCw className="circular-icon" size={24} />
            Circular Linked List Visualizer
          </div>
          <div className="header-actions">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="header-button"
            >
              <Info size={18} />
              <span>Information</span>
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="header-button"
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="theme-toggle"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="content-area">
        {/* Main Content */}
        <div className="main-content">
          {/* Message display */}
          {message && (
            <div className="message-alert">
              {message}
            </div>
          )}
          
          {/* Controls component */}
          <Controls
            value={value}
            setValue={setValue}
            index={index}
            setIndex={setIndex}
            insertAtHead={insertAtHead}
            insertAtEnd={insertAtEnd}
            insertAtIndex={insertAtIndex}
            deleteAtHead={deleteAtHead}
            deleteAtEnd={deleteAtEnd}
            deleteAtIndex={deleteAtIndex}
            animationActive={isAnimating}
            nodesLength={nodes.length}
            onInsertHead={insertAtHead}
            onInsertEnd={insertAtEnd}
            onInsertIndex={insertAtIndex}
            onDeleteHead={deleteAtHead}
            onDeleteEnd={deleteAtEnd}
            onDeleteIndex={deleteAtIndex}
            onClear={clearNodes}
            isAnimating={isAnimating}
            inputValue={value}
            setInputValue={setValue}
            inputIndex={index}
            setInputIndex={setIndex}
          />

          {/* Visualization component */}
          <div className="visualization-card">
            <div className="card-header">
              <div className="card-title">
                <Database size={18} className="inline mr-2" />
                Circular Linked List Visualization
              </div>
            </div>
            <Visualization nodes={nodes} />
          </div>

          {/* Steps List component */}
          <div className="visualization-card">
            <div className="card-header">
              <div className="card-title">
                <List size={18} className="inline mr-2" />
                Operation Steps
              </div>
            </div>
            <StepsList steps={steps} />
          </div>
        </div>

        {/* Info Sidebar component */}
        <InfoSidebar 
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          onClose={() => setShowInfo(false)}
        />

        {/* Settings Sidebar component */}
        <SettingsSidebar
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          clearNodes={clearNodes}
          clearSteps={clearSteps}
          animationActive={isAnimating}
          onClose={() => setShowSettings(false)}
          showSteps={true}
          setShowSteps={() => {}}
        />
      </div>
    </div>
  );
};

export default CircularLinkedListVisualizer; 