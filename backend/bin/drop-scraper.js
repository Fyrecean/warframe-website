const fetch = require('node-fetch');
const database = require('./database');
/**
 * https://github.com/WFCD/warframe-drop-data#api-endpoints
 * Updates database from drops api
 */
var lastUpdate = 0;
const url = 'https://drops.warframestat.us/data/relics.json';
const update = async function() {
    fetch(url)
    .then(res => res.json())
    .then(async (json) => {
        for (let i = 0; i < json.relics.length; i += 4) {
            let type = json.relics[i].tier;
            if (type == "Requiem") {
                break;
            }
            let info = {
                "type": json.relics[i].tier,
                "name": json.relics[i].relicName,
                "drops": json.relics[i].rewards.map(reward => {
                    let rarity;
                    switch(reward.chance) {
                        case(2):
                            rarity = "Rare";
                            break;
                        case(11):
                            rarity = "Uncommon";
                            break;
                        default:
                            rarity = "Common";
                    }
                    return [reward.itemName, rarity];
                })
            };
            let relicID = await database.insertRelic(info.type, info.name);
            if (relicID >= 0) {
                console.log("Adding relic: " + relicID);
                for (let j = 0; j < info.drops.length; j++) {
                    let itemID = await database.insertItem(info.drops[j][0]);
                    if (itemID < 0) {
                        itemID = (await database.getItem(info.drops[j][0])).id;
                    }
                    database.insertDrop(relicID, itemID, info.drops[j][1]);
                }
            }
        }
    });
}

module.exports = async function run() {
    let res = await fetch("https://drops.warframestat.us/data/info.json");
    res = await res.json();
    if (res["timestamp"] != lastUpdate) {
        lastUpdate = res["timestamp"];
        await update();
    }
    setTimeout(run, 86400000);
};