import React, { useContext, useState } from "react";
import {
  BalanceContext,
  EmployeeContext,
  RumContext,
  ShipContext,
} from "../pages";

const ShipMenu = () => {
  const [ships] = useContext(ShipContext);
  const [balance, setBalance] = useContext(BalanceContext);
  const [rumOwned, setRumOwned] = useContext(RumContext);
  const [hiredEmployees, setHiredEmployees, employeePrice] =
    useContext(EmployeeContext);
  const [selectedShip, setSelectedShip] = useState(null);
  const [rumQuantity, setRumQuantity] = useState(0);
  const [maxRumQuantity, setMaxRumQuantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(
    Math.floor(Math.random() * (36 - 25) + 25)
  );
  const [employeesNeeded, setEmployeesNeeded] = useState(0);
  const [costToSail, setCostToSail] = useState(0);

  const calculateAverageLoyalty = (): number => {
    if (hiredEmployees.length === 0) return 0;
    const totalLoyalty = hiredEmployees.reduce(
      (acc, employee) => acc + employee.loyalty,
      0
    );
    return totalLoyalty / hiredEmployees.length;
  };

  const handleShipChange = (event) => {
    const selectedShipName = event.target.value;
    setSelectedShip(selectedShipName);

    const ship = ships.find((ship) => ship.name === selectedShipName);
    if (ship) {
      let employeesNeeded = 0;
      switch (selectedShipName) {
        case "Rowboat":
          setMaxRumQuantity(20);
          setEmployeesNeeded(2);
          employeesNeeded = 2;
          break;
        case "Speedboat":
          setMaxRumQuantity(50);
          setEmployeesNeeded(5);
          employeesNeeded = 5;
          break;
        case "Schooner":
          setMaxRumQuantity(100);
          setEmployeesNeeded(10);
          employeesNeeded = 20;
          break;
        case "Golden flying boat":
          setMaxRumQuantity(1000);
          setEmployeesNeeded(100);
          employeesNeeded = 20;
          break;
        default:
          setMaxRumQuantity(0);
          setEmployeesNeeded(0);
          employeesNeeded = 0;
          break;
      }
      let cost = (employeePrice / hiredEmployees.length) * employeesNeeded;
      setCostToSail(!Number.isNaN(cost) ? Math.round(cost) : 0);
    }
  };

  const handleRumChange = (event) => {
    if (event.target.value > rumOwned) {
      setRumQuantity(rumOwned);
      return;
    } else if (event.target.value < 0) {
      setRumQuantity(0);
      return;
    }
    setRumQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (costToSail === 0) {
      alert("Trying to swim your goods there is not a very good idea...");
      window.location.reload();
      return;
    }
    if (employeesNeeded > hiredEmployees.length) {
      alert("You didn't have enough employees, so you got lost at sea!");
      window.location.reload();
      return;
    }
    if (balance < costToSail) {
      setBalance((prevBalance) => prevBalance - costToSail);
      return;
    }
    if (Math.floor(Math.random() * 60) + 1 > calculateAverageLoyalty()) {
      alert("An employee ratted you out and the police caught you!");
      window.location.reload();
    }

    setBalance((prevBalance) => prevBalance + sellPrice * rumQuantity);
    setRumOwned((prevOwned) => prevOwned - rumQuantity);
  };

  return (
    <div
      className="bg-white p-8 rounded-lg cursor-default"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h3 className="text-xl font-bold mb-4">Sell</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ship" className="block text-sm font-medium">
            Select ship:
          </label>
          <select
            id="ship"
            name="ship"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            value={selectedShip}
            defaultValue=""
            onChange={handleShipChange}
          >
            <option value="" disabled>
              Select a ship
            </option>
            {ships.map((ship) => (
              <option key={ship.name} value={ship.name}>
                {ship.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="rum" className="block text-sm font-medium">
            Amount of alcohol:
          </label>
          <input
            type="number"
            id="rum"
            name="rum"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            value={rumQuantity}
            max={maxRumQuantity}
            onChange={handleRumChange}
          />
        </div>
        <p>Sell price: ${sellPrice}</p>
        <p>Employees needed: {employeesNeeded}</p>
        <p>Employee rates: ${costToSail}</p>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 active:bg-green-700"
        >
          Start Mission
        </button>
      </form>
    </div>
  );
};

export default ShipMenu;
