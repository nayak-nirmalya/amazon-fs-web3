import React from "react";
import { ethers } from "ethers";
import { Item } from "../types";
import Rating from "./Rating";

interface SectionProps {
  title: string;
  items: Item[];
  togglePop: () => void;
}

const Section: React.FC<SectionProps> = ({ title, items, togglePop }) => {
  return (
    <div className="cards__section">
      <h3 id={title}>{title}</h3>

      <hr />

      <div className="cards">
        {items.map((item, index) => (
          <div className="card" key={index} onClick={() => togglePop()}>
            <div className="card__image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="card__info">
              <h4>{item.name}</h4>
              <Rating value={item.rating as unknown as number} />
              <p>{ethers.formatUnits(item.cost.toString(), "ether")} ETH</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
