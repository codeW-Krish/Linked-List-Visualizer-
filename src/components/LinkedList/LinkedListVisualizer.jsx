import React, { useState, useEffect, useCallback } from 'react';
import { Info, Settings, List, Database } from 'lucide-react';
import Controls from './Controls';
import Visualization from './Visualization';
import StepsList from './StepsList';
import InfoSidebar from './InfoSidebar';
import SettingsSidebar from './SettingsSidebar';
import '../../../src/styles/LinkedListVisualizer.css';

const LinkedListVisualizer = () => {
  // State for the linked list
  const [nodes, setNodes] = useState([]);
  const [nextId, setNextId] = useState(1);

  // State for user inputs
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(0);

  // State for animations
  const [animationStep, setAnimationStep] = useState(0);
  const [animationType, setAnimationType] = useState('');
  const [animationPosition, setAnimationPosition] = useState('');
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationValue, setAnimationValue] = useState('');
  const [animationActive, setAnimationActive] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  // State for UI
  const [message, setMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [steps, setSteps] = useState([]);

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
  };

  // Insert at head animation
  const insertAtHead = () => {
    if (!value) {
      setMessage('Please enter a value');
      return;
    }
    
    setMessage('');
    clearSteps();
    setAnimationType('insert');
    setAnimationPosition('head');
    setAnimationValue(value);
    setAnimationActive(true);
    setAnimationStep(0);
  };

  // Insert at end animation
  const insertAtEnd = () => {
    if (!value) {
      setMessage('Please enter a value');
      return;
    }
    
    setMessage('');
    clearSteps();
    setAnimationType('insert');
    setAnimationPosition('end');
    setAnimationValue(value);
    setAnimationActive(true);
    setAnimationStep(0);
  };

  // Insert at index animation
  const insertAtIndex = () => {
    if (!value) {
      setMessage('Please enter a value');
      return;
    }
    
    if (index < 0 || index > nodes.length) {
      setMessage(`Index must be between 0 and ${nodes.length}`);
      return;
    }
    
    setMessage('');
    clearSteps();
    setAnimationType('insert');
    setAnimationPosition('index');
    setAnimationIndex(index);
    setAnimationValue(value);
    setAnimationActive(true);
    setAnimationStep(0);
  };

  // Delete at head animation
  const deleteAtHead = () => {
    if (nodes.length === 0) {
      setMessage('List is empty');
      return;
    }
    
    setMessage('');
    clearSteps();
    setAnimationType('delete');
    setAnimationPosition('head');
    setAnimationActive(true);
    setAnimationStep(0);
  };

  // Delete at end animation
  const deleteAtEnd = () => {
    if (nodes.length === 0) {
      setMessage('List is empty');
      return;
    }
    
    setMessage('');
    clearSteps();
    setAnimationType('delete');
    setAnimationPosition('end');
    setAnimationActive(true);
    setAnimationStep(0);
  };

  // Delete at index animation
  const deleteAtIndex = () => {
    if (nodes.length === 0) {
      setMessage('List is empty');
      return;
    }
    
    if (index < 0 || index >= nodes.length) {
      setMessage(`Index must be between 0 and ${nodes.length - 1}`);
      return;
    }
    
    setMessage('');
    clearSteps();
    setAnimationType('delete');
    setAnimationPosition('index');
    setAnimationIndex(index);
    setAnimationActive(true);
    setAnimationStep(0);
  };

  // Process animation steps
  useEffect(() => {
    if (!animationActive) return;

    const timer = setTimeout(() => {
      if (animationType === 'insert') {
        switch (animationStep) {
          case 0: {
            // Creating new node
            const stepText = `Step 1: Creating new node with value: ${animationValue}`;
            addStep(stepText);
            setMessage(stepText);
            setAnimationStep(1);
            break;
          }
          case 1: {
            // Positioning the new node
            let stepText = '';
            if (animationPosition === 'head') {
              stepText = `Step 2: Updating new node's next pointer to the current head`;
            } else if (animationPosition === 'end') {
              if (nodes.length === 0) {
                stepText = `Step 2: List is empty, new node becomes the head`;
                setAnimationStep(3);
              } else {
                stepText = `Step 2: Traversing to the end of the list`;
              }
            } else if (animationPosition === 'index') {
              stepText = `Step 2: Traversing to index ${animationIndex}`;
            }
            
            addStep(stepText);
            setMessage(stepText);
            
            if (animationPosition !== 'end' || nodes.length !== 0) {
              setAnimationStep(2);
            }
            break;
          }
          case 2: {
            // Updating pointers
            let stepText = '';
            if (animationPosition === 'head') {
              stepText = `Step 3: Setting new node as the head`;
            } else if (animationPosition === 'end') {
              stepText = `Step 3: Setting last node's next pointer to the new node`;
            } else if (animationPosition === 'index') {
              stepText = `Step 3: Updating pointers at index ${animationIndex}`;
            }
            
            addStep(stepText);
            setMessage(stepText);
            setAnimationStep(3);
            break;
          }
          case 3: {
            // Completing the insertion
            const newNode = createNode(animationValue);
            newNode.appearing = true;
            
            if (animationPosition === 'head') {
              setNodes(prevNodes => [newNode, ...prevNodes]);
            } else if (animationPosition === 'end') {
              setNodes(prevNodes => [...prevNodes, newNode]);
            } else if (animationPosition === 'index') {
              setNodes(prevNodes => [
                ...prevNodes.slice(0, animationIndex),
                newNode,
                ...prevNodes.slice(animationIndex)
              ]);
            }
            
            const stepText = `Step 4: Node with value ${animationValue} inserted successfully`;
            addStep(stepText);
            setMessage(stepText);
            setAnimationStep(4);
            break;
          }
          case 4: {
            // Reset animation flags
            setNodes(prevNodes => 
              prevNodes.map(node => ({ ...node, highlighted: false, appearing: false }))
            );
            setValue('');
            setAnimationActive(false);
            setTimeout(() => setMessage(''), 2000);
            break;
          }
          default:
            break;
        }
      } else if (animationType === 'delete') {
        switch (animationStep) {
          case 0: {
            // Highlighting the node to be deleted
            setNodes(prevNodes => {
              const newNodes = [...prevNodes];
              let nodeIndex = 0;
              
              if (animationPosition === 'head') {
                nodeIndex = 0;
              } else if (animationPosition === 'end') {
                nodeIndex = newNodes.length - 1;
              } else if (animationPosition === 'index') {
                nodeIndex = animationIndex;
              }
              
              if (newNodes[nodeIndex]) {
                newNodes[nodeIndex] = { ...newNodes[nodeIndex], highlighted: true };
              }
              
              return newNodes;
            });
            
            let stepText = '';
            if (animationPosition === 'head') {
              stepText = `Step 1: Identifying the head node to delete`;
            } else if (animationPosition === 'end') {
              stepText = `Step 1: Traversing to find the last node`;
            } else if (animationPosition === 'index') {
              stepText = `Step 1: Traversing to node at index ${animationIndex}`;
            }
            
            addStep(stepText);
            setMessage(stepText);
            setAnimationStep(1);
            break;
          }
          case 1: {
            // Updating pointers
            let stepText = '';
            if (animationPosition === 'head') {
              stepText = `Step 2: Updating head pointer to the second node`;
            } else if (animationPosition === 'end') {
              stepText = `Step 2: Updating the second-to-last node's next pointer to null`;
            } else if (animationPosition === 'index') {
              stepText = `Step 2: Updating pointers around index ${animationIndex}`;
            }
            
            addStep(stepText);
            setMessage(stepText);
            setAnimationStep(2);
            break;
          }
          case 2: {
            // Fading out the node
            setNodes(prevNodes => {
              const newNodes = [...prevNodes];
              let nodeIndex = 0;
              
              if (animationPosition === 'head') {
                nodeIndex = 0;
              } else if (animationPosition === 'end') {
                nodeIndex = newNodes.length - 1;
              } else if (animationPosition === 'index') {
                nodeIndex = animationIndex;
              }
              
              if (newNodes[nodeIndex]) {
                newNodes[nodeIndex] = { ...newNodes[nodeIndex], fading: true };
              }
              
              return newNodes;
            });
            
            const stepText = `Step 3: Removing node from memory`;
            addStep(stepText);
            setMessage(stepText);
            setAnimationStep(3);
            break;
          }
          case 3: {
            // Removing the node
            setNodes(prevNodes => {
              if (animationPosition === 'head') {
                return prevNodes.slice(1);
              } else if (animationPosition === 'end') {
                return prevNodes.slice(0, -1);
              } else if (animationPosition === 'index') {
                return [
                  ...prevNodes.slice(0, animationIndex),
                  ...prevNodes.slice(animationIndex + 1)
                ];
              }
              return prevNodes;
            });
            
            const stepText = `Step 4: Node deleted successfully`;
            addStep(stepText);
            setMessage(stepText);
            setAnimationStep(4);
            break;
          }
          case 4: {
            // Reset animation flags
            setAnimationActive(false);
            setTimeout(() => setMessage(''), 2000);
            break;
          }
          default:
            break;
        }
      }
    }, animationSpeed);

    return () => clearTimeout(timer);
  }, [animationActive, animationStep, animationType, animationPosition, animationIndex, animationValue, nodes, animationSpeed, createNode]);

  return (
    <div className="main-container">
      {/* Top Navigation Bar */}
      <div className="main-header">
        <div className="header-content">
          <div className="app-title">
            <List size={24} />
            Singly Linked List Visualizer
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
            animationActive={animationActive}
            nodesLength={nodes.length}
          />

          {/* Visualization component */}
          <div className="visualization-card">
            <div className="card-header">
              <div className="card-title">
                <Database size={18} className="inline mr-2" />
                Linked List Visualization
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
        />

        {/* Settings Sidebar component */}
        <SettingsSidebar
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          clearNodes={clearNodes}
          clearSteps={clearSteps}
          animationActive={animationActive}
        />
      </div>
    </div>
  );
};

export default LinkedListVisualizer; 