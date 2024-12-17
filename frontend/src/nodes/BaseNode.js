import { useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import styled from 'styled-components';

const NodeWrapper = styled.div`
  width: 100%;
  min-width: 250px;
  max-width: 300px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 30px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 220px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 6px;
  transition: border 0.3s ease;
  box-sizing: border-box;
  resize: none;
  overflow-y: hidden;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }

  word-wrap: break-word;
  white-space: pre-wrap;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 6px;
  transition: border 0.3s ease;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const HandleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .custom-handle {
    width: 16px;
    height: 16px;
    background-color: transparent;
    border: 2px solid #4CAF50;
    border-radius: 50%;
    cursor: pointer;
    margin: -5px;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background-color: #4CAF50;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const BaseNode = ({ id, title, inputFields = [], handles = [], defaultData = [] }) => {
  const [state, setState] = useState(defaultData);
  const [variableHandles, setVariableHandles] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();  // Hook to update node internals

  // Function to extract variables wrapped in {{ }}
  const extractVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      variables.push(match[1].trim());
    }
    return variables;
  };

  // Function to create handles dynamically based on variables detected in inputs
  const createHandlesForVariables = (variables) => {
    const newHandles = variables.map((variable, index) => ({
      id: `${id}-${variable}`, // Unique and deterministic ID
      type: 'target',
      position: Position.Left,
      style: { top: `${index * 30 + 20}px` },
    }));
    setVariableHandles(newHandles);
    updateNodeInternals(id);  // Ensure React Flow updates with the new handles
  };

  // Handle change in textarea input, triggers handle update on variable detection
  const handleInputChange = (key, value) => {
    setState(prev => {
      const newState = { ...prev, [key]: value };

      // Only create handles if variables are detected in the input field
      if (key && typeof value === 'string') {
        const variables = extractVariables(value);
        createHandlesForVariables(variables);
      }

      return newState;
    });
  };

  const handleTextAreaResize = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Handle the input fields and renders the corresponding components (textarea or select)
  return (
    <NodeWrapper>
      <Title>{title}</Title>
      <InputWrapper>
        {inputFields.map((field, index) => (
          <div key={index}>
            <Label>{field.label}:</Label>
            {field.type === 'text' ? (
              <Textarea
                value={state[field.key] || ''}
                onChange={(e) => {
                  handleInputChange(field.key, e.target.value);
                  handleTextAreaResize(e);
                }}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            ) : (
              <Select
                value={state[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            )}
          </div>
        ))}
      </InputWrapper>
      <HandleWrapper>
        {handles.map((handle, index) => (
          <Handle
            key={index}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            className="custom-handle"
          />
        ))}
        {variableHandles.map((handle, index) => {
          // Filter handles on the same side as the current handle
          const handlesOnSide = variableHandles.filter(h => h.position === handle.position).length;

          // Calculate `top` based on the index within the group and the number of handles on that side
          const handleIndexOnSide = variableHandles
            .filter(h => h.position === handle.position)
            .findIndex(h => h.id === handle.id);

          return (
            <Handle
              key={index + handles.length}
              type={handle.type}
              position={handle.position}
              id={handle.id}
              className="custom-handle"
              style={{
                ...handle.style,
                top: `${(100 / (handlesOnSide + 1)) * (handleIndexOnSide + 1)}%`,  // Dynamic top positioning
              }}
            />
          );
        })}
      </HandleWrapper>
    </NodeWrapper>
  );
};
