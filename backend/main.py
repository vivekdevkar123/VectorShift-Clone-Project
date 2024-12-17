from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/api/submit')
async def submit(request: Request):
    data = await request.json()

    # Extract nodes and edges from the data
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])

    try:
        # Create a directed graph
        G = nx.DiGraph()

        # Add nodes
        for node in nodes:
            G.add_node(node['id'])

        # Add edges
        for edge in edges:
            G.add_edge(edge['source'], edge['target'])

        # Calculate the number of nodes and edges
        num_nodes = G.number_of_nodes()
        num_edges = G.number_of_edges()

        # Check if the graph is a DAG
        is_dag = nx.is_directed_acyclic_graph(G)

        # Return response with the computed data
        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
