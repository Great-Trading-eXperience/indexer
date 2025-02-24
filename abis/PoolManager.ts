export const PoolManagerABI: any[] = [
	{
		type: "constructor",
		inputs: [
			{
				name: "_owner",
				type: "address",
				internalType: "address",
			},
			{
				name: "_feeReceiver",
				type: "address",
				internalType: "address",
			},
			{
				name: "_feeMaker",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_feeTaker",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "balanceOf",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "balance",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "deposit",
		inputs: [
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "deposit",
		inputs: [
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "feeMaker",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "feeTaker",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getBalance",
		inputs: [
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getLockedBalance",
		inputs: [
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
			{
				name: "operator",
				type: "address",
				internalType: "address",
			},
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "lock",
		inputs: [
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "lockedBalanceOf",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address",
			},
			{
				name: "operator",
				type: "address",
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "owner",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "renounceOwnership",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "setAuthorizedOperator",
		inputs: [
			{
				name: "operator",
				type: "address",
				internalType: "address",
			},
			{
				name: "approved",
				type: "bool",
				internalType: "bool",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "setFees",
		inputs: [
			{
				name: "_feeMaker",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_feeTaker",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "transferFrom",
		inputs: [
			{
				name: "sender",
				type: "address",
				internalType: "address",
			},
			{
				name: "receiver",
				type: "address",
				internalType: "address",
			},
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "transferLockedFrom",
		inputs: [
			{
				name: "sender",
				type: "address",
				internalType: "address",
			},
			{
				name: "receiver",
				type: "address",
				internalType: "address",
			},
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "transferOwnership",
		inputs: [
			{
				name: "newOwner",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "unlock",
		inputs: [
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "withdraw",
		inputs: [
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "withdraw",
		inputs: [
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "Deposit",
		inputs: [
			{
				name: "user",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "amount",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OperatorSet",
		inputs: [
			{
				name: "operator",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "approved",
				type: "bool",
				indexed: false,
				internalType: "bool",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OwnershipTransferred",
		inputs: [
			{
				name: "previousOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "newOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "TransferFrom",
		inputs: [
			{
				name: "operator",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "sender",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "receiver",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
			{
				name: "amount",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "Withdrawal",
		inputs: [
			{
				name: "user",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "amount",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "error",
		name: "ERC20TransferFailed",
		inputs: [],
	},
	{
		type: "error",
		name: "InsufficientBalance",
		inputs: [
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
			{
				name: "id",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "want",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "have",
				type: "uint256",
				internalType: "uint256",
			},
		],
	},
	{
		type: "error",
		name: "NativeTransferFailed",
		inputs: [],
	},
	{
		type: "error",
		name: "OwnableInvalidOwner",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "OwnableUnauthorizedAccount",
		inputs: [
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "ReentrancyGuardReentrantCall",
		inputs: [],
	},
	{
		type: "error",
		name: "TransferError",
		inputs: [
			{
				name: "user",
				type: "address",
				internalType: "address",
			},
			{
				name: "currency",
				type: "address",
				internalType: "Currency",
			},
			{
				name: "amount",
				type: "uint256",
				internalType: "uint256",
			},
		],
	},
	{
		type: "error",
		name: "UnauthorizedOperator",
		inputs: [
			{
				name: "operator",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "ZeroAmount",
		inputs: [],
	},
] as const;
