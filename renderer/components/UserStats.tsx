import React, { useContext } from "react";
import { BalanceContext, EmployeeContext, RumContext } from "../pages/index";

const UserStats = () => {
  const [balance] = useContext(BalanceContext);
  const [hiredEmployees] = useContext(EmployeeContext);
  const [rum] = useContext(RumContext);

  const calculateAverageLoyalty = (): number => {
    if (hiredEmployees.length === 0) return 0;
    const totalLoyalty = hiredEmployees.reduce(
      (acc, employee) => acc + employee.loyalty,
      0
    );
    return totalLoyalty / hiredEmployees.length;
  };

  return (
    <div
      className="fixed bottom-0 right-0 p-4 bg-gray-800 items-end flex flex-col rounded-tl-lg"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
    >
      <div>Alcohol: {rum.toLocaleString()}</div>
      <div>Employees: {hiredEmployees.length.toLocaleString()}</div>
      <div>Balance: ${balance.toLocaleString()}</div>
      <div>Avg. Loyalty: {Math.round(calculateAverageLoyalty())}</div>
    </div>
  );
};

export default UserStats;
