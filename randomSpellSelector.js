/*const testData = {
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
};*/



let classList = ""
let spellLevel = 0
let totalSpells = 0
let randomType = "structured"

let first = []
let second = []
let third = []
let fourth = []
let fifth = []
let sixth = []
let seventh = []
let eighth = []
let ninth = []

let testData;

let globalData = {};



Promise.all([
	fetch('./artificer.json').then(r => r.json()),
	fetch('./cleric.json').then(r => r.json()),
	fetch('./druid.json').then(r => r.json()),
	fetch('./paladin.json').then(r => r.json()),
	fetch('./palemaster.json').then(r => r.json())
])
	.then(([artificer, cleric, druid, paladin, palemaster]) => {
		globalData.artificer = artificer;
		globalData.cleric = cleric;
		globalData.druid = druid;
		globalData.paladin = paladin;
		globalData.palemaster = palemaster;
		console.log("All data loaded!");
	})
	.catch(error => console.error(`error loading JSON: ${error}`));



fetch("./testJSON.json")
	.then(response => response.json())
	.then(data => {
		testData = data;
		console.log(data);
	})
	.catch(error => console.error("error loading JSON:", error));

//const jsonString = JSON.stringify(testData);

//test for accessing data in specific json
//OBJECT["CLASS VALUE"][INDEX(note, there is only 1 index in this format)].NAMED LIST[POSITION IN NAMED LIST]
//const tempVal = testData["druid"][0].second[2]

//const tempVal2 = testData["druid"][0].first

//console.log("printing temp val")
//console.log(tempVal)

//console.log("printing temp val 2")
//console.log(tempVal2)



document.addEventListener("DOMContentLoaded", function() {
	const classElement = document.getElementById("selectList");
	classElement.addEventListener("change", function() {
		classList = classElement.value;
		console.log("value changed");
		console.log(classElement.value)
	});
	
	const spellLevelElement = document.getElementById("spellLevelLimit");
	spellLevelElement.addEventListener("change", function() {
		spellLevel = spellLevelElement.value;
		console.log("value changed");
		console.log(spellLevelElement.value)
	});
	
	const spellListSizeElement = document.getElementById("slots");
	spellListSizeElement.addEventListener("change", function() {
		totalSpells = spellListSizeElement.value;
		console.log("value changed");
		console.log(spellListSizeElement.value)
	});
	
});








function populateAvailableSpells () {
	if (classList === "") {
		alert("You haven't selected a class spell list!!!");
	}
	getSpellSlots();
	
	const spells = generateFullList(classList)
	
	document.getElementById("availableSpells").innerHTML = spells;
	
}

function generateFullList (list) {
	//spellList = testData[list][0];
	spellList = globalData[list][0];
	
	fullList = "";
	
	for (const level in spellList) {
		
		for (const spell in spellList[level]) {
			currentSpell = spellList[level][spell];
			
			fullList += currentSpell + "\n";
			
		}
		
		fillSpellArrays(level, spellList[level]);
		
	}
	
	return fullList;
}



function populateRandomList () {
	if (first.length === 0) {
		alert("Please generate your available spells first!");
	}
	
	const randSpells = generateRandList();
	document.getElementById("randomOutput").innerHTML = randSpells;
	
}



