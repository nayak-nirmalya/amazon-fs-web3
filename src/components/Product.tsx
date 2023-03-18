import { BrowserProvider } from "ethers";
import React from "react";
import { Item } from "../types";

interface ProductProps {
  item: Item;
  account: string;
  amazonDApp: any;
  provider: BrowserProvider;
  togglePop: (_: Item) => void;
}

const Product: React.FC<ProductProps> = ({
  item,
  account,
  provider,
  amazonDApp,
  togglePop,
}) => {
  return <div className="product">Product</div>;
};

export default Product;
