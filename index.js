const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}



let inventory = [] // Creates an array named inventory

class Item { //Create class for Item Object
  constructor(name, description, action, takeable) {
    this.name = name,
      this.description = description,
      this.action = action || "Nothing happens...",
      this.takeable = takeable || false;
  }
  take() { //Take method allows you to pick items up and add them to your inventory
    if (this.takeable) {
      inventory.push(this.name);
      return `You picked up ${this.name} and stored it in your inventory!`
    } else {
      return `You can't take that!`
    }
  }
  use() { //Use method allows you to use items that are inside your inventory
    if (this.name === "note" && inventory.includes(this.name)) {
      return this.action
    } else {
      return false;
    }
  }
  examineI() { //examine method allows you to examine items
    return this.description
  }
}

//List of items in the game

let note = new Item(
  "note",
  "A written note I wonder what it says... on second thought who wrote it??",
  "JOURNEY to the kitchen and CRAFT your master SANDWICH. Your LIFE as you know IT depends on your success!",
  true
)

let knife = new Item(
  "knife",
  "It's a sharp knife, perhaps you can use it to slice bread.",
  "You slice the the bread perfectly into two equal pieces!",
  true
)

let nightstand = new Item(
  "nightstand",
  "It's an old, heavy, and wooden nightstand.",
)

let lookupItem = {
  note: note,
  knife: knife,
  nightstand: nightstand
}

class Room { //Creates class for Room Object
  constructor(name, desciption, movement, items, locked) {
    this.name = name,
      this.desciption = desciption,
      this.movement = movement || "You can't go to that room from here!",
      this.items = items || "There are no items in this room!",
      this.locked = locked || "There are no locks on this door!"
  }
  examineR() { //examine method allows you to obtain room description
    return this.desciption
  }
  examineItems() {//examine method allows you to obtain string of items in room
    return this.items
  }
}

//list of rooms in the game

let bedroom = new Room(
  "bedroom",
  "This is where you sleep and recover from the sorrows of the previous day!",
  "You can get out to the HALLWAY from here!",
  "This room contains a NOTE!",
  true
)

let hallway = new Room(
  "hallway",
  "The great connector, access to everything but the place of supreme relaxaion 'Thee Lounge'!",
  "You can enter your BEDROOM or the KITCHEN from here.",
  false,
  false
)

let kitchen = new Room(
  "kitchen",
  "Craft delicious delicacies to satiate yourself here!",
  "You can enter the HALLWAY or the LOUNGE or the FRIDGE from here.",
  "This room contains a FRIDGE!",
  false
)

let lounge = new Room(
  "lounge",
  "Sit back, kick your feet up, and relax. You've earned it!",
  "You can enter the KITCHEN from here!",
  "This room contains a KNIFE!",
  false
)

let fridge = new Room(
  "fridge",
  "It's cold but all your food is preserved in here!",
  "You can enter the KITCHEN from here!",
  "This room contains a ",
  false
  )

let local = bedroom // Defines starting location

let lookupLocal = {
  bedroom: bedroom,
  hallway: hallway,
  kitchen: kitchen,
  lounge: lounge,
  fridge: fridge
}

let localTrans = { //Creates object that determines which rooms have access to others
  bedroom: ["hallway"],
  hallway: ["bedroom", "kitchen"],
  kitchen: ["hallway", "lounge", "fridge"],
  lounge: ["kitchen"],
  fridge: ["kitchen"]
}

function move(target) { //function that is supposed to allow you to move rooms
  if (localTrans[local.movement].includes(target)) {
    local = lookupLocal[target]
    console.log(local)
  } else {
    console.log(this.movement)
  }
}

async function start() { //function to start the game and allow player inputs
  let playerAction = await ask("What would you like to do? \n>_") //asks for player input
  let inputArray = playerAction.toLowerCase().split(" ") //converts player input to lower case and splits by spaces
  let action = inputArray[0] // defines action to the first word of the player input this will be used to access the action constructor of the item class
  let target = inputArray.slice(1).join(" ") // defines target to the rest of the player input which will be used to reference previously defined rooms and items

  if (action === "use") { //if first word of player input is use then game runs the use method for item
    console.log(lookupItem[target].use());
  } else if (action === "take") { //if first word of player input is take then game runs the take method for item, if player input is not in the item class then the game responds negatively
    if (lookupItem[target] instanceof Item) {
      console.log(lookupItem[target].take())
    } else {
      console.log(lookupItem[target] instanceof Item)
      console.log("That's not an item!")
    }
  } else if (action === "examine") { // if first word of player input is examine then game will run the examineI method for item
    console.log(lookupItem[target].examineI())
  }
  if (action === "move") { // if first word of player input is move then game runs the move function with the rest of the player input as the parameter.
    move(target)
    console.log(Room.desciption)
    console.log(Room.movement)
    console.log(Room.items)
  }
  return start() // loops back to that top 
}

console.log(`You wake up in a cold dark place after a night of having too much fun.
  Oh wait... it's just your BEDROOM. Your stomach growls in hunger. You are confused and disoriented
  no doubt the effects of the lingering hangover. Fortunately, you spot a NOTE on your NIGHTSTAND!
  It may hold the clues to discover the remedy you need.`);
console.log(`You are in the BEDROOM!`)

start() // initialize the game and start at the async function