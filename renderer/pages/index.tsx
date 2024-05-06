import React, { useState, createContext, useEffect } from "react";
import BrewMenu from "../components/BrewMenu";
import UserStats from "../components/UserStats";
import HireMenu, { Employee } from "../components/HireMenu";
import BuyMenu, { Ship } from "../components/BuyMenu";
import ShipMenu from "../components/ShipMenu";
import Fact from "../components/Fact";
interface Place {
  name: string;
  coordinates: { x: number; y: number };
}

const places: Place[] = [
  { name: "Hire", coordinates: { x: 165, y: 310 } },
  { name: "Brewery", coordinates: { x: 50, y: 150 } },
  { name: "Buy", coordinates: { x: 350, y: 0 } },
  { name: "Ship", coordinates: { x: 350, y: 200 } },
];

export const BalanceContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([1000, () => null]);

export const EmployeeContext = createContext<
  [Employee[], React.Dispatch<React.SetStateAction<Employee[]>>, number]
>([[], () => null, 0]);

export const ShipContext = createContext<
  [Ship[], React.Dispatch<React.SetStateAction<Ship[]>>]
>([[], () => null]);

export const RumContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([0, () => null]);

const Page = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [balance, setBalance] = useState<number>(100);
  const [rum, setRum] = useState<number>(10);
  const [hiredEmployees, setHiredEmployees] = useState<Employee[]>([]);
  const [employeePrice, setEmployeePrice] = useState<number>(0);
  const [ownedShips, setOwnedShips] = useState<Ship[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [factIndex, setFactIndex] = useState<number>(-1);

  useEffect(() => {
    if (balance <= 0) {
      alert("You went broke and lost!");
      window.location.reload();
    }
  }, [balance]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (factIndex < 14 && started) {
        setFactIndex((prevIndex) => prevIndex + 1);
        setSelectedPlace({ name: "Fact", coordinates: { x: 0, y: 0 } });
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [factIndex, started]);

  const handleClick = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleClosePopup = () => {
    setSelectedPlace(null);
  };

  const handleBuyRum = (buyPrice) => {
    setRum((prevRum) => prevRum + 10);
    setBalance((prevBalance) => prevBalance - buyPrice);
  };

  const handleHire = (employee: Employee) => {
    setBalance((prevBalance) => prevBalance - employee.price);
    setHiredEmployees([...hiredEmployees, employee]);
    setEmployeePrice((prevPrice) => prevPrice + employee.price);
  };

  const handleBuy = (ship: Ship) => {
    setOwnedShips([...ownedShips, ship]);
    setBalance((prevBalance) => prevBalance - ship.price);
  };

  const Popup = ({ place }: { place: Place }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        {place.name === "Brewery" ? (
          <BrewMenu onBuyRum={handleBuyRum} />
        ) : place.name === "Hire" ? (
          <HireMenu onHire={handleHire} />
        ) : place.name === "Buy" ? (
          <BuyMenu onBuy={handleBuy} />
        ) : place.name === "Ship" ? (
          <ShipMenu />
        ) : place.name === "Fact" ? (
          <Fact index={factIndex} />
        ) : null}
        <button
          className="absolute top-0 right-0 p-2 text-gray-500"
          onClick={handleClosePopup}
        >
          X
        </button>
      </div>
    );
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setSelectedPlace(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div>
      {!started && (
        <div
          className="flex fixed top-0 left-0 w-full h-full cursor-pointer bg-black"
          style={{
            backgroundImage: "url('pixelart-tavern.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          onClick={() => setStarted(true)}
        ></div>
      )}
      {started && (
        <BalanceContext.Provider value={[balance, setBalance]}>
          <EmployeeContext.Provider
            value={[hiredEmployees, setHiredEmployees, employeePrice]}
          >
            <ShipContext.Provider value={[ownedShips, setOwnedShips]}>
              <RumContext.Provider value={[rum, setRum]}>
                <div className="w-512 h-512 max-w-full max-h-full">
                  <div
                    className="absolute w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('pixelart-map.png')` }}
                  ></div>

                  {places.map((place) => (
                    <div
                      key={place.name}
                      className="absolute w-20 h-20 rounded-full cursor-pointer"
                      style={{
                        left: place.coordinates.x,
                        top: place.coordinates.y,
                      }}
                      onClick={() => handleClick(place)}
                    />
                  ))}

                  {selectedPlace && <Popup place={selectedPlace} />}

                  <UserStats />
                </div>
              </RumContext.Provider>
            </ShipContext.Provider>
          </EmployeeContext.Provider>
        </BalanceContext.Provider>
      )}
    </div>
  );
};

export default Page;
