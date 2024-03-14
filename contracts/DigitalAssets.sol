// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//  Manage and Sell Digital Assets
contract DigitalAssets {
    //  Events
    event ItemCreated(
        address indexed owner,
        uint256 itemId,
        string name,
        uint256 price
    );
    event ItemPurchased(address indexed buyer, uint256 itemId, string name);

    //  Manage Asset Count which also acts as Asset ID
    uint assetCount = 0;

    //  Contract Owner
    address public owner;

    //  Constructor sets contract owner
    constructor() {
        owner = msg.sender;
    }

    //  Struct for Owner Type
    struct Owner {
        address payable ownerAddress;
    }

    //  Struct for Item Type
    struct Item {
        uint256 id;
        string name;
        uint256 price;
        uint256 purchased_time;
    }

    //  Create a mapping to store Digital Assets
    mapping(uint => Item) public digitalAssets;
    mapping(uint => Owner[]) public assetOwners;

    //  Modifier onlyOwner can call certain function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner Can Call This Function!");
        _;
    }

    //  Set Item into mappings
    function setDigitalAsset(string memory _name, uint256 _priceInWei) public {
        assetCount++;
        digitalAssets[assetCount] = Item(assetCount, _name, _priceInWei, 0);
        assetOwners[assetCount].push(Owner(payable(msg.sender)));
        emit ItemCreated(msg.sender, assetCount, _name, _priceInWei);
    }

    //  Return the current owner of a specific Item
    function getItemCurrentOwner(
        uint _itemId
    ) public view returns (Owner memory) {
        uint currentOwnerIndex = assetOwners[_itemId].length - 1;
        return assetOwners[_itemId][currentOwnerIndex];
    }

    //  Return list of owners of a specific Item
    function getItemAllOwner(
        uint _itemId
    ) public view returns (address[] memory) {
        uint ownersCount = assetOwners[_itemId].length;
        address[] memory owners = new address[](ownersCount);
        for (uint i = 0; i < ownersCount; i++) {
            owners[i] = assetOwners[_itemId][i].ownerAddress;
        }
        return owners;
    }

    //  Get Contract Balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    //  Purchase an Item
    function purchaseAsset(uint _itemId) public payable {
        require(_itemId <= assetCount && _itemId > 0, "Invalid item ID");
        require(msg.value >= digitalAssets[_itemId].price, "Not Enough Coin!");
        address payable currentOwner = payable(
            getItemCurrentOwner(_itemId).ownerAddress
        );
        (bool sent, ) = currentOwner.call{value: digitalAssets[_itemId].price}(
            ""
        ); //  Transfer the required funds to the current owner
        require(sent, "Error Sending Ether");
        if (msg.value > digitalAssets[_itemId].price) {
            payable(msg.sender).transfer(
                msg.value - digitalAssets[_itemId].price
            ); //  Refund the excess funds
        }
        digitalAssets[_itemId].purchased_time = block.timestamp; //  Store purchase time as epoch time
        addNewOwner(msg.sender, _itemId);
        emit ItemPurchased(msg.sender, _itemId, digitalAssets[_itemId].name);
    }

    //  Add new Owner to specific Item when purchase is completed
    function addNewOwner(address _addr, uint _itemId) private {
        Owner memory newOwner = Owner(payable(_addr));
        assetOwners[_itemId].push(newOwner);
    }

    //  Withdraw funds from the contract
    function withdrawFunds(uint _amount) public onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(_amount);
    }

    receive() external payable {}
}
