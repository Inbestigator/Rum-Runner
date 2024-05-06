import React, { useContext } from "react";
import { BalanceContext, EmployeeContext, RumContext } from "../pages/index";

const UserStats = () => {
  const [balance] = useContext(BalanceContext);
  const [hiredEmployees] = useContext(EmployeeContext);
  const [rum] = useContext(RumContext);

  return (
    <div
      className="fixed bottom-0 right-0 p-4 bg-gray-800 items-end flex flex-col rounded-tl-lg"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
    >
      <div>Alcohol: {rum}</div>
      <div>Employees: {hiredEmployees.length}</div>
      <div>Balance: ${balance}</div>
    </div>
  );
};

export default UserStats;
