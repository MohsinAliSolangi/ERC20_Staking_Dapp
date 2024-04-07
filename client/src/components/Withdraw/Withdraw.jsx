import React from "react"; 
import { useContext,useRef } from "react";
import {ethers} from "ethers"
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import "./Withdraw.css"
import { Store } from "../../Store/Store";

const WithdrawStakeAmount =()=>{
 const {loader, setloader, getSignerStakingContrat}=useContext(Store)
 const withdrawStakeAmountRef = useRef();


 const withdrawStakeToken=async(e)=>{
   e.preventDefault();
   const amount = withdrawStakeAmountRef.current.value.trim();
   console.log(amount)
   if(isNaN(amount) || amount<=0){
    console.error("Please enter a valid positive number");
    return;
   }
   const amountToWithdraw = ethers.parseUnits(amount,18).toString();
   console.log(amountToWithdraw)
   try{
    const transaction = await getSignerStakingContrat().withdrawStakedTokens(amountToWithdraw)
    await toast.promise(transaction.wait(),
    {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯'
    });
    withdrawStakeAmountRef.current.value = "";
    setloader(!loader);
    // const receipt = await transaction.wait();
    // if (receipt.status === 1) {
    //     setloader(!loader);
    //     withdrawStakeAmountRef.current.value = "";
    //   } else {
    //       toast.error("Transaction failed. Please try again.")
    //   }
    } catch (error) {
      toast.error("Staking Failed");
      console.error(error.message)
    }
  };
    return (
        <form className="withdraw-form" onSubmit={withdrawStakeToken}>
            <label>Withdraw Token:</label>
            <input type="text" ref={withdrawStakeAmountRef} />
            <Button
            onClick={withdrawStakeToken}
            type="submit"
            label="Withdraw Staked Token"
            />
      </form>
       )
}
export default WithdrawStakeAmount;