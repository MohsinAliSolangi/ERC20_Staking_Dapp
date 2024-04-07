import React, { useContext, useEffect } from "react"
import { Store } from "../../Store/Store";
import Button from "../Button/Button";
const ConnectedAccount = ()=> {
    const { connectWallet, isWalletConnected } = useContext(Store);

    return (
        <div>
            {isWalletConnected ? 
          <Button type="button" label="Connected" />
          :
          <Button onClick={connectWallet} type="button" label="Connect Wallet" />
            }
        </div>
      );

}
export default ConnectedAccount