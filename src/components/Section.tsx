import React from "react";
import { Item } from "../types";

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
          <div className="card" key={index} onClick={() => togglePop(item)}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
