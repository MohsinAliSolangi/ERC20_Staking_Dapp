import React from "react"; 
import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import "./DisplayPannel.css";
import { Store } from "../../Store/Store";

const EarnedReward = () => {
  const { mainAccount, getProviderStakingContrat } = useContext(Store);

  const [rewardVal, setRewardVal] = useState("0");

  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        //fetching earned amount of a user
        const rewardValueWei = await getProviderStakingContrat().earned(
          mainAccount
        );
        const rewardValueEth = ethers
          .formatUnits(rewardValueWei, 18)
          .toString();
        const roundedReward = parseFloat(rewardValueEth).toFixed(2);
        setRewardVal(roundedReward);
      } catch (error) {
        toast.error("Error fetching the reward:");
        console.error(error.message);
      }
    };
    const interval = setInterval(() => {
      getProviderStakingContrat && fetchStakeRewardInfo();
    }, 20000);
    return () => clearInterval(interval);
  }, [getProviderStakingContrat, mainAccount]);

  return (
    <div className="earned-reward">
      <p>Earned Reward:</p>
      <span>{rewardVal}</span>
    </div>
  );
};
export default EarnedReward;
