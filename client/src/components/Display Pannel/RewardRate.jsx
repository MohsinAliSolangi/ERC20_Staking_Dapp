import React from "react"; 
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import "./DisplayPannel.css";
import { Store } from "../../Store/Store";
const RewardRate = () => {
  const {   
    getProviderStakingContrat,
    mainAccount,
  } = useContext(Store);

  const [rewardRate, setRewardRate] = useState("0");

  useEffect(() => {
    const fetchRewardRate = async () => {
      try {
        const rewardRateWei = await getProviderStakingContrat().REWARD_RATE();
        const rewardRateEth = ethers.utils.formatUnits(rewardRateWei?.toString(), 18);
        setRewardRate(rewardRateEth);
      } catch (error) {
        toast.error("Error fetching reward rate");
        console.error(error.message);
      }
    };
    getProviderStakingContrat && fetchRewardRate();
  }, [getProviderStakingContrat, mainAccount]);

  return (
    <div className="reward-rate">
      <p>Reward Rate:</p>
      <span>{rewardRate} token/sec </span>
    </div>
  );
};
export default RewardRate;
