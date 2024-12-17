import React from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async () => {
        const pipelineData = { nodes, edges };

        try {
            // Send the pipeline data to the backend
            const response = await fetch('http://localhost:8000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            const result = await response.json();
            if (response.ok) {
                // Display an alert with the number of nodes, edges, and DAG status
                alert(`Pipeline submitted successfully!\nNumber of Nodes: ${result.num_nodes}\nNumber of Edges: ${result.num_edges}\nIs DAG: ${result.is_dag ? "Yes" : "No"}`);
                console.log(result);
            } else {
                alert('Error submitting pipeline');
                console.error(result);
            }
        } catch (error) {
            alert('Error submitting pipeline');
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};
