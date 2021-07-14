export const manifest = new Set<string>();

const urlPrefix = "./audio";

export const getArrayBuffer = (name: string) => {
	const url = `${urlPrefix}/${name}.wav`;

	return new Promise<ArrayBuffer>((resolve, reject) => {
		fetch(url)
			.then((res) => {
				if (res.ok && res.headers.get("Content-Type") === "audio/wav") {
					return res.arrayBuffer();
				} else {
					throw "invalid sound";
				}
			})
			.then((buffer) => {
				resolve(buffer);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const loadManifest = async () => {
	const url = `${urlPrefix}/manifest.json`;

	const data = await fetch(url);
	if (!data.ok) {
		throw "invalid manifest";
	}

	const dataDecode: string[] = await data.json();

	dataDecode.forEach((value) => {
		manifest.add(value);
	});
};
