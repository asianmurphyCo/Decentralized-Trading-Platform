// dashboard.js
const { client } = require('../dependencies');

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
}

async function getCoinList() {
  try {
    const db = client.db('Dashboard');
    const coll = db.collection('Dashboard');
    const coinlist = await coll.find().toArray();
    return coinlist;
  } catch (error) {
    console.error('Failed to fetch coin list from the database', error);
    return [];
  }
}

module.exports = {
  connectToDatabase,
  getCoinList,
};