import { BrowserProvider, ethers } from "ethers";

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// Contract Deployed Network and Address
import config from "./config.json";

// Import Smart Contract Types, ABI from Backend (HardHat) Folder.
import { AmazonDApp } from "../../amazon-hardhat-backend/typechain-types";
import { abi } from "../../amazon-hardhat-backend/artifacts/contracts/AmazonDApp.sol/AmazonDApp.json";
import Navigation from "./components/Navigation";

import { Item } from "./types";
import Section from "./components/Section";

function App() {
  const [account, setAccount] = useState<string>("");
  const [amazonDApp, setAmazonDApp] = useState<any>(null);
  const [provider, setProvider] = useState<BrowserProvider>();
  const [toys, setToys] = useState<Item[]>([]);
  const [clothing, setClothing] = useState<Item[]>([]);
  const [electronics, setElectronics] = useState<Item[]>([]);

  const togglePop = () => {};

  const loadBlockchainData = async () => {
    // connect to blockchain
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const chainId = network.chainId || 31337;

    // connect to smart contract
    const amazonDApp = new ethers.Contract(
      // @ts-ignore
      config[chainId].AmazonDApp.address,
      abi,
      provider
    );
    setAmazonDApp(amazonDApp);

    // load products
    const items: Item[] = [];
    for (let i = 1; i < 10; i++) {
      const item: Item = await amazonDApp.items(i);
      items.push(item);
    }

    const electronics = items.filter((item) => item.category === "electronics");
    const clothing = items.filter((item) => item.category === "clothing");
    const toys = items.filter((item) => item.category === "toys");

    setElectronics(electronics);
    setClothing(clothing);
    setToys(toys);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <h2>Amazon Best Sellers</h2>

      {electronics && clothing && toys && (
        <>
          <Section
            title="Clothing & Jewelery"
            items={clothing}
            togglePop={togglePop}
          />
          <Section
            title="Electronics & Gadgets"
            items={electronics}
            togglePop={togglePop}
          />
          <Section title="Toys & Gaming" items={toys} togglePop={togglePop} />
        </>
      )}
    </div>
  );
}

export default App;
