pragma solidity >=0.6.2 <0.8.0;

contract CharityChain {
    address admin;  // adminstrator of this charity
    string public uen; // UEN of charity organisation÷
    uint constant MAX_LENGTH = 50; // max number of transactions returned for a search by donor


    bytes32[] nricHashes;
    uint[] amounts;
    bytes32[] messages;

    constructor(address _admin, string memory _uen) {
        admin = _admin;
        uen = _uen;
    }

    modifier isAdmin {
        require(msg.sender == admin, 'Only admin can access this function');
        _;
    }

    function addTransactions(bytes32 nricHash, uint amount, bytes32 message) public isAdmin {
        nricHashes.push(nricHash);
        amounts.push(amount);
        messages.push(message);
    }

    function checkTransactions(bytes32 nricHash) public view returns (
        uint[MAX_LENGTH] memory filteredAmounts, bytes32[MAX_LENGTH] memory filteredMessages) {
        uint index = 0; // index only for filtered arrays.
        for (uint i = 0; i < nricHashes.length && i <= MAX_LENGTH; i++) {
            if (nricHashes[i] == nricHash) {
                filteredAmounts[index] = amounts[i];
                filteredMessages[index] = messages[i];
                index++;
            }
        }
        return (filteredAmounts, filteredMessages);
    }
    
    function showAllTransactions() public view returns (bytes32[] memory, uint[] memory, bytes32[] memory) {
        return (nricHashes, amounts, messages);
    }
}

