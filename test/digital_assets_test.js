const DigitalAssetsTest = artifacts.require("DigitalAssets");

contract("DigitalAssets", accounts => {
  let digitalAssetsInstance;

  beforeEach(async () => {
    digitalAssetsInstance = await DigitalAssetsTest.new();
  });

  it("should set initial owner correctly", async () => {
    const owner = await digitalAssetsInstance.owner();
    assert.equal(owner, accounts[0], "Owner should be the deployer");
  });

  it("should set digital asset correctly", async () => {
    const name = "Test Asset";
    const price = 100;

    await digitalAssetsInstance.setDigitalAsset(name, price);

    const newItem = await digitalAssetsInstance.digitalAssets(1);

    assert.equal(newItem.name, name, "Name of the asset should be 'Test Asset'");
    assert.equal(newItem.price, price, "Price of the asset should be 100");
  });

  it("should purchase asset correctly", async () => {
    // Deployer sets a digital asset
    await digitalAssetsInstance.setDigitalAsset("Test Asset", 100);

    // Get balance before purchase
    const balanceBefore = await web3.eth.getBalance(accounts[0]);

    // Purchase the asset
    await digitalAssetsInstance.purchaseAsset(1, { value: 150, from: accounts[1] });

    // Get balance after purchase
    const balanceAfter = await web3.eth.getBalance(accounts[0]);

    assert.equal(
      balanceBefore - 150,
      balanceAfter,
      "Contract balance should decrease by 150 after purchase"
    );

    // Check if purchaser is now the owner
    const newOwner = await digitalAssetsInstance.getItemCurrentOwner(1);
    assert.equal(newOwner.ownerAddress, accounts[1], "Second account should be the new owner");
  });
});
