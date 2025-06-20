export const CONTRACT_ADDRESS = "0xD84Dfcac2d5b618EfA89342a0887B1DAB60DFb65"; // replace with deployed address
export const CONTRACT_ABI = [
    
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        }
      ],
      "name": "AppealRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        }
      ],
      "name": "CaseCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "verdict",
          "type": "string"
        }
      ],
      "name": "CaseFinalized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "juror",
          "type": "address"
        }
      ],
      "name": "JurorAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "juror",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum Lock.Verdict",
          "name": "vote",
          "type": "uint8"
        }
      ],
      "name": "VoteCast",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "caseCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cases",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "evidenceURI",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "guiltyVotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "notGuiltyVotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "createdAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "enum Lock.CaseStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "finalVerdict",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_evidenceURI",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "address[]",
          "name": "_jurors",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
        }
      ],
      "name": "createCase",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_caseId",
          "type": "uint256"
        }
      ],
      "name": "getCaseSummary",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "evidenceURI",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "enum Lock.CaseStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "verdict",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "jurorReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "jurors",
      "outputs": [
        {
          "internalType": "bool",
          "name": "registered",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "reputation",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "casesParticipated",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "penalties",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_juror",
          "type": "address"
        }
      ],
      "name": "registerJuror",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_caseId",
          "type": "uint256"
        }
      ],
      "name": "requestAppeal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_caseId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_voteGuilty",
          "type": "bool"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  
 
];
