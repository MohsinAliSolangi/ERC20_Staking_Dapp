import React from "react"; 
import { useContext, useRef } from "react";
import { ethers } from "ethers";
import stakingContractAddress from "../../contractsData/StakingContract-address.json";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import { Store } from "../../Store/Store";

const TokenApproval = () => {
  const { getSignerStakeTokenContrat } = useContext(Store);

  const approvedTokenRef = useRef();

  const approveToken = async (e) => {
    e.preventDefault();
    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error("Please enter a valid positive number");
      return;
    }
    const amountToSend = ethers.utils.parseUnits(amount, 18).toString();
    try {
      const transaction = await getSignerStakeTokenContrat().approve(
        stakingContractAddress.address,
        amountToSend
      );
      await toast.promise(transaction.wait(), {
        loading: "Transaction is pending...",
        success: "Transaction successful 👌",
        error: "Transaction failed 🤯",
      });
      approvedTokenRef.current.value = "";
      // const receipt = await transaction.wait();
      // if (receipt.status === 1) {
      //     toast.success("Transaction is successful")
      //     approvedTokenRef.current.value = "";
      //   } else {
      //       toast.error("Transaction failed. Please try again.")
      //   }
    } catch (error) {
      toast.error("Token Approval Failed");
      console.error(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={approveToken} className="token-amount-form">
        <label className="token-input-label">Token Approval:</label>
        <input type="text" ref={approvedTokenRef} />
        <Button onClick={approveToken} type="submit" label="Token Approval" />
      </form>
    </div>
  );
};
export default TokenApproval;
