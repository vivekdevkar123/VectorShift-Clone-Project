// Nodes.js
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

// Define all nodes in a single file for easier access and maintenance

// InputNode
export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Input"
    defaultData={{
      inputName: data?.inputName || id.replace('customInput-', 'input_'),
      inputType: data.inputType || 'Text'
    }}
    inputFields={[
      { label: 'Name', key: 'inputName', type: 'text' },
      { label: 'Type', key: 'inputType', type: 'select', options: ['Text', 'File'] }
    ]}
    handles={[{ type: 'source', position: Position.Right, id: 'value' }]}
  />
);

// LLMNode
export const LLMNode = ({ id }) => (
  <BaseNode
    id={id}
    title="LLM"
    handles={[
      { type: 'target', position: Position.Left, id: 'prompt' },
      { type: 'source', position: Position.Right, id: 'response' }
    ]}
  />
);

// OutputNode
export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Output"
    defaultData={{
      outputName: data?.outputName || id.replace('customOutput-', 'output_'),
      outputType: data.outputType || 'Text'
    }}
    inputFields={[
      { label: 'Name', key: 'outputName', type: 'text' },
      { label: 'Type', key: 'outputType', type: 'select', options: ['Text', 'Image'] }
    ]}
    handles={[{ type: 'target', position: Position.Left, id: 'value' }]}
  />
);

// TextNode
export const TextNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Text"
    defaultData={{ text: data?.text || 'input' }}
    inputFields={[{ label: 'Text', key: 'text', type: 'text' }]}
    handles={[
      { type: 'source', position: Position.Right, id: 'output' }
    ]}
  />
);

// ImageNode
export const ImageNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Image"
    defaultData={{ imageURL: data?.imageURL || 'image_url...' }}
    inputFields={[{ label: 'Image URL', key: 'imageURL', type: 'text' }]}
    handles={[
      { type: 'source', position: Position.Right, id: 'output' },
      { type: 'target', position: Position.Left, id: 'input' }
    ]}
  />
);

// ApiCallNode
export const ApiCallNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="API Call"
    defaultData={{
      apiEndpoint: data?.apiEndpoint || 'api_endpoint...',
      method: data?.method || 'GET'
    }}
    inputFields={[
      { label: 'API Endpoint', key: 'apiEndpoint', type: 'text' },
      { label: 'HTTP Method', key: 'method', type: 'text' }
    ]}
    handles={[
      { type: 'source', position: Position.Right, id: 'output' },
      { type: 'target', position: Position.Left, id: 'input' }
    ]}
  />
);

// DataTransformNode
export const DataTransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Data Transform"
    defaultData={{
      transformationType: data?.transformationType || 'filter',
      filterCriteria: data?.filterCriteria || 'criteria...'
    }}
    inputFields={[
      { label: 'Transformation Type', key: 'transformationType', type: 'text' },
      { label: 'Filter Criteria', key: 'filterCriteria', type: 'text' }
    ]}
    handles={[
      { type: 'source', position: Position.Right, id: 'output' },
      { type: 'target', position: Position.Left, id: 'input' }
    ]}
  />
);

// MLNode
export const MLNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Machine Learning"
    defaultData={{
      modelType: data?.modelType || 'linear_regression',
      trainingData: data?.trainingData || 'training_data...'
    }}
    inputFields={[
      { label: 'Model Type', key: 'modelType', type: 'text' },
      { label: 'Training Data', key: 'trainingData', type: 'text' }
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: 'prompt' },
      { type: 'source', position: Position.Right, id: 'output' }
    ]}
  />
);

// DBNode
export const DBNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Database"
    defaultData={{
      query: data?.query || 'SELECT * FROM users',
      dbConnection: data?.dbConnection || 'db_connection...'
    }}
    inputFields={[
      { label: 'Database Connection', key: 'dbConnection', type: 'text' },
      { label: 'Query', key: 'query', type: 'text' }
    ]}
    handles={[
      { type: 'source', position: Position.Right, id: 'output' },
      { type: 'target', position: Position.Left, id: 'input' }
    ]}
  />
);
