import Image from "next/image";
import React, { useContext } from "react";
import { BalanceContext, ShipContext } from "../pages";

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
  const [ownedShips] = useContext(ShipContext);

  return (
    <div
      className="bg-white p-8 rounded-lg cursor-default"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h3 className="text-xl font-bold mb-4">Build</h3>
      {ships.map((ship, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <Image src={ship.icon} width={50} height={50} alt="Ship icon"></Image>
          <div className="flex items-start justify-between mb-2 flex-col">
            <div>{ship.name}</div>
            <div>Price: ${ship.price}</div>
          </div>
          <div className="p-2" />
          <button
            disabled={ownedShips.some(
              (ownedShip) => ownedShip.name === ship.name
            )}
            className={`px-4 py-2 text-white rounded ${
              ownedShips.some((ownedShip) => ownedShip.name === ship.name)
                ? "bg-green-800 cursor-default cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 active:bg-green-700"
            }`}
            onClick={() => {
              onBuy(ship);
            }}
          >
            Build
          </button>
        </div>
      ))}
      {(balance >= 5000 ||
        ownedShips.some((ship) => ship.name === "Golden flying boat")) && (
        <div className="flex items-center justify-between mb-2">
          <Image
            src="pixelart-goldflyingboat.png"
            width={50}
            height={50}
            alt="Ship icon"
          ></Image>
          <div className="flex items-start justify-between mb-2 flex-col">
            <div>Golden flying boat</div>
            <div>Price: $5000</div>
          </div>
          <div className="p-2" />
          <button
            disabled={ownedShips.some(
              (ownedShip) => ownedShip.name === "Golden flying boat"
            )}
            className={`px-4 py-2 text-white rounded ${
              ownedShips.some(
                (ownedShip) => ownedShip.name === "Golden flying boat"
              )
                ? "bg-green-800 cursor-default cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 active:bg-green-700"
            }`}
            onClick={() => {
              onBuy({ name: "Golden flying boat", icon: "", price: 5000 });
            }}
          >
            Build
          </button>
        </div>
      )}
      {balance < 5000 &&
        !ownedShips.some((ship) => ship.name === "Golden flying boat") && (
          <div className="flex items-center justify-between mb-2">
            <Image
              src="pixelart-shadowgoldflyingboat.png"
              width={50}
              height={50}
              alt=""
            ></Image>
            <div className="flex items-start justify-between mb-2 flex-col">
              <div>???</div>
              <div>Price: $5000</div>
            </div>
            <div className="p-2" />
            <button
              disabled
              className="px-4 py-2 text-white rounded bg-green-800 cursor-default cursor-not-allowed"
            >
              Build
            </button>
          </div>
        )}
    </div>
  );
};

export default BuyMenu;
