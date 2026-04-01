//import data from "./TestSpells.json" assert { type: "json"}

console.log("Hello World!");



//const temp = require('./TestSpells.json');

//console.log(data)


async function loadData() {
	
		const requestURL = "https://github.com/Ted-Landauer/randomSpellSelector/blob/main/TestSpells.json";
		const request = new Request(requestURL);
		
		const response = await fetch(request);
		
		
		const spells = await response.json();
		
		console.log(spells);
	
}
loadData();

