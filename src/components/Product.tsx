import { BrowserProvider, ethers } from "ethers";
import React, { useEffect, useState } from "react";

import { Item } from "../types";
import Rating from "./Rating";
import close from "../assets/close.svg";

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
  const [order, setOrder] = useState(null);
  const [hasBought, setHasBought] = useState<boolean>(false);

  const fetchDetails = async () => {
    const events = await amazonDApp.queryFilter("Buy");

    const orders = events.filter(
      (event: any) =>
        event.args.buyer === account &&
        event.args.itemId.toString() === item.id.toString()
    );

    if (orders.length === 0) return;

    const order = await amazonDApp.orders(account, orders[0].args.orderId);
    setOrder(order);
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();

    await amazonDApp.connect(signer).buy(item.id, { value: item.cost });

    setHasBought(true);
  };

  useEffect(() => {
    fetchDetails();
  }, [hasBought]);

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>
          <Rating value={item.rating as unknown as number} />

          <hr />

          <h2>{ethers.formatUnits(item.cost.toString(), "ether")} ETH</h2>

          <hr />

          <h2>Overview</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem,
            iusto, consectetur inventore quod soluta quos qui assumenda aperiam,
            eveniet doloribus commodi error modi eaque! lure repudiandae
            temporibus ex? Optio!
          </p>
        </div>
        <div className="product__order">
          <h1>{ethers.formatUnits(item.cost.toString(), "ether")} ETH</h1>

          <p>
            FREE Delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </p>

          {(item.stock as unknown as number) > 0 ? (
            <p> In Stock.</p>
          ) : (
            <p> Out of Stock.</p>
          )}

          <button className="product__buy" onClick={buyHandler}>
            Buy Now
          </button>

          <p>
            <small>Ships from </small>Amazon Clone
          </p>
          <p>
            <small>Sold by </small>Amazon Clone
          </p>

          {order && (
            <div className="product__bought">
              Item Bought on <br />
              <strong>
                {new Date(Date.now() + 345600000).toLocaleDateString(
                  undefined,
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </strong>
            </div>
          )}
        </div>
        <button onClick={() => togglePop(item)} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default Product;
