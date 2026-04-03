//TEST DATA
/*
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
};*/


// Global Values
let classList = ""
let spellLevel = 0
let totalSpells = 0
let randomType = "structured"

// Lists for spells
let first = []
let second = []
let third = []
let fourth = []
let fifth = []
let sixth = []
let seventh = []
let eighth = []
let ninth = []

// Test Data value
let testData;

// Live Site List Variable
let globalData = {};


// Fetch and preload all the needed JSON into one place before loading the page
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
		console.log("All data loaded!", globalData);
		
	})
	.catch(error => console.error(`error loading JSON: ${error}`));


/*--- FOR USE IN LOCAL DEVELOPMENT ---

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

*/


// Event Listeners for setting global info
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









// Populate the list of all spells
function populateAvailableSpells () {
	// alert the user that they haven't selected a spell list yet
	if (classList === "") {
		alert("You haven't selected a class spell list!!!");
	}
	
	// get the number input to the totalSpells area
	getSpellSlots();
	
	// generate the list for the specific class
	const spells = generateFullList(classList)
	
	// fill in the html text area element
	document.getElementById("availableSpells").innerHTML = spells;
	
	
	
	
}

// generate a list of all spells available to a specific class
function generateFullList (list) {
	
	/* ----- LOCAL DEV/TESTING INFO -----
		
	
	//spellList = testData[list][0];
	
	//console.log(" ----- global data paths ----- ")
	//console.log("global data paths[list]")
	//console.log(globalData[list])
	
	//console.log("global data paths[list][0]")
	//console.log(globalData[list][0])
	
	//console.log("global data paths[list][list]")
	//console.log(globalData[list][list])
	
	//console.log("global data paths[list][list][0]")
	//console.log(globalData[list][list][0])
	
	*/
	
	// read the json at [ {_CLASS_} ][ {_CLASS_} ][0]
	spellList = globalData[list][list][0];
	
	fullList = "";
	
	// for every level of spell in the class specific json data... 
	for (const level in spellList) {
		
		// for every spell at each level...
		for (const spell in spellList[level]) {
			// take just the active spell from the json data at [ {_SPELL LEVEL_} ][ {_SPELL KEY_} ]
			currentSpell = spellList[level][spell];
			
			// build a string to display
			fullList += currentSpell + "\n";
			
		}
		
		// fill the individual spell arrays with the spells of the correct level
		fillSpellArrays(level, spellList[level]);
		
	}
	
	return fullList;
}


// get a random selection of spells
function populateRandomList () {
	// every class with have at least first level spells, so check that we've loading things correctly
	if (first.length === 0) {
		alert("Please generate your available spells first!");
	}
	
	// get the list of random spells and set the randomOutput html element to display it
	const randSpells = generateRandList();
	document.getElementById("randomOutput").innerHTML = randSpells;
	
}


