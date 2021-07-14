import React, { useState, useEffect } from "react";

interface EditorProps {
	language: string;
}

const CodeEditor = (props: EditorProps) => {
	const [content, setContent] = useState<string>("");

	const handleKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
		let value = content;
		const selStartPos = evt.currentTarget.selectionStart;

		console.log(evt.currentTarget);

		// handle 4-space indent on
		if (evt.key === "Tab") {
			value = value.substring(0, selStartPos) + "    " + value.substring(selStartPos, value.length);
			evt.currentTarget.selectionStart = selStartPos + 3;
			evt.currentTarget.selectionEnd = selStartPos + 4;
			evt.preventDefault();

			setContent(value);
		}
	};

	return (
		<div className="code-edit-container">
			<textarea
				className="code-input"
				value={content}
				onChange={(evt) => setContent(evt.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<pre className="code-output">
				<code className={`language-${props.language}`}>{content}</code>
			</pre>
		</div>
	);
};

export default CodeEditor;
