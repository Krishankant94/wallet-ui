import Link from "next/link";
import useTransaction from "./useTransaction"

type transactionDataType = {
  transactionId: string,
  walletId: string,
  amount: number,
  balance: number,
  description: string,
  date: string,
  type: string,
}

function Transactions() {
  const {transactionData,getTransactionData,wId} = useTransaction();

  

  const renderTableRow = (item:transactionDataType) => {
    return <tr>
        <td>{item.transactionId}</td>
        <td>{item.walletId}</td>
        <td>{item.amount}</td>
        <td>{item.balance}</td>
        <td>{item.description}</td>
        <td>{item.date}</td>
        <td>{item.type}</td>
    </tr> 
  }
 console.log('transactionData',transactionData);
  return (
    <div>Transactions Details
      <Link href={'/wallet'}>Back to wallet</Link> 
       <table>
         <tr>
         <td>{"transactionId"}</td>
        <td>{"walletId"}</td>
        <td>{"amount"}</td>
        <td>{"balance"}</td>
        <td>{"description"}</td>
        <td>{"date"}</td>
        <td>{"type"}</td>
         </tr>
       
       {transactionData&&transactionData.map(item=>renderTableRow(item))}
       </table>
    </div>
  )
}

export default Transactions