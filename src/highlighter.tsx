import React from "react";
import { manifest } from "./audioCache";

export const highlight = (code: string) => {
	const invalidPositions = [...code.matchAll(/\W/g)];
	let sanitizedStringArray = new Array<string>();

	let previousIndex = 0;
	for (let index = 0; index <= invalidPositions.length; index++) {
		if (index === invalidPositions.length) {
			if (invalidPositions.length === 0) {
				sanitizedStringArray.push(code);
			} else {
				sanitizedStringArray.push(code.substring(previousIndex + 1));
			}

			break;
		}

		const point = invalidPositions[index];

		let nextIndex = invalidPositions[index + 1]?.index;
		if (!nextIndex) {
			nextIndex = code.length;
		}

		if (point.index === undefined) {
			console.warn("uh oh");
			continue;
		}

		if (index > 0) {
			previousIndex++;
		}

		sanitizedStringArray.push(code.substring(previousIndex, point.index));
		sanitizedStringArray.push(code.substr(point.index, 1));

		previousIndex = point.index;
	}

	sanitizedStringArray = sanitizedStringArray.filter((value) => {
		return value ? true : false;
	});

	const spanPoints = sanitizedStringArray.map((char, index) => {
		return (
			<React.Fragment>
				<span style={{ color: manifest.has(char) ? "green" : "red" }} key={index}>
					{char}
				</span>
			</React.Fragment>
		);
	});

	return (
		<React.Fragment>
			{spanPoints}
			<br />
		</React.Fragment>
	);
};