function generateRandList () {
	
	let spellSet = new Set();
	let randomSpell = "";
	let randomSelection = "";
	
	
	if (randomType === "trueRand") {
		
		for (let k = 0; k < totalSpells; k++) {
			randomSpellLevel = Math.floor(Math.random() * 9) + 1;
			
			switch (randomSpellLevel) {
				case 1:
					do {
						randomSpell = first[Math.floor(Math.random() * first.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 2:
					do {
						randomSpell = second[Math.floor(Math.random() * second.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 3:
					do {
						randomSpell = third[Math.floor(Math.random() * third.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 4:
					do {
						randomSpell = fourth[Math.floor(Math.random() * fourth.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 5:
					do {
						randomSpell = fifth[Math.floor(Math.random() * fifth.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 6:
					do {
						randomSpell = sixth[Math.floor(Math.random() * sixth.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 7:
					do {
						randomSpell = seventh[Math.floor(Math.random() * seventh.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 8:
					do {
						randomSpell = eighth[Math.floor(Math.random() * eighth.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 9:
					do {
						randomSpell = ninth[Math.floor(Math.random() * ninth.length)];
						
						if (!spellSet.has(randomSpell)) {
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
			}
			
		}
			
	}
	let remainder = 0;
	let remainderBool = false;
	let remainderActive = false;
	
	if (totalSpells % spellLevel !== 0) {
		remainder = totalSpells % spellLevel;
		remainderBool = true;
		
	}
	
	//for each level of spell
	for (let i = 1; i <= spellLevel; i++) {
		let spellsPerLevel = Math.floor(totalSpells / spellLevel);
		
		for (let j = 0; j < spellsPerLevel; j++) {
			let alreadyAdded = false;
			
			switch (i) {
				case 1:
					if (first.length < spellsPerLevel) {
						spellsPerLevel = first.length;
						
					}
					
					do {
						
						if (remainderBool && ((j + 1) === spellsPerLevel)) {
							remainderActive = true;
							remainderBool = false;
						
						}
					
						randomSpell = first[Math.floor(Math.random() * first.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set");
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
							
						}
						
						
						
					} while (alreadyAdded);
					
					break;
					
				case 2:
					if (second.length < spellsPerLevel) {
						spellsPerLevel = second.length;
						
					} 
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
						}
						
						randomSpell = second[Math.floor(Math.random() * second.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set");
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
				case 3:
					if (third.length < spellsPerLevel) {
						spellsPerLevel = third.length;
						
					}
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
						}
						
						randomSpell = third[Math.floor(Math.random() * third.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set") 
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
				case 4:
					if (fourth.length < spellsPerLevel) {
						spellsPerLevel = fourth.length;
						
					}
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
						}
						
						randomSpell = fourth[Math.floor(Math.random() * fourth.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set") 
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
				case 5:
					if (fifth.length < spellsPerLevel) {
						spellsPerLevel = fifth.length;
						
					}
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
						}
						
						randomSpell = fifth[Math.floor(Math.random() * fifth.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set") 
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
							remainderBool = false;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
				case 6:
					if (sixth.length < spellsPerLevel) {
						spellsPerLevel = sixth.length;
						
					}
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
							remainderBool = false;
						}
						
						randomSpell = sixth[Math.floor(Math.random() * sixth.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set") 
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
				case 7:
					if (seventh.length < spellsPerLevel) {
						spellsPerLevel = seventh.length;
						
					}
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
						}
						
						randomSpell = seventh[Math.floor(Math.random() * seventh.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set") 
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
				case 8:
					if (eighth.length < spellsPerLevel) {
						spellsPerLevel = eighth.length;
						
					}
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
						}
						
						randomSpell = eighth[Math.floor(Math.random() * eighth.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set") 
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
				case 9:
					if (ninth.length < spellsPerLevel) {
						spellsPerLevel = ninth.length;
						
					}
					
					do {
						
						if (remainderBool) {
							remainderActive = true;
							remainderBool = false;
						}
						
						randomSpell = ninth[Math.floor(Math.random() * ninth.length)];
						
						if (!spellSet.has(randomSpell)) {
							
							spellSet.add(randomSpell);
							console.log("added to the set") 
							alreadyAdded = false;
							
						} else {
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
				
					break;
					
					
			}
			
			if (remainder !== 0) {
				
				if (remainderActive) {
					j--;
					remainder--;
					remainderActive = false;
					
				}
				
			}
			
		}
		
		remainderBool = true;
		
	}
	
	console.log(spellSet);
	
	randomSelection = convertSetToSring(spellSet);
	
	return randomSelection
}


// ----- HELPER METHODS ----- //

function fillSpellArrays (level, levelArray) {
	
	switch (level) {
		case "first":
			first.push(...levelArray);
			break;
		
		case "second":
			second.push(...levelArray);
			break;
		
		case "third":
			third.push(...levelArray);
			break;
		
		case "fourth":
			fourth.push(...levelArray);
			break;
		
		case "fifth":
			fifth.push(...levelArray);
			break;
		
		case "sixth":
			sixth.push(...levelArray);
			break;
		
		case "seventh":
			seventh.push(...levelArray);
			break;
		
		case "eighth":
			eighth.push(...levelArray);
			break;
		
		case "ninth":
			ninth.push(...levelArray);
			break;
			
	}
	
}

function setSpellList (list) {
	classList = list;
	
	//console.log("class list")
	//console.log(classList)
	
}

function setSpellLevel (selectedLevel) {
	spellLevel = selectedLevel;
	
	//console.log("spell level")
	//console.log(spellLevel)
	
}

function getSpellSlots () {
	totalSpells = document.getElementById("slots").value;
	
	if (totalSpells === "") {
		alert("You need to specify how many spells you can prepare!!!");
	}
	
	if (totalSpells > 40) {
			totalSpells = 40;
	}
	
	//console.log("spell slots")
	//console.log(totalSpells)
	
}

function setRandomType (randValue) {
		
	randomType = randValue;
	
	//console.log("radio button types")
	//console.log(randomType)
	
}

function convertSetToSring(toBeConverted) {
	let builtString = "";
	
	toBeConverted.forEach(value => builtString += value + "\n");
	
	return builtString;
}