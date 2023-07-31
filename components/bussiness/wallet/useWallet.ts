import { walletService } from "@/services/walletservices";
import {useEffect, useState } from "react";

function useWallet() {
  const [loader,setLoader] = useState(false);  
  const [wName,setWalletName] = useState('');
  const [wBal,setWalletBal] = useState(0);
  const [walletDetails,setWallet] = useState<any>(null);
  const [transFields,setTransFields] = useState({amount:'',description:'',isCredit:true});

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
    if(e.target.name==='isCredit'){
      setTransFields({...transFields,[e.target.name]:e.target.checked});
    }
    else {
    setTransFields({...transFields,[e.target.name]:e.target.value});
    }
  }

  const onTransSubmit = () => {
    let amount = Number(transFields.amount);
    if(!transFields.isCredit){
      amount = Number(-transFields.amount);
    }
    const transactionPayload = {
      amount:amount,
      description:transFields.description,  
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
  } 
}

export default useWallet
