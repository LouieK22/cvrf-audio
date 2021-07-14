import audioBufferToWav from "audiobuffer-to-wav";
import config from "../config";
import { getArrayBuffer } from "./audioCache";
import { downloadBlob } from "./downloadBlob";

const testAudioContext = new AudioContext();

export const render = async (words: string[]) => {
	const arrayBufferRequests = new Array<Promise<ArrayBuffer>>();
	words.forEach((word) => {
		arrayBufferRequests.push(getArrayBuffer(word));
	});

	const durationBuffers = await Promise.all(arrayBufferRequests);

	let totalDuration = words.length * config.normalSplit;

	const durationChecks = new Array<Promise<void>>();
	durationBuffers.forEach((buffer) => {
		durationChecks.push(
			(async () => {
				const audioBuffer = await testAudioContext.decodeAudioData(buffer);
				totalDuration += audioBuffer.duration;
			})(),
		);
	});

	await Promise.all(durationChecks);

	const context = new OfflineAudioContext(1, totalDuration * config.sampleRate, config.sampleRate);

	const actualArrayBufferRequest = new Array<Promise<ArrayBuffer>>();
	words.forEach((word) => {
		actualArrayBufferRequest.push(getArrayBuffer(word));
	});

	const buffers = await Promise.all(actualArrayBufferRequest);

	let cursor = 0;
	for (const buffer of buffers) {
		const source = context.createBufferSource();
		source.buffer = await context.decodeAudioData(buffer);
		source.connect(context.destination);
		source.start(context.currentTime + cursor);

		cursor += source.buffer.duration + config.normalSplit;
	}

	return await context.startRendering();
};

export const preview = (buffer: AudioBuffer) => {
	const online = new AudioContext();
	const source = online.createBufferSource();
	source.buffer = buffer;
	source.connect(online.destination);
	source.start();
};

export const download = (buffer: AudioBuffer) => {
	const wavBuffer = audioBufferToWav(buffer);
	const blob = new Blob([wavBuffer], { type: "audio/wav" });

	downloadBlob(blob, "generated.wav");
};
