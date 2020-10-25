const database = require('./database');
const fetch = require('node-fetch');
/**
 * https://api.warframe.market/v1/items/kronen_prime_blade/statistics
 * Periodically update each items price
 * Possibly implement a frequency dependant on price volitility
 */

var ids = [];
var index = 0;

const getIds = async function () {
  ids = (await database.getItemIds())
     .filter(x => x.id !== undefined)
    .map(y => y.id);
}

const nameToMarketFormat = (name) => {
  let nameSplit = name.split('-');
  if (nameSplit.length == 4) {
    if (nameSplit[2] == "neuroptics" || nameSplit[2] == "chassis" || nameSplit[2] == "systems" || nameSplit[2] == "harness" || nameSplit[2] == "wings") {
      nameSplit.pop();
    }
  }
  let url = nameSplit[0];
  if (nameSplit[1] == "&") { //Fix for silva & aegis
    nameSplit[1] = "and";
  }
  for (let i = 1; i < nameSplit.length; i++) {
    url += "_" + nameSplit[i];
  }
  return url;
}

const updateNextPrice = async function() {
  if (ids.length > 0) {
    let item = await database.getItemById(ids[index]);
    if (item.urlname != 'forma-blueprint') {
      let url = 'https://api.warframe.market/v1/items/' + nameToMarketFormat(item.urlname) + '/statistics';
      await fetch(url)
      .then(res => res.json())
      .then(async (json) => {
        let data = json.payload.statistics_closed["48hours"]; 
        let price = data[data.length - 1].moving_avg;
        if (price == undefined) {
          price = data[data.length - 1].avg_price;
        }
        await database.updatePrice(ids[index], price)
      })
      .catch(err => {
        console.error(err);
        console.log("Problem id: " + ids[index])
      });
    }
    index++;
    if (index >= ids.length) {
      getIds();
      index = 0;
    }
  }
}

getIds();
module.exports = async function run() {
    await updateNextPrice();
    setTimeout(run, 3000)
  };