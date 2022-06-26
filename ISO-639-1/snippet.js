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
});

var saveFile = (blob, name) => {
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = name;
	a.click();
};

saveFile(new Blob([JSON.stringify(result)]), 'data.json');