import React, { useState, useEffect, createContext } from "react";
import { ethers, providers, utils } from "ethers";
import StakingContractAddress from "../contractsData/StakingContract-address.json";
import StakingContractAbis from "../contractsData/StakingContract.json";
import RewardTokenAddress from "../contractsData/RewardToken-address.json";
import StakeTokenAddress from "../contractsData/StakeToken-address.json";
import TokenAbis from "../contractsData/StakeToken.json";
// import { ToastContainer, toast } from "react-toastify";

const { ethereum } = window;

const getSignerStakingContrat = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const StakingContract = new ethers.Contract(
    StakingContractAddress.address,
    StakingContractAbis.abi,
    signer
  );
  return StakingContract;
};

const getProviderStakingContrat = () => {
  const providers = process.env.REACT_APP_RPC;
  const provider = new ethers.providers.JsonRpcProvider(providers); //"http://localhost:8545/"
  const StakingContract = new ethers.Contract(
    StakingContractAddress.address,
    StakingContractAbis.abi,
    provider
  );
  return StakingContract;
};

const getSignerStakeTokenContrat = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const USDTContract = new ethers.Contract(
    StakeTokenAddress.address,
    TokenAbis.abi,
    signer
  );
  return USDTContract;
};

const getSignerRewardTokenContrat = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const USDTContract = new ethers.Contract(
    RewardTokenAddress.address,
    TokenAbis.abi,
    signer
  );
  return USDTContract;
};

const getProviderStakeTokenContrat = () => {
  const providers = process.env.REACT_APP_RPC;
  const provider = new ethers.providers.JsonRpcProvider(providers); //"http://localhost:8545/"
  const StakingContract = new ethers.Contract(
    StakeTokenAddress.address,
    TokenAbis.abi,
    provider
  );
  return StakingContract;
};

const getProviderRewardTokenContrat = () => {
  const providers = process.env.REACT_APP_RPC;
  const provider = new ethers.providers.JsonRpcProvider(providers); //"http://localhost:8545/"
  const StakingContract = new ethers.Contract(
    RewardTokenAddress.address,
    TokenAbis.abi,
    provider
  );
  return StakingContract;
};

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [mainAccount, setAccount] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [loader, setloader] = useState(false);
  const connectWallet = async () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      try {
        // Check if the wallet is already connected
        if (!isMobile && !isWalletConnected) {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: process.env.CHAIN_ID, // Replace with your desired chain ID
              },
            ],
          });

          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          setAccount(accounts[0]);
          setIsWalletConnected(true);
        } else if (isMobile) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          setIsWalletConnected(true);
        }
      } catch (err) {
        setIsWalletConnected(false);
        toast.error(err.message);
        console.error(err.message);
      }
    } else {
      if (isMobile) {
        // Metamask app is not installed, redirect to installation page
        window.open(
          "https://metamask.app.link/dapp/https://staking-dapp-project.vercel.app/"
        );
        return;
      } else {
        // if no window.ethereum and no window.web3, then MetaMask or Trust Wallet is not installed
        alert(
          "MetaMask or Trust Wallet is not installed. Please consider installing one of them."
        );
        return;
      }
    }
  };

  const checkIsWalletConnected = async () => {
    try {
      window.ethereum.on("accountsChanged", async function (accounts) {
        setAccount(accounts[0]);
        setIsWalletConnected(true);
      });
      window.ethereum.on("chainChanged", async (chainId) => {
        if (chainId != process.env.CHAIN_ID) {
          //TODO
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                // chainId: "0x5" //Goerli
                // chainId: "0x89", //PolygonMainnet
                // chainId: "0xaa36a7", //sepolia
                // chainId: "0x1", //Miannet
                chainId: process.env.CHAIN_ID, //localHost TODO
                // chainId:"0x13881" //mumbai
                // chainId:"0x61"//bnb
              },
            ],
          });
        }
      });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
        setIsWalletConnected(true);
      } else {
        console.log("No account Found");
        setIsWalletConnected(false);
      }
    } catch (err) {
      console.log(err.message);
      setIsWalletConnected(false);
    }
  };

  return (
    <>
      <Store.Provider
        value={{
          connectWallet,
          setloader,
          checkIsWalletConnected,
          mainAccount,
          isWalletConnected,
          loader,
          getProviderStakingContrat,
          getSignerStakingContrat,
          getSignerStakeTokenContrat,
        }}
      >
        {children}
      </Store.Provider>
    </>
  );
};
