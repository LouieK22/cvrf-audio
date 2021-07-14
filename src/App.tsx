import React from "react";
import Editor from "react-simple-code-editor";
import { highlight } from "./highlighter";

import "./styles.css";

type State = {
	code: string;
};

export default class App extends React.Component<unknown, State> {
	state = {
		code: "alpha 1",
	};

	render() {
		return (
			<main className="container">
				<div className="container__content">
					<h1>react-simple-code-editor</h1>
					<p>A simple no-frills code editor with syntax highlighting.</p>
					<a className="button" href="https://github.com/satya164/react-simple-code-editor">
						GitHub
					</a>
					<div className="container_editor_area">
						<Editor
							placeholder="Type some code…"
							value={this.state.code}
							onValueChange={(code) => {
								this.setState({
									code,
								});
							}}
							highlight={highlight}
							padding={10}
							className="container__editor"
						/>
					</div>
				</div>
			</main>
		);
	}
}