// Generate the requested random list (heavy lifing here)
function generateRandList () {
	
	//create a new set and needed empty variables
	let spellSet = new Set();
	let randomSpell = "";
	let randomSelection = "";
	
	console.log("trueRand Value")
	console.log(trueRand)
	
	// check what type of random we want
	// True Random: We don't care about distribution of spells by level
	// Structured Random: We want an even distribution of spells per spell level
	if (randomType === "trueRand") {
		
		// default value for most classes
		let classSpecificCeiling = 9;
		
		// artificers don't get spells over 5th level so we need to hard set it for later
		if (classList === "artificer") {
			classSpecificCeiling = 5;
		}
		
		// run a loop for a number of times equal to the total number of spells that the user can prepare
		for (let k = 0; k < totalSpells; k++) {
			// get a random number between 1 and 9 (default) or 5 (artificier only)
			randomSpellLevel = Math.floor(Math.random() * classSpecificCeiling) + 1;
			
			//switch case for the random spell level
			//NOTE: Lots of duplicated code here so comments will cover one case as they do the same just on different lists
			switch (randomSpellLevel) {
				case 1:
					// do-while loop to help with duplicate values
					do {
						// grab a random spell from the first level spell list
						randomSpell = first[Math.floor(Math.random() * first.length)] + " - 1st";
						
						// if the output set doesn't have the randomly selected spell in it already
						if (!spellSet.has(randomSpell)) {
							// add the spell to the set, and make sure the loop exit boolean is set
							spellSet.add(randomSpell);
							alreadyAdded = false;
							
						} else {
							// we had a duplicate value and need to set the loop to loop
							alreadyAdded = true;
						}
						
					} while (alreadyAdded);
					
					
					break;
					
				case 2:
					do {
						randomSpell = second[Math.floor(Math.random() * second.length)] + " - 2nd";
						
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
						randomSpell = third[Math.floor(Math.random() * third.length)] + " - 3rd";
						
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
						randomSpell = fourth[Math.floor(Math.random() * fourth.length)] + " - 4th";
						
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
						randomSpell = fifth[Math.floor(Math.random() * fifth.length)] + " - 5th";
						
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
						randomSpell = sixth[Math.floor(Math.random() * sixth.length)] + " - 6th";
						
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
						randomSpell = seventh[Math.floor(Math.random() * seventh.length)] + " - 7th";
						
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
						randomSpell = eighth[Math.floor(Math.random() * eighth.length)] + " - 8th";
						
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
						randomSpell = ninth[Math.floor(Math.random() * ninth.length)] + " - 9th";
						
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
			
	} else {
		// Structured Random
		// this method of random selection has an issue with remainder values
		// this is a result of wanting an even distribution of spells per level
	
		// declare needed values for the remainder issue
		let remainder = 0;
		let remainderBool = false;
		let remainderActive = false;
		
		// see if we have a remainder to deal with in the first place and set it if we do
		if (totalSpells % spellLevel !== 0) {
			remainder = totalSpells % spellLevel;
			remainderBool = true;
			
		}
		
		// loop over every level of spell that the user has access to...
		for (let i = 1; i <= spellLevel; i++) {
			// figure out how many spells per level we'll be grabbing
			let spellsPerLevel = Math.floor(totalSpells / spellLevel);
			
			if (spellsPerLevel === 0) {
				alert("The info you've entered won't generate any spells with Structured Random. Try using True Random if you want a small list.");
			}
			
			// loop over each level of spell until we have a "mostly" even distribution from each level
			for (let j = 0; j < spellsPerLevel; j++) {
				let alreadyAdded = false;
				
				// like above, only going to cover 1 case as the rest do the same on different lists
				switch (i) {
					case 1:
						// check that the number of spells we'll be selecting isn't larger than the list of available spells
						if (first.length < spellsPerLevel) {
							spellsPerLevel = first.length;
							
						}
						
						// do-while to help with handling duplicate entries being added
						do {
							
							// the check for the remainder issue
							// Triggers one more loop iteration before moving onto the next level of spell
							if (remainderBool && ((j + 1) === spellsPerLevel)) {
								remainderActive = true;
								remainderBool = false;
							
							}
						
							// selects a random spell and prepends the spells level to it as a string
							randomSpell = "1st - " + first[Math.floor(Math.random() * first.length)];
							
							// check if we've added the spell to the set before or not
							if (!spellSet.has(randomSpell)) {
								
								// add the spell and set the loop break boolean appropriately
								spellSet.add(randomSpell);
								console.log("added to the set");
								alreadyAdded = false;
								
							} else {
								// set the loop to repeat until we have a non-duplicate value
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
							
							randomSpell = second[Math.floor(Math.random() * second.length)] + " - 2nd";
							
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
							
							randomSpell = third[Math.floor(Math.random() * third.length)] + " - 3rd";
							
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
							
							randomSpell = fourth[Math.floor(Math.random() * fourth.length)] + " - 4th";
							
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
							
							randomSpell = fifth[Math.floor(Math.random() * fifth.length)] + " - 5th";
							
							if (!spellSet.has(randomSpell)) {
								
								spellSet.add(randomSpell);
								console.log("added to the set") 
								alreadyAdded = false;
								
							} else {
								alreadyAdded = true;
								
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
							
							randomSpell = sixth[Math.floor(Math.random() * sixth.length)] + " - 6th";
							
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
							
							randomSpell = seventh[Math.floor(Math.random() * seventh.length)] + " - 7th";
							
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
							
							randomSpell = eighth[Math.floor(Math.random() * eighth.length)] + " - 8th";
							
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
							
							randomSpell = ninth[Math.floor(Math.random() * ninth.length)] + " - 9th";
							
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
				
				// if we have a remainder and remainder is active
				if (remainder !== 0) {
					
					if (remainderActive) {
						// trick the for loop to run 1 more time, decrement the remainder, deactivate it
						j--;
						remainder--;
						remainderActive = false;
						
					}
					
				}
				
			}
			
			// make sure we can run the remainder logic again
			remainderBool = true;
			
		}
	
	}
	
	//console.log(spellSet);
	
	// convert our built set of spells to a string for display
	randomSelection = convertSetToSring(spellSet);
	
	return randomSelection
}


// ----- HELPER METHODS ----- //

//Fill the arrays with the spells of the correct level
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

// Grab the data that the user input for this element
// no longer used, updated functionality to not need this
function setSpellList (list) {
	classList = list;
	
}

// Grab the data that the user input for this element
// no longer used, updated functionality to not need this
function setSpellLevel (selectedLevel) {
	spellLevel = selectedLevel;
	
}

// Grab the data that the user input for this element
function getSpellSlots () {
	// get the value
	totalSpells = document.getElementById("slots").value;
	
	// check that it's not empty and alert if it is
	if (totalSpells === "") {
		alert("You need to specify how many spells you can prepare!!!");
	}
	
	// RAW a character can't prepare more spells than 25 normally, 30 with extra items, so we set it to a max of 40 because homebrew is cool
	if (totalSpells > 40) {
			totalSpells = 40;
	}
	
}

// sets the random type, called in the html directly when the value is changed
function setRandomType (randValue) {
		
	randomType = randValue;
	
}

// converts a set to a string for display
function convertSetToSring (toBeConverted) {
	let builtString = "";
	
	// use the built in set loop method to build the string
	toBeConverted.forEach(value => builtString += value + "\n");
	
	return builtString;
}
























