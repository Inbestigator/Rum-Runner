import React, { useState } from "react";

const BrewMenu = ({ onBuyRum }: { onBuyRum: (buyPrice: number) => void }) => {
  const [buyPrice, setBuyPrice] = useState(
    Math.floor(Math.random() * (33 - 27) + 27)
  );

  return (
    <div
      className="bg-white p-8 rounded-lg"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
    >
      <h3 className="text-xl font-bold mb-4">Buy alcohol</h3>
      <p>10 bottles for ${buyPrice}</p>
      <button
        className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => onBuyRum(buyPrice)}
      >
        Buy
      </button>
    </div>
  );
};

export default BrewMenu;
