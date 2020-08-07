/**
 * Create database connections for scrapers and queries
 */
const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'warframe'
});

const insertRelic = async (type, name) => {
    let conn;
    let id = -1;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("INSERT INTO relics (type, name) VALUES (?, ?)", [type, name]);
        id = res.insertId;
    } catch (err) {
        //Pretty sure ignoring error isn't best practice but its working fantastically for me right now
    } finally {
        if (conn) conn.end();
        return id;
    }
}

const insertItem = async (name) => {
    let conn;
    let id = -1;
    try {
        conn = await pool.getConnection();
        let urlname = name.replace(/ /g, '-').toLowerCase()
        const res = await conn.query("INSERT INTO items (name, urlname) VALUES (?, ?)", [name, urlname]);
        id = res.insertId;
    } catch (err) {
        //Pretty sure ignoring error isn't best practice but its working fantastically for me right now
    } finally {
        if (conn) conn.end();
        return id;
    }
}

const insertDrop = async (relicID, itemID, rarity) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query("INSERT INTO drops (relic_id, item_id, rarity) VALUES (?, ?, ?)", [relicID, itemID, rarity]);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

const getItem = async (name) => {
    let conn;
    let row = {};
    try {
        conn = await pool.getConnection();
        row = (await conn.query("SELECT * FROM items WHERE name = ?", [name]))[0];
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
        return row;
    }
}

const getItemIds = async () => {
    let conn;
    let row = {};
    try {
        conn = await pool.getConnection();
        row = await conn.query("SELECT id FROM items");
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
        return row;
    }
}

const getDropsFromRelic = async (rarity, name) => {
    let conn;
    let row = {};
    try {
        conn = await pool.getConnection();
        row = (await conn.query("SELECT items.name AS item, items.urlname, relics.type, relics.name, drops.rarity "+
                                "FROM items INNER JOIN drops INNER JOIN relics ON items.id=drops.item_id AND relics.id=drops.relic_id "+
                                "WHERE relics.type = ? AND relics.name = ? ORDER BY drops.rarity", [rarity, name]));
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (conn) conn.end();
        return row;
    }
}

module.exports = {
    "insertRelic": insertRelic,
    "insertDrop": insertDrop,
    "insertItem": insertItem,
    "getItem": getItem,
    "getDropsFromRelic": getDropsFromRelic,
    "getItemIds": getItemIds,
}