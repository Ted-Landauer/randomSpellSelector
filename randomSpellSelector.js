

console.log("Hello World!");




const testData = {
	"druid":[
		{
			"first": [
				"absorb elements",
				"ambush",
				"bloodhound",
				"detect magic",
				"entangle",
			],
			"second": [
				"darkvision",
				"desecrate",
				"earthbind",
				"enhance ability",
				"find traps",
			],
			"third": [
				"dispel magic",
				"daylight",
				"feign death",
				"poison",
				"wind wall",
			]
		},
	],
	"cleric":[
		{
			"first": [
				"bane",
				"bless",
				"brimstone",
				"command",
				"cure wounds",
			],
			"second": [
				"aid",
				"augury",
				"egg",
				"enhance ability",
				"locate object",
			],
			"third": [
				"animate dead",
				"daylight",
				"feign death",
				"iron mind",
				"revivify",
			]
		},
	],
};






//const jsonString = JSON.stringify(testData);


//test for accessing data in specific json
//OBJECT["CLASS VALUE"][INDEX(note, there is only 1 index in this format)].NAMED LIST[POSITION IN NAMED LIST]
const tempVal = testData["druid"][0].second[2]

const tempVal2 = testData["druid"][0].first


console.log("printing temp val")
console.log(tempVal)

console.log("printing temp val 2")
console.log(tempVal2)


function populateList (activeClass) {
	spellList = testData[activeClass][0];
	
	fullList = "";
	
	for (const level in spellList) {
		
		for (const spell in spellList[level]) {
			
			fullList += spellList[level][spell] + "\n";
			
			
		}
	}
	
	document.getElementById("availableSpells").innerHTML = fullList;
	
}


