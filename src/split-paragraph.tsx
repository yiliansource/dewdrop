import React, { useCallback, useEffect, useRef, useState } from "react";

type LineFactory = (line: string, index: number, totalLines: number) => React.ReactNode;
const defaultLineFactory: LineFactory = (line, index) => (
    <p key={index} className="m-0">
        {line}
    </p>
);

const SplitParagraph = ({
    children,
    lineFactory = defaultLineFactory,
    ...props
}: { children: string; lineFactory?: LineFactory } & React.HTMLProps<HTMLParagraphElement>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lines, setLines] = useState<string[]>([]);

    const recalculateLines = useCallback(() => {
        const container = containerRef.current!;

        // Create a hidden span for measuring text widths
        const measureSpan = document.createElement("span");
        measureSpan.style.visibility = "hidden";
        measureSpan.style.position = "absolute";
        measureSpan.style.whiteSpace = "nowrap";
        measureSpan.style.font = window.getComputedStyle(container).font;
        measureSpan.style.letterSpacing = window.getComputedStyle(container).letterSpacing;
        document.body.appendChild(measureSpan);

        const words = children.split(" ");
        let currentLine = "";
        const allLines = [];

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            measureSpan.textContent = testLine;

            if (measureSpan.offsetWidth > container.offsetWidth) {
                // Line exceeds container width, save the current line
                allLines.push(currentLine);
                currentLine = word; // Start a new line
            } else {
                currentLine = testLine;
            }
        }

        // Push the last line
        if (currentLine) {
            allLines.push(currentLine);
        }

        setLines(allLines);

        // Cleanup
        document.body.removeChild(measureSpan);
    }, [children]);

    useEffect(() => {
        if (containerRef.current) {
            recalculateLines();

            const resizeObserver = new ResizeObserver(() => {
                recalculateLines();
            });
            resizeObserver.observe(containerRef.current);
            return () => resizeObserver.disconnect(); // clean up
        }
    }, [children, recalculateLines]);

    return (
        <div ref={containerRef} style={{ width: "100%", wordWrap: "break-word" }} {...props}>
            {lines.map((line, index) => lineFactory(line, index, lines.length))}
        </div>
    );
};

export default SplitParagraph;
