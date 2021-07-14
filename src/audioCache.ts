export const cache = new Map<string, ArrayBuffer>();

const urlPrefix = "./audio";

export const getSoundArrayBuffer = (name: string) => {
	const url = `${urlPrefix}/${name}`;

	return new Promise<ArrayBuffer>((resolve, reject) => {
		const cacheHit = cache.get(name);
		if (cacheHit) {
			resolve(cacheHit);
		}

		fetch(url)
			.then((res) => {
				if (res.ok && res.headers.get("Content-Type") === "audio/wav") {
					return res.arrayBuffer();
				} else {
					throw "invalid sound";
				}
			})
			.then((buffer) => {
				cache.set(name, buffer);
				resolve(buffer);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

/*
cache.set(name, res.arrayBuffer());
					resolve(res.arrayBuffer());
*/

/*
const getAudioBuffer = (context: OfflineAudioContext, name: string) => {

			.then((buffer) => {
				return context.decodeAudioData(buffer);
			})
			.then((audioBuffer) => {
				resolve(audioBuffer);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
*/
