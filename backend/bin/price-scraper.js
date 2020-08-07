/**
 * https://api.warframe.market/v1//items/kronen_prime_blade/statistics
 * Periodically update each items price
 * Possibly implement a frequency dependant on price volitility
 */
const database = require('./database');

var ids = [];
var index = 0;

const getIds = async function () {
  ids = (await database.getItemIds()
    .filter(x => x.id !== undefined)
    .map(x => x.id));
}

const updateNextPrice = async function() {
  if (ids.length > 0) {
    //get item by id from database
    //fetch item price from warframe market
    //update price in database
    //increment index
  }
}

module.exports = async function run() {
    await updateNextPrice();
    setTimeout(run, 3000)
  
  };