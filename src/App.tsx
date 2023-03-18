import { useEffect, useState } from "react";
import { ethers } from "ethers";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// Contract Deployed Network and Address
import config from "./config.json";

// Import Smart Contract ABI from Backend (HardHat) Folder.
import { abi } from "../../amazon-hardhat-backend/artifacts/contracts/AmazonDApp.sol/AmazonDApp.json";

function App() {
  const loadBlockchainData = async () => {
    console.log("Loading...");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    console.log(account);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <h2>Hello World!</h2>
    </div>
  );
}

export default App;
