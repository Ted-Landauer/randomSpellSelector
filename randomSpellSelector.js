//import data from "./TestSpells.json" assert { type: "json"}

console.log("Hello World!");



fetch("TestSpells.json")
	.then(response => response.json())
	.then(json => console.log(json));













//const temp = require('./TestSpells.json');

//console.log(data)


async function loadData() {
	try {
		const response = await fetch("./TestSpells.json");
		if (!response.ok) {
			throw new Error("network response was bad");
		}
		
		const data = await response.json();
		
		console.log(data);
	} catch (error) {
		console.error("Error:", error)
	}
}
loadData();

