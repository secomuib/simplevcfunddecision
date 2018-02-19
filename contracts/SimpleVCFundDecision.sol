pragma solidity ^0.4.15;

// Single-round simple VC decision on a project.
contract SimpleVCFundDecision {
    address proposer;
    address partyA;
    address partyB;
    address beneficiary;
    bool goPartyA;
    bool goPartyB;
    string name;

    // Requires two partners of the VC fund to agree,
    // in addition to the proponent
    // (the proponent is assumed to agree).
    function SimpleVCFundDecision(address A, address B, string project, address entrepreneur) public payable {
        require(msg.value > 0);
        beneficiary = entrepreneur; 
        name = project;
        goPartyA = false; 
        goPartyB = false;
        proposer = msg.sender; 
        partyA = A; 
        partyB = B;
    }

    function amount() public constant returns (uint funding) {
        funding = this.balance;
    }

    function project() public constant returns (string n) {
        return name;
    }
    
    function approve() public {
        if (msg.sender==partyA) {
            goPartyA = true;
        }
        if (msg.sender==partyB) {
            goPartyB = true;
        }
        if (goPartyA && goPartyB) {
            finalize();
        }
    }

    function cancel() public {
        require(msg.sender==proposer);
        // Transfer Ether to proposer and terminate contract
        selfdestruct(proposer);
    }

    function finalize() private {
        // Transfer Ether to beneficiary and terminate contract
        selfdestruct(beneficiary);
    }
}