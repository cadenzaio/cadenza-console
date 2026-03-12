import { useCallback, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Handle, Position, useReactFlow, useStoreApi } from "@xyflow/react";
import { ButtonUtility } from "@/components/base/buttons/button-utility.tsx";
import { Edit01, Save01 } from "@untitledui/icons";

export function TaskNode(props: any) {
    const { setCenter } = useReactFlow();
    const store = useStoreApi();

    const focusNode = (id: any) => {
        const { nodeLookup } = store.getState();
        const node = Array.from(nodeLookup)
            .map(([, node]) => node)
            .find((node) => node.id === id);

        console.log("Focusing node", node);
        if (!node) return;

        const x = node.position.x + (node.measured.width ?? 200) / 2.0;
        const y = node.position.y + (node.measured.height ?? 200) / 2.0;
        const zoom = 1.1;


        setCenter(x, y, { zoom, duration: 500 });
    };


    const [code, setCode] = useState("function myFunction() {\n  console.log('Hello, world!');\n}");

    const [isExpanded, setIsExpanded] = useState(false); // Tracks if the code snippet is expanded

    // Toggle expand state when the user clicks
    const toggleExpand = useCallback(() => {
        if (isExpanded) {
            setCode(code);
        }
        setIsExpanded((prev) => !prev);
        setTimeout(() => focusNode(props.id), 200); // Focus the node when expanded
    }, []);

    // Prevent event bubbling when interacting with the `CodeSnippet`
    const stopPropagation = useCallback((e: React.MouseEvent | React.KeyboardEvent | React.UIEvent) => {
        e.stopPropagation(); // Prevent React Flow from capturing these events
    }, []);

    return (
        <div
            className="task-node bg-bg-secondary flex flex-col gap-2
            border border-gray-300 rounded-md p-3 text-sm min-w-[160px] shadow-xs"
        >
            <div className="absolute top-2 right-2">
                {
                    isExpanded
                        ? <ButtonUtility
                            size="sm"
                            color="tertiary"
                            tooltip="Save"
                            onClick={ toggleExpand }
                            icon={ Save01 }
                        />
                        : <ButtonUtility
                            size="xs"
                            color="tertiary"
                            tooltip="Edit"
                            onClick={ toggleExpand }
                            icon={ Edit01 }
                        />
                }
            </div>
            <Handle type="target" position={ Position.Top } />
            <Handle type="source" position={ Position.Bottom } />
            <div>
                <div className="flex gap-2 pb-2">
                    Tags:
                </div>
                <div>
                    <label htmlFor="text" className="text-sm">{ props.data.label }</label>
                </div>
                { isExpanded ? (
                    <div
                        // onClick={ stopPropagation }
                        // onMouseDown={ stopPropagation } // Prevent event handling for dragging
                        // onMouseDownCapture={ stopPropagation } // Prevent event handling for hovering
                        // onMouseMove={ stopPropagation } // Prevent event handling for dragging
                        // onMouseUp={ stopPropagation } // Prevent further event capturing
                        onKeyDown={ stopPropagation } // Prevent event handling for keyboard shortcuts
                    >
                        <Editor
                            className="border-2 border-white rounded-md p-2 shadow-sm mt-2"
                            value={ code }
                            language={ "typescript" }
                            height="40vh"
                            width="50vw"
                            options={ {
                                fontSize: 14,
                                minimap: {
                                    enabled: false,
                                },
                                scrollbar: {
                                    verticalScrollbarSize: 0,
                                    horizontalScrollbarSize: 0,
                                },
                                scrollBeyondLastLine: false,
                                lineNumbers: "off",
                                padding: {
                                    top: 7,
                                    bottom: 7,
                                },
                            } }
                        />
                    </div>
                ) : (
                    <div className="collapsed-content text-gray-500 text-xs text-wrap max-w-sm">

                    </div>
                ) }
            </div>
        </div>
    );
}