import { walletService } from "@/services/walletservices";
import { useEffect, useState } from "react";

function useTransaction() {
 const [transactionData,setTransactionData] = useState([]); 
 const [wId,setWalletId] = useState<string>('');
 const [loader,setLoader] = useState(false);
 
 useEffect(()=>{
    const wId = localStorage&&localStorage.getItem('walletId');
    wId && getTransactionData(wId,0);
    wId && setWalletId(wId);
 },[]);
 
 const getTransactionData = async (id:string,page=0) => {
   setLoader(true); 
  try{
    const {result} =  await walletService.getAllTransactions(id,page,10);
    setTransactionData(result);
    setLoader(false);
  }
  catch(error){
   console.log(error);
   setLoader(false);
  }
 }

 return {
    transactionData,
    loader,
    getTransactionData,
    wId,
 }
}

export default useTransaction
