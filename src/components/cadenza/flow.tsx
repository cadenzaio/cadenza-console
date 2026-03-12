import { useCallback, useState } from 'react';
import {
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    SelectionMode,
    ReactFlowProvider,
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { TaskNode } from "@/components/cadenza/tasks/task-node.tsx";
import { resolveCollisions } from "@/utils/resolve-collisions.ts";


const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1', code: "" }, type: 'taskNode' },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2', code: "" }, type: 'taskNode' },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
const panOnDrag = [1, 2];

const nodeTypes = {
    taskNode: TaskNode,
};

function Flow({ onNodeClick }: { onNodeClick: () => void }) {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const handleNodeClick = (_event: React.MouseEvent, node: any) => {
        console.log("Node clicked:", node);
        // onNodeClick(); // Call the parent handler to open the slide-out menu
    };
    const onNodeDragStop = useCallback(() => {
        // @ts-ignore
        setNodes((nds) =>
            resolveCollisions(nds, {
                maxIterations: Infinity,
                overlapThreshold: 0.5,
                margin: 15,
            }),
        );
    }, [setNodes]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDragStop={onNodeDragStop}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
                onNodeClick={handleNodeClick}
                panOnScroll
                selectionOnDrag
                panOnDrag={panOnDrag}
                selectionMode={SelectionMode.Partial}
                fitView
                maxZoom={1.1}
                minZoom={0.2}
            >
                <Background gap={15} size={0.7} />
                <Controls position="bottom-right" />
            </ReactFlow>
        </div>
    );
}

function FlowWithProvider(props: any) {
    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}

export default FlowWithProvider;