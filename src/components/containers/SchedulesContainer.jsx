"use client";

import React, { useState } from "react";
import ScheduleForm from "../forms/ScheduleForm";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { se } from "date-fns/locale";

const SchedulesContainer = () => {
  const [schedule, setSchedule] = useState({});
  const [showSchedule, setShowSchedule] = useState(false);
  const schedules = []; // Get all schedules from DB

  const onSetSchedule = (schedule) => {
    setSchedule(schedule);
    setShowSchedule(true);
  };

  const onClickAddSchedule = () => {
    setShowSchedule(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
          <div
            className="mb-4"
          >
            Select a schedule to use or edit, or type a new schedule name, add available times, then click Save to add a new schedule
          </div>
        <Select>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select a schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Schedules</SelectLabel>
              {schedules.map((schedule) => {
                return (
                  <SelectItem
                    key={schedule.id}
                    value={schedule.id}
                    onClick={() => onSetSchedule(schedule)}
                  >
                    {schedule.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <Button
          type="button"
          className="size-6 p-1"
          variant="outline"
          onClick={() => onClickAddSchedule()}
        >
          <Plus />
        </Button> */}
      </div>
      <div className={"mt-2"}>
        <ScheduleForm schedule={schedule ? schedule : {}} />
      </div>
    </div>
  );
};

export default SchedulesContainer;
