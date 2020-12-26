pragma solidity >=0.5.16 <0.8.0;
import './CharityChain.sol';

contract Onboarding {
  address private admin; // We are the owners
  mapping(string => address) private charities;

  constructor(address _admin) public {
        admin = _admin;
  }
  
  modifier isAdmin {
    require(msg.sender == admin, 'Only admin can access this function');
    _;
  }

  function onboardCharity(string memory UEN, address charityAdmin) public isAdmin {
    address charityAddress = address(new CharityChain(charityAdmin, UEN));
    charities[UEN] = charityAddress;
  }

  function getCharities(string memory UEN) public view returns (address) {
    return charities[UEN];
  }
}