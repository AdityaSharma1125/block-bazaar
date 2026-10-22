// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard, Ownable {
    uint256 private _ids;
    uint256 public feeBps = 250;

    struct Listing { address seller; uint256 price; bool active; }
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => address) public creators;

    event Minted(uint256 indexed id, address indexed creator, string uri);
    event Listed(uint256 indexed id, address indexed seller, uint256 price);
    event Sold(uint256 indexed id, address indexed buyer, uint256 price);
    event Cancelled(uint256 indexed id);

    constructor() ERC721("Block Bazaar", "BBZ") Ownable(msg.sender) {}

    function totalMinted() external view returns (uint256) { return _ids; }

    function mint(string calldata uri) external returns (uint256 id) {
        id = ++_ids;
        _safeMint(msg.sender, id);
        _setTokenURI(id, uri);
        creators[id] = msg.sender;
        emit Minted(id, msg.sender, uri);
    }

    function list(uint256 id, uint256 price) external {
        require(ownerOf(id) == msg.sender, "Not the owner");
        require(price > 0, "Price must be above 0");
        _transfer(msg.sender, address(this), id);
        listings[id] = Listing(msg.sender, price, true);
        emit Listed(id, msg.sender, price);
    }

    function buy(uint256 id) external payable nonReentrant {
        Listing memory l = listings[id];
        require(l.active, "Not for sale");
        require(msg.value == l.price, "Send the exact price");
        delete listings[id];
        _transfer(address(this), msg.sender, id);
        uint256 fee = (l.price * feeBps) / 10000;
        (bool ok1, ) = l.seller.call{value: l.price - fee}("");
        (bool ok2, ) = owner().call{value: fee}("");
        require(ok1 && ok2, "Payment failed");
        emit Sold(id, msg.sender, l.price);
    }

    function cancel(uint256 id) external {
        Listing memory l = listings[id];
        require(l.active && l.seller == msg.sender, "Not your listing");
        delete listings[id];
        _transfer(address(this), msg.sender, id);
        emit Cancelled(id);
    }
}
