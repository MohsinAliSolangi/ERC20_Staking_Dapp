import React, { useContext, useEffect, useState } from "react"
import Wallet from "./components/Wallet/Wallet"
import Navigation from "./components/Navigation/Navigation"
import DisplayPannel from './components/Display Pannel/DisplayPannel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/Withdraw/Withdraw'
import './App.css'
import { Store } from "./Store/Store"
function App() {
  const {checkIsWalletConnected, mainAccount}= useContext(Store)
  const [displaySection, setDisplaySection] = useState("stake");

  useEffect(()=> {
    checkIsWalletConnected();
},[mainAccount])

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
    <div className="main-section">
      <Wallet/>
        <Navigation />
              <DisplayPannel />
          <div className="main-content">
            <div className="button-section">
              <button
                onClick={() => handleButtonClick("stake")}
                className={displaySection === "stake" ? "" : "active"}
              >
                Stake
              </button>
              <button
                onClick={() => handleButtonClick("withdraw")}
                className={displaySection === "withdraw" ? "" : "active"}
              >
                Withdraw
              </button>
            </div>
            {displaySection === "stake" && (
              <div className="stake-wrapper">
                <TokenApproval />
                <StakeAmount />
              </div>
            )}
            {displaySection === "withdraw" && (
              <div className="stake-wrapper">
                <WithdrawStakeAmount />
              </div>
            )}
          </div>
    </div>
  )
}

export default App
