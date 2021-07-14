/* eslint-disable */

const assetFolder = "./assets/audio";
const fs = require("fs");

fs.readdir(assetFolder, (err, files) => {
	files = files.map((file) => {
		return file.slice(0, -4)
	})

	const json = JSON.stringify(files, null, 2)

	fs.writeFileSync(assetFolder + "/manifest.json", json)
});
