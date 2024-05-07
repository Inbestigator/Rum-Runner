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

const tutorials: Place[] = [
  {
    name: "First, you should build a ship. Currently you can only afford the rowboat.",
    coordinates: { x: 100, y: 100 },
  },
  {
    name: "Next, hire some employees. The rowboat only needs 2 employees. Try to get a high loyalty for a low price. You can close and reopen the menu to reroll options.",
    coordinates: { x: 10, y: 380 },
  },
  { name: "You can now sell your alcohol!", coordinates: { x: 260, y: 290 } },
  {
    name: "Finish the loop by buying some more alcohol.",
    coordinates: { x: 10, y: 250 },
  },
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
  const [tutIndex, setTutIndex] = useState<Place[]>(tutorials);

  useEffect(() => {
    if (balance <= 0) {
      alert("You went broke and lost!");
      window.location.reload();
    }
  }, [balance]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (factIndex < 14 && started && !selectedPlace) {
        setFactIndex((prevIndex) => prevIndex + 1);
        setSelectedPlace({ name: "Fact", coordinates: { x: 0, y: 0 } });
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [factIndex, started, selectedPlace]);

  const handleClick = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleClosePopup = () => {
    setSelectedPlace(null);
  };

  const handleBuyRum = (buyPrice: number) => {
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
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 cursor-pointer"
        onClick={handleClosePopup}
      >
        {place.name === "Brewery" ? (
          <BrewMenu onBuyRum={handleBuyRum} />
        ) : place.name === "Hire" ? (
          <HireMenu onHire={handleHire} />
        ) : place.name === "Buy" ? (
          <BuyMenu onBuy={handleBuy} />
        ) : place.name === "Ship" ? (
          <ShipMenu />
        ) : place.name === "Fact" ? (
          <Fact index={factIndex} close={handleClosePopup} />
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
                  {tutIndex.length > 0 && (
                    <div
                      className="absolute max-w-[400px] rounded-lg p-3 cursor-pointer z-10"
                      style={{
                        left: tutIndex[0].coordinates.x,
                        top: tutIndex[0].coordinates.y,
                        backgroundImage: `url('pixelart-wood.png')`,
                      }}
                      onClick={() =>
                        setTutIndex((prevTutIndex) => {
                          const newArray = [...prevTutIndex];
                          newArray.shift();
                          return newArray;
                        })
                      }
                    >
                      {tutIndex[0].name}
                    </div>
                  )}
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
