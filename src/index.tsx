import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { loadManifest } from "./audioCache";

const main = async () => {
	await loadManifest();

	ReactDom.render(<App />, document.getElementById("root"));
};

main().catch(console.error);

/*
//import { downloadBlob } from "./download";
//import audioBufferToWav from "audiobuffer-to-wav";

const sampleRate = 44100;

const context = new OfflineAudioContext(1, 5 * sampleRate, sampleRate);

//const sources = ["./audio/alpha.wav", "./audio/area.wav"];

const main = async () => {
	const source1 = context.createBufferSource();
	source1.buffer = await getAudioBuffer("./audio/alpha.wav");
	source1.connect(context.destination);
	source1.start(context.currentTime);

	const source2 = context.createBufferSource();
	source2.buffer = await getAudioBuffer("./audio/area.wav");
	source2.connect(context.destination);
	source2.start(context.currentTime + 2);

	context.oncomplete = (ev) => {
		const online = new AudioContext();
		const source = online.createBufferSource();
		source.buffer = ev.renderedBuffer;
		source.connect(online.destination);
		source.start();

		const wavBuffer = audioBufferToWav(ev.renderedBuffer);
		const blob = new Blob([wavBuffer], { type: "audio/wav" });
		downloadBlob(blob, "generated.wav");
	};

	context.startRendering();
};

main();
*/
