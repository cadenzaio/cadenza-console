import {
    Fragment,
    type HTMLAttributes,
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import type { SpecialLanguage, StringLiteralUnion } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";
import "@/components/application/code-snippet/code-snippet.style.css";
import { cx } from "@/utils/cx";

type SupportedLanguages = "tsx" | "js" | "jsx" | "ts" | "typescript" | "javascript" | "json" | "html";
type Languages = StringLiteralUnion<SupportedLanguages | SpecialLanguage>;

export const highlight = async (code: string, lang: Languages) => {
    const out = await codeToHast(code, {
        lang: lang,
        defaultColor: "light",
        themes: {
            light: "github-light",
            dark: "github-dark",
        },
        colorReplacements: {
            "github-light": {
                "#24292e": "var(--color-utility-gray-700)",
                "#005cc5": "var(--color-utility-blue-600)",
                "#d73a49": "var(--color-utility-pink-600)",
                "#6f42c1": "var(--color-utility-brand-600)",
                "#032f62": "var(--color-primary)",
            },
            "github-dark": {
                "#e1e4e8": "var(--color-utility-gray-700)",
                "#79b8ff": "var(--color-utility-blue-600)",
                "#f97583": "var(--color-utility-pink-600)",
                "#b392f0": "var(--color-utility-brand-600)",
                "#9ecbff": "var(--color-primary)",
            },
        },
    });

    return toJsxRuntime(out, {
        Fragment,
        jsx,
        jsxs,
    });
};

interface CodeSnippetProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The code to be syntax highlighted. Can be provided in two ways:
     * 1. As a string via this prop for client-side highlighting
     * 2. As pre-highlighted nodes via children prop for server-side highlighting
     */
    code?: string;

    /**
     * The programming language of the code snippet.
     * Determines syntax highlighting rules.
     */
    language: Languages;

    /**
     * Whether to display line numbers alongside the code.
     * @default true
     */
    showLineNumbers?: boolean;

    /**
     * Pre-highlighted code nodes that were generated on the server.
     * Alternative to passing raw code string via the `code` prop.
     */
    children?: ReactNode;
}

export const CodeSnippet = ({ children, code, language, showLineNumbers = true, className, ...otherProps }: CodeSnippetProps) => {
    const [nodes, setNodes] = useState<ReactNode>(children); // Nodes rendered inside the snippet.
    const editableRef = useRef<HTMLDivElement>(null); // Reference to the contenteditable div
    const [editableContent, setEditableContent] = useState<string>(code || ""); // Current content (updated & highlighted)

    // Highlight code snippet dynamically (runs on edit or initialization)
    const processHighlighting = useCallback(
        async (updatedCode: string) => {
            const formattedNodes = await highlight(updatedCode, language);
            setNodes(formattedNodes); // Update nodes with the formatted JSX structure
        },
        [language]
    );

    // Debounce or throttle input handling for performance (delay re-highlighting during fast typing)
    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout> | null;
        return (...args: any[]) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleInput = useCallback(
        debounce(() => {
            if (!editableRef.current) return;
            const updatedCode = editableRef.current.innerText; // Grab the edited text
            setEditableContent(updatedCode); // Update state with new raw content
            void processHighlighting(updatedCode); // Re-highlight using Shiki
        }, 1000),
        [processHighlighting]
    );

    // Initialize the content and format it when the component mounts or the `code` prop updates
    useEffect(() => {
        if (!code) return;
        setEditableContent(code); // Store initial code
        void processHighlighting(code); // Highlight and set formatted content
    }, [code, processHighlighting]);

    // Prevent event bubbling when interacting with the `CodeSnippet`
    const focus = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
        editableRef.current?.focus(); // Focus the editable div
    }, []);

    return (
        <div
            {...otherProps}
            className={cx(
                "max-w-full overflow-hidden rounded-xl border border-secondary bg-primary [&>.shiki]:overflow-x-auto [&>code]:w-full",
                "font-mono text-sm leading-[22px] whitespace-pre",
                showLineNumbers ? "line-numbers" : "p-4",
                className
            )}
        >
            {/* Editable Content Area */}
            <div
                ref={editableRef}
                className="content-editable pointer-fine:cursor-text"
                contentEditable // Enable content editing
                role="textbox" // Accessibility for screen readers
                spellCheck="false" // Disable spell checking in code blocks
                suppressContentEditableWarning // Suppress React warnings for dynamic innerHTML
                onInput={handleInput} // Handle user edits
                onClick={focus} // Handle focus
                style={{
                    outline: "none",
                    whiteSpace: "pre-wrap", // Preserve white spaces
                    minHeight: "22px",
                }}
            >
                {/* Inject highlighted or raw content */}
                {nodes}
            </div>
        </div>
    );
};