const DigitalAssets = artifacts.require("DigitalAssets")

module.exports = function(deployer){
    deployer.deploy(DigitalAssets);
}