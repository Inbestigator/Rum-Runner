import Image from "next/image";
import React, { useContext } from "react";
import { BalanceContext } from "../pages";

export interface Ship {
  name: string;
  price: number;
  icon: string;
}

const BuyMenu = ({ onBuy }: { onBuy: (ship: Ship) => void }) => {
  const ships: Ship[] = [
    { name: "Rowboat", price: 50, icon: "pixelart-rowboat.png" },
    { name: "Speedboat", price: 100, icon: "pixelart-speedboat.png" },
    { name: "Schooner", price: 500, icon: "pixelart-schooner.png" },
  ];

  const [balance] = useContext(BalanceContext);

  return (
    <div
      className="bg-white p-8 rounded-lg"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
    >
      <h3 className="text-xl font-bold mb-4">Build</h3>
      {ships.map((ship, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <Image src={ship.icon} width={50} height={50} alt="Ship icon"></Image>
          <div className="flex items-start justify-between mb-2 flex-col">
            <div>{ship.name}</div>
            <div>Price: {ship.price}</div>
          </div>
          <div className="p-2" />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => onBuy(ship)}
          >
            Build
          </button>
        </div>
      ))}
      {balance >= 1000 && (
        <div className="flex items-center justify-between mb-2">
          <Image
            src="pixelart-goldflyingboat.png"
            width={50}
            height={50}
            alt="Ship icon"
          ></Image>
          <div className="flex items-start justify-between mb-2 flex-col">
            <div>Golden flying boat</div>
            <div>Price: 1000</div>
          </div>
          <div className="p-2" />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              alert("You win!!!");
              window.location.reload();
            }}
          >
            Build
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyMenu;
