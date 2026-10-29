import clsx from "clsx";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SeperatedTimePicker = ({ onTimeChange, className }) => {
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [meridian, setMeridian] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  // Generate options for minutes (0-59)
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  // Handler to update the state and call the parent's change function
  const handleHourChange = (value) => {
    console.log(value);
    // Update local state
    setHour(value);

    // Call the parent handler with the full time string
    onTimeChange(`${value}:${minute} ${meridian}`);
  };

  const handleMinuteChange = (value) => {
    console.log(value);
    // Update local state
    setMinute(value);

    // Call the parent handler with the full time string
    onTimeChange(`${hour}:${value} ${meridian}`);
  };

  const handleMeridianChange = (value) => {
    console.log(value);
    // Update local state
    setMeridian(value);

    // Call the parent handler with the full time string
    onTimeChange(`${hour}:${minute} ${value}`);
  };

  return (
    <div
      className={clsx("time-picker border flex-cols-3 flex gap-2", className)}
    >
      <Select onValueChange={handleHourChange} value={hour}>
        <SelectTrigger className="">
          <SelectValue placeholder={hour} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {hours.map((h) => {
              return (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className="flex items-center">:</span>
      <Select onValueChange={handleMinuteChange} value={minute}>
        <SelectTrigger className="">
          <SelectValue placeholder={minute} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {minutes.map((m) => {
              return (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={handleMeridianChange} value={meridian}>
        <SelectTrigger className="">
          <SelectValue placeholder={meridian} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={"am"} value={"AM"}>
              {"AM"}
            </SelectItem>
            <SelectItem key={"pm"} value={"PM"}>
              {"PM"}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SeperatedTimePicker;
