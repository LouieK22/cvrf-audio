import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { loadManifest } from "./util/audioCache";

const main = async () => {
	await loadManifest();

	ReactDom.render(<App />, document.getElementById("root"));
};

main().catch(console.error);
