import React, { useState } from "react";

const DaySelector = ({ dayOfWeek }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };
  return (
    <div className=" rounded-full" >
      <div
       className="h-15 w-15 rounded-full" 
        key={dayOfWeek}
        onClick={() => toggleDaySelection(dayOfWeek)}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: selectedDays.includes(dayOfWeek) ? "#e0f7fa" : "white",
        }}
      >
        <div className="">{dayOfWeek}</div>
        {selectedDays.includes(dayOfWeek) && (
          <div style={{ marginTop: "5px", fontSize: "1.2em" }}>✓</div>
        )}
      </div>
    </div>
  );
};

export default DaySelector;
