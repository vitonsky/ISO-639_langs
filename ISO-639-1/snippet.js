// Script to parse data from https://www.loc.gov/standards/iso639-2/php/code_list.php

var table = document.querySelectorAll('table')[1];
var rows = Array.from(table.querySelectorAll('tr')).slice(1);

// add to cut language name: `.split(/[;,()]/)[0].trim()`
var result = rows.map((row) => {
	var cols = row.querySelectorAll('td');
	return {
		v1: cols[1].textContent.trim(),
		v2: cols[0].textContent.trim(),
		eng: cols[2].textContent.trim(),
		fr: cols[3].textContent.trim(),
		de: cols[4].textContent.trim(),
	};
}).map(({v1,v2, ...props}) => {
	const objects = {};
	const v2Value = v2 || null;
	if (v2Value) {
		const versions = Array.from(v2Value.matchAll(/([a-z]+) \((B|T)\)/g));
		if (versions.length) {
			versions.forEach((match) => {
				objects[`v2${match[2]}`] = match[1];
			});
			objects.v2 = objects.v2B || objects.v2T;
		}
	}
	
	return ({...props, v1: v1 || null,v2: v2Value, ...objects})
}).filter((d,idx, arr) => arr.findIndex(({v2}) => v2 === d.v2) === idx)

var saveFile = (blob, name) => {
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = name;
	a.click();
};

saveFile(new Blob([JSON.stringify(result)]), 'data.json');
