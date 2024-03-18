const dashboard = require('./apis/dashboard');
const dependencies = require('./dependencies');

const port1 = 5035;
const port2 = 5036;
const port3 = 5037;
const port4 = 5038;

const app = dependencies.app;
const authenticate = require('./apis/authenticate');
const verify = require('./apis/verify');
const logout = require('./apis/logout');
const retrieveProfile = require('./apis/retrieveProfile');
const registerAPI = require('./apis/registerAPI');
const marketRetrieve = require('./apis/marketRetrieve');
const sellAsset = require('./apis/sellAsset');
const transactionHistoryAPI = require('./apis/transactionHistoryAPI');
const uploadTransaction = require('./apis/uploadTransaction');
var cors = require("cors");

app.get('/api', (req, res) => {
  res.json({ users: ['user1', 'user2', 'user3'] });
});

// Route for fetching coin list
app.get('/database', async (req, res) => {
  const coinlist = await dashboard.getCoinList();
  res.status(200).send(coinlist);
});

app.post("/authenticate", authenticate);
app.post("/verify", verify);
app.post("/logout", logout);
app.post("/retrieveProfile", retrieveProfile);
app.post("/registerAPI", registerAPI);
app.get("/marketRetrieve", marketRetrieve);
app.post("/sellAsset", sellAsset);
app.post("/transactionHistoryAPI", transactionHistoryAPI);
app.post("/uploadTransaction", uploadTransaction);

const server1 = app.listen(port1, () => {
  console.log(`Server is running on port ${port1}`);
});

const server2 = app.listen(port2, () => {
  console.log(`Server is running on port ${port2}`);
});

const server3 = app.listen(port3, () => {
  console.log(`Server is running on port ${port3}`);
});

const server4 = app.listen(port4, () => {
  console.log(`Server is running on port ${port4}`);
})