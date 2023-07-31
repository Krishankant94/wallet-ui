import React from 'react'
import useWallet from './useWallet';
import Link from 'next/link';

function WalletComponent() {
  const { loader, wBal, wName, onSubmit, onChange, walletDetails, transFields, handleTransChange, onTransSubmit } = useWallet();

  if (loader) {
    return <div>Loading...</div>
  }
  return (
    <div className='wallet-container'>
      {walletDetails ? <> <div className='header'>
        <div className='left-h'>{`Wallet Balance : ${walletDetails?.result?.balance}`}</div>
        <div className='right-h'>{`Wallet ID : ${walletDetails?.result?.walletId}`}</div>

      </div>
        <div className='content'>
          Set Transactions +/-
          <input type='number' placeholder='enter amount' name={'amount'} value={transFields.amount} onChange={handleTransChange} />
          <input type='text' placeholder='enter description' name={'description'} value={transFields.description} onChange={handleTransChange} />
          
          <label className="switch">
            <input type="checkbox" name={'isCredit'} checked={transFields.isCredit} onChange={handleTransChange} />
            <span className="slider round"></span>
          </label>
          <button onClick={onTransSubmit}>submit</button>
          <Link href={'/transactions'}>See All Transactions</Link>
        </div>
      </>
        :
        <div className='content'>
          <div>Enter wallet Details</div>
          <input name='wName' type='text' value={wName} onChange={onChange} />
          <input name='wBal' type='number' value={wBal} onChange={onChange} />
          <button onClick={onSubmit}>Submit</button>
        </div>
      }

    </div>
  )
}

export default WalletComponent