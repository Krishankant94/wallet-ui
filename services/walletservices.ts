import axios from "axios";
import { INITIATE_WALLET_URI, WALLET_ALL_TRANS_URI, WALLET_DETAILS_URI, WALLET_TRANS_URI } from "./urls";

type walletPayloadType = {
    balance:Number,
    name : string,
}

type transactionType = {
    amount : number,
    description : string,
}

const initiatWallet =async(payload:walletPayloadType) => {
 const result = await axios.post(INITIATE_WALLET_URI,payload);
 return result.data; 
}

const onWalletTransaction = async (id:string,payload:transactionType) => {
    const result = await axios.post(`${WALLET_TRANS_URI}/${id}`,payload);
    return result.data; 
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
