import React from "react"; 
import { useContext } from "react";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import "./ClaimReward.css";
import { Store } from "../../Store/Store";

const ClaimReward = () => {
  const { getSignerStakingContrat } = useContext(Store);

  const claimReward = async () => {
    try {
      const transaction = await getSignerStakingContrat().getReward();
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      // if(receipt.status === 1){
      //     setTransactionStatus("Transaction Is Successful")
      //     setTimeout(()=>{
      //       setTransactionStatus("")
      //     },5000)
      //   } else{
      //     setTransactionStatus("Transaction failed. Please try again.");
      //   }
    } catch (error) {
      console.error("Claim Reward Failed", error.message);
    }
  };
  return (
    <>
      <div className="claim-reward">
        <Button type="button" label="Claim Reward" onClick={claimReward} />
      </div>
    </>
  );
};

export default ClaimReward;
