/**
 * Create database connections for scrapers and queries
 */

const bent = require("bent");

const url = "https://drops.warframestat.us/data/relics/Axi/R1.json";
const getJSON = bent('json');

const getRelics = async () => {
    return await getJSON(url);
}


module.exports = getRelics;