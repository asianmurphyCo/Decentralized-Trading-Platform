const dashboard = require('./apis/dashboard');
const dependencies = require('./dependencies');

const port = 5035;

// Connect to the database
dashboard.connectToDatabase();

// Route for fetching coin list
dependencies.app.get('/database', async (req, res) => {
  const coinlist = await dashboard.getCoinList();
  res.status(200).send(coinlist);
});

dependencies.app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});