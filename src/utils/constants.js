export const TOMI_CONTRACT_ADDRESS =
  "0x4385328cc4D643Ca98DfEA734360C0F596C83449";

export const tomiABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const sign_message =
  "Sign this message to authenticate with Wallet Connect to Tomi";

export const minimumBalance = 100; // for voting
export const minimumBalanceForSubmit = 5000; // for submitting new proposal

export const submitPeriodInHours = 4; // Time limit in hours
export const submitPeriodInMillis = submitPeriodInHours * 60 * 60 * 1000;

export const CATEGORIES = [
  {
    name: "Browser",
    bg: "1.png",
  },
  {
    name: "Domains",
    bg: "2.png",
  },
  {
    name: "Wallet",
    bg: "3.png",
  },
  {
    name: "Storage",
    bg: "4.png",
  },
  {
    name: "Depin",
    bg: "5.png",
  },
  {
    name: "General",
    bg: "6.png",
  },
  {
    name: "Website",
    bg: "7.png",
  },
  {
    name: "CDN",
    bg: "8.png",
  },
  {
    name: "Compute",
    bg: "9.png",
  },
];
