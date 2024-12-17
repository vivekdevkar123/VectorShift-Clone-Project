// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='image' label='Image' />                 {/* New Node */}
                <DraggableNode type='apiCall' label='API Call' />             {/* New Node */}
                <DraggableNode type='dataTransform' label='Data Transform' /> {/* New Node */}
                <DraggableNode type='ml' label='ML' />                        {/* New Node */}
                <DraggableNode type='db' label='Database' />                  {/* New Node */}
            </div>
        </div>
    );
};
