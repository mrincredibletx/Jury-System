// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AdvancedJurySystem {
    address public owner;

    uint256 public caseCount;
    uint256 public jurorReward = 0.01 ether;

    enum Verdict { NotVoted, Guilty, NotGuilty }
    enum CaseStatus { Pending, Resolved, Appealed }

    struct Juror {
        bool registered;
        uint256 reputation;
        uint256 casesParticipated;
        uint256 penalties;
    }

    struct Case {
        uint256 id;
        string description;
        string evidenceURI;
        string category;
        address[] jurors;
        mapping(address => Verdict) votes;
        mapping(address => bool) hasVoted;
        uint256 guiltyVotes;
        uint256 notGuiltyVotes;
        uint256 createdAt;
        uint256 deadline;
        CaseStatus status;
        string finalVerdict;
    }

    mapping(uint256 => Case) public cases;
    mapping(address => Juror) public jurors;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyRegisteredJuror() {
        require(jurors[msg.sender].registered, "Not a registered juror");
        _;
    }

    event JurorAdded(address juror);
    event CaseCreated(uint256 caseId);
    event VoteCast(uint256 caseId, address juror, Verdict vote);
    event CaseFinalized(uint256 caseId, string verdict);
    event AppealRequested(uint256 caseId);

    constructor() {
        owner = msg.sender;
    }

    function registerJuror(address _juror) external onlyOwner {
        jurors[_juror] = Juror(true, 100, 0, 0); // Starting rep 100
        emit JurorAdded(_juror);
    }

    function createCase(
        string memory _description,
        string memory _evidenceURI,
        string memory _category,
        address[] memory _jurors,
        uint256 _durationInMinutes
    ) external onlyOwner {
        require(_jurors.length >= 3, "Minimum 3 jurors required");
        caseCount++;

        Case storage newCase = cases[caseCount];
        newCase.id = caseCount;
        newCase.description = _description;
        newCase.evidenceURI = _evidenceURI;
        newCase.category = _category;
        newCase.jurors = _jurors;
        newCase.status = CaseStatus.Pending;
        newCase.createdAt = block.timestamp;
        newCase.deadline = block.timestamp + (_durationInMinutes * 1 minutes);

        for (uint i = 0; i < _jurors.length; i++) {
            require(jurors[_jurors[i]].registered, "Unregistered juror");
            newCase.votes[_jurors[i]] = Verdict.NotVoted;
        }

        emit CaseCreated(caseCount);
    }

    function vote(uint256 _caseId, bool _voteGuilty) external onlyRegisteredJuror {
        Case storage _case = cases[_caseId];
        require(block.timestamp <= _case.deadline, "Voting deadline passed");
        require(_case.status == CaseStatus.Pending, "Case closed");
        require(_isAssignedJuror(_caseId, msg.sender), "Not assigned to this case");
        require(!_case.hasVoted[msg.sender], "Already voted");

        _case.hasVoted[msg.sender] = true;
        _case.votes[msg.sender] = _voteGuilty ? Verdict.Guilty : Verdict.NotGuilty;

        if (_voteGuilty) {
            _case.guiltyVotes++;
        } else {
            _case.notGuiltyVotes++;
        }

        jurors[msg.sender].casesParticipated++;
        emit VoteCast(_caseId, msg.sender, _case.votes[msg.sender]);

        if (_allJurorsVoted(_caseId)) {
            _finalizeCase(_caseId);
        }
    }

    function _finalizeCase(uint256 _caseId) internal {
        Case storage _case = cases[_caseId];
        _case.status = CaseStatus.Resolved;

        if (_case.guiltyVotes > _case.notGuiltyVotes) {
            _case.finalVerdict = "Guilty";
        } else if (_case.notGuiltyVotes > _case.guiltyVotes) {
            _case.finalVerdict = "Not Guilty";
        } else {
            _case.finalVerdict = "Tie (Hung Jury)";
        }

        emit CaseFinalized(_caseId, _case.finalVerdict);
        _distributeRewards(_caseId);
    }

    function requestAppeal(uint256 _caseId) external onlyOwner {
        require(cases[_caseId].status == CaseStatus.Resolved, "Case not resolved");
        cases[_caseId].status = CaseStatus.Appealed;
        emit AppealRequested(_caseId);
    }

    function _isAssignedJuror(uint256 _caseId, address _juror) internal view returns (bool) {
        address[] memory juryList = cases[_caseId].jurors;
        for (uint i = 0; i < juryList.length; i++) {
            if (juryList[i] == _juror) return true;
        }
        return false;
    }

    function _allJurorsVoted(uint256 _caseId) internal view returns (bool) {
        Case storage _case = cases[_caseId];
        for (uint i = 0; i < _case.jurors.length; i++) {
            if (!_case.hasVoted[_case.jurors[i]]) return false;
        }
        return true;
    }

    function _distributeRewards(uint256 _caseId) internal {
        Case storage _case = cases[_caseId];
        for (uint i = 0; i < _case.jurors.length; i++) {
            address juror = _case.jurors[i];
            if (_case.hasVoted[juror]) {
                payable(juror).transfer(jurorReward);
                jurors[juror].reputation += 1;
            } else {
                jurors[juror].penalties += 1;
                if (jurors[juror].reputation > 0) {
                    jurors[juror].reputation -= 1;
                }
            }
        }
    }

    function getCaseSummary(uint256 _caseId) public view returns (
        string memory description,
        string memory evidenceURI,
        string memory category,
        CaseStatus status,
        string memory verdict,
        uint256 deadline
    ) {
        Case storage c = cases[_caseId];
        return (
            c.description,
            c.evidenceURI,
            c.category,
            c.status,
            c.finalVerdict,
            c.deadline
        );
    }

    receive() external payable {} // Accept ETH for rewards
}
