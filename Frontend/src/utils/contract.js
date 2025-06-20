import { ethers } from "ethers";
import abi from "./LockABI.json";

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);
const signer = provider.getSigner();
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, abi, signer);

export default contract;
