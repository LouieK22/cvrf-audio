import React from "react";
import Editor from "react-simple-code-editor";
import { filter, highlight } from "../util/syntax";

import "../styles.css";
import { download, preview, render } from "../util/audioBuilder";

type State = {
	code: string;
};

let processing = false;

let globalCode = "login_emergency alpha 2";

export default class App extends React.Component<unknown, State> {
	state = {
		code: "login_emergency alpha 2",
	};

	render() {
		return (
			<main className="container">
				<div className="container__content">
					<h1>CVRF Audio Tool</h1>
					<p>Green text will play, Red text will not play</p>
					<div className="container_editor_area">
						<Editor
							placeholder="Type some code…"
							value={this.state.code}
							onValueChange={(code) => {
								this.setState({
									code,
								});

								globalCode = code;
							}}
							highlight={highlight}
							padding={10}
							className="container__editor"
						/>
					</div>
					<a
						className="button"
						href="#"
						onClick={async (evt) => {
							evt.preventDefault();

							if (processing) {
								return;
							}
							processing = true;

							const output = await render(filter(globalCode));
							await preview(output);

							processing = false;
						}}
					>
						Preview
					</a>
					<a
						className="button"
						href="#"
						onClick={async (evt) => {
							evt.preventDefault();

							if (processing) {
								return;
							}
							processing = true;

							const output = await render(filter(globalCode));
							await download(output);

							processing = false;
						}}
					>
						Download
					</a>
				</div>
			</main>
		);
	}
}
