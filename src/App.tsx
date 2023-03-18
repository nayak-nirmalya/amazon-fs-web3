import { ethers } from "ethers";

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// Contract Deployed Network and Address
import config from "./config.json";

// Import Smart Contract ABI from Backend (HardHat) Folder.
import { abi } from "../../amazon-hardhat-backend/artifacts/contracts/AmazonDApp.sol/AmazonDApp.json";
import Navigation from "./components/Navigation";

function App() {
  const [account, setAccount] = useState<string>("");

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    setAccount(account);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <h2>Hello World!</h2>
      <Navigation account={account} setAccount={setAccount} />
    </div>
  );
}

export default App;
