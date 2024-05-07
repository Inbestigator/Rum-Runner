import React, { useState } from "react";

export interface Employee {
  name: string;
  loyalty: number;
  price: number;
}

const generateRandomEmployee = (): Employee => {
  const maleNames = [
    "John",
    "William",
    "James",
    "Robert",
    "Charles",
    "George",
    "Joseph",
    "Edward",
    "Frank",
    "Thomas",
  ];
  const femaleNames = [
    "Mary",
    "Helen",
    "Dorothy",
    "Margaret",
    "Ruth",
    "Mildred",
    "Anna",
    "Elizabeth",
    "Frances",
    "Marie",
  ];
  const surnames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
  ];

  function getRandomName() {
    const isMale = Math.random() < 0.5;
    const randomFirstName = isMale
      ? maleNames[Math.floor(Math.random() * maleNames.length)]
      : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    return randomFirstName + " " + randomSurname;
  }

  const randomName = getRandomName();
  const randomLoyalty = Math.floor(Math.random() * 100) + 1;

  function calculatePrice(loyalty: number): number {
    const basePrice = Math.floor(Math.random() * 16) + 5;
    const loyaltyInfluence = loyalty / 100;
    const price = basePrice * (1 + loyaltyInfluence);
    return Math.round(price);
  }

  const randomPrice: number = calculatePrice(randomLoyalty);
  return { name: randomName, loyalty: randomLoyalty, price: randomPrice };
};

const HireMenu = ({ onHire }: { onHire: (employee: Employee) => void }) => {
  const [employees] = useState<Array<Employee>>(
    Array.from({ length: 3 }, () => generateRandomEmployee())
  );

  return (
    <div
      className="bg-white p-8 rounded-lg cursor-default"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h3 className="text-xl font-bold mb-4">Hire</h3>
      {employees.map((employee, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-2 text-start"
        >
          <div className="flex items-start justify-between mb-2 flex-col">
            <div>{employee.name}</div>
            <div>Loyalty: {employee.loyalty}</div>
            <div>Price: {employee.price}</div>
          </div>
          <div className="p-2" />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700"
            onClick={() => onHire(employee)}
          >
            Hire
          </button>
        </div>
      ))}
    </div>
  );
};

export default HireMenu;
