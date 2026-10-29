"use client";
import DateInput from "@/components/date-time/DateInput";
import DaySelector from "@/components/date-time/DaySelector";
import DaysOfWeekScheduler from "@/components/date-time/DaysOfWeekScheduler";
import SeperatedTimePicker from "@/components/date-time/SeperatedTimePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";

const AddDatesTimesDialog = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState("12:00 AM");

  const onStartDateChange = (date) => {
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    console.log("Selected time:", time);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"hover:bg-emerald-600 cursor-pointer"}>
          <Plus />
          Add Dates
        </Button>
      </DialogTrigger>
      <DialogContent className={"!max-w-4xl"}>
        <DialogHeader>
          <DialogTitle>Add Date & Time Slots</DialogTitle>
          <DialogDescription>
            This is the first dialog, containing some basic information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2 py-4">
          <div className="flex justify-between items-end">Day of Event:</div>
          <DateInput label={"Start Date"} onChange={onStartDateChange} />
          <DateInput label={"End Date"} onChange={onEndDateChange} />
        </div>
        <div>
          <DaysOfWeekScheduler /*onSubFormSubmit={handleSubFormSubmit}*/ />
        </div>
        {/* <div className="border grid grid-cols-3 gap-2">
          <div className="border2 flex justify-start items-center" role="day-selector" id="day-selector">
            Include These Days:
          </div>
          <div className="border col-span-2 flex gap-2 justify-start items-center">
            {daysOfWeek.map((day) => (
              <DaySelector key={day} dayOfWeek={day} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="border flex justify-start items-center">Time Range:</div>
          <div className="col-span-2 flex gap-2">
          <SeperatedTimePicker
            onTimeChange={handleTimeChange}
            className={"justify-end"}
          />
          <div className="border flex justify-center items-center w-fit">to</div>
          <SeperatedTimePicker onTimeChange={handleTimeChange} />
          </div>
        </div> */}
        <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDatesTimesDialog;
