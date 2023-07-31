import { walletService } from "@/services/walletservices";
import {useEffect, useState } from "react";

function useWallet() {
  const [loader,setLoader] = useState(false);  
  const [wName,setWalletName] = useState('');
  const [wBal,setWalletBal] = useState(0);
  const [walletDetails,setWallet] = useState<any>(null);
  const [transFields,setTransFields] = useState({amount:'',description:'',isCredit:true});
  const [toaster,setToast] = useState('hi');

  useEffect(()=>{
    const wId = localStorage&&localStorage.getItem('walletId');
    wId && getWalletInfo(wId);
  },[])
  
  const getWalletInfo = async (id:string) => {
    setLoader(true);
    try{
     const result = await walletService.getWalletDeatils(id);
     setWallet(result);
     setLoader(false);
    }
    catch(error){
      setLoader(false);
    }
  }

  const onSubmit =async () => {
    setLoader(true);
    try{
     const {result} = await walletService.initiatWallet({balance:Number(wBal),name:wName});
     localStorage.setItem('walletId',result?.walletId)
     getWalletInfo(result?.walletId);
     setLoader(false);
    }
    catch(err){
     console.log(err);   
     setLoader(false);
    }
  }  
  const onChange = (e:any) => {
    if(e.target.name==='wName'){
        setWalletName(e.target.value);
    }
    else {
        setWalletBal(e.target.value)
    }
  }  

  const handleTransChange = (e:any) => {
    setToast('');
    if(e.target.name==='isCredit'){
      setTransFields({...transFields,[e.target.name]:e.target.checked});
    }
    else {
    setTransFields({...transFields,[e.target.name]:e.target.value});
    }
  }

  const onTransSubmit = async() => {
    let amount = Number(transFields.amount);
    if(!transFields.isCredit){
      amount = Number(-transFields.amount);
    }
    const transactionPayload = {
      amount:amount,
      description:transFields.description,  
    }
    setLoader(true);
    try{
      const wId = localStorage&&localStorage.getItem('walletId');
      const {result} = await walletService.onWalletTransaction(wId as string,transactionPayload); 
      console.log(result);
      getWalletInfo(wId as string);
      setLoader(false);
      setToast('Transaction completed!');
    }
    catch(error){
      console.log(error);
      setLoader(false);
    }
    console.log('transFields',transactionPayload);
  }

  return {
    loader,
    onSubmit,
    onChange,
    wName,
    wBal,
    walletDetails,
    transFields,
    handleTransChange,
    onTransSubmit,
    toaster,
  } 
}

export default useWallet
