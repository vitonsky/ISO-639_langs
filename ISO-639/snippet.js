// Script to parse data from https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

var table = document.querySelector('#Table');
var rows = Array.from(table.querySelectorAll('tr')).slice(1);
var clearText = (text) => text.trim().split(/\s/)[0];

var result = rows.map((row) => {
	var cols = row.querySelectorAll('td');
	return {
		title: cols[0].textContent.trim(),
		v1: clearText(cols[1].textContent),
		v2T: clearText(cols[2].textContent),
		v2B: clearText(cols[3].textContent),
		v3: clearText(cols[4].textContent),
	};
});

var saveFile = (blob, name) => {
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = name;
	a.click();
};

saveFile(new Blob([JSON.stringify(result)]), 'data.json');