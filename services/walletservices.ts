import axios from "axios";
import { INITIATE_WALLET_URI, WALLET_ALL_TRANS_URI, WALLET_DETAILS_URI } from "./urls";

type walletPayloadType = {
    balance:Number,
    name : string,
}

const initiatWallet =async(payload:walletPayloadType) => {
 const result = await axios.post(INITIATE_WALLET_URI,payload);
 return result.data; 
}

const onWalletTransaction = () => {
  
}

const getAllTransactions =async (id:string,skip:number,limit:number) => {
    const result = await axios.get(`${WALLET_ALL_TRANS_URI}?walletId=${id}&skip=${skip}&limit=${limit}`);
    return result.data; 
}

const getWalletDeatils = async (id:string) => {
    const result = await axios.get(`${WALLET_DETAILS_URI}/${id}`);
    return result.data; 
}

export const walletService = {
initiatWallet,
onWalletTransaction,
getAllTransactions,
getWalletDeatils,
}