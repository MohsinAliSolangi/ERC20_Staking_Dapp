import React from "react";
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import "./DisplayPannel.css";
import { Store } from "../../Store/Store";

const StakedAmount = () => {
  const { loader, getSignerStakingContrat, mainAccount } = useContext(Store);

  const [stakedAmount, setStakedAmount] = useState("0");

  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        const amountStakedWei = await getSignerStakingContrat().stakedBalance(
          mainAccount
        );
        const amountStakedEth = ethers.utils.formatUnits(
          amountStakedWei?.toString(),
          18
        );
        setStakedAmount(amountStakedEth?.toString());
      } catch (error) {
      //   toast.error("Error fetching staked amount");
        console.error(error.message);
      }
    };
    getSignerStakingContrat && fetchStakedBalance();
  }, [getSignerStakingContrat, mainAccount, loader]);

  return (
    <div className="staked-amount">
      <p>Staked Amount: </p> <span>{stakedAmount}</span>
    </div>
  );
};
export default StakedAmount;
