"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddDatesTimesDialog from "./dialogs/AddDatesTimesDialog";

const SlotsForm = () => {
  return (
    <div className="flex flex-col w-full gap-2 items-center justify-center mt-4 mb-4">
      <h1>Add Date/Time and Slots</h1>
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex justify-end items-center gap-2">
          <AddDatesTimesDialog />
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button className={"hover:bg-emerald-600 cursor-pointer"}>
            <Plus />
            Add Time Slots
          </Button>
        </div>
        <div className="flex justify-between items-center gap-2">
          Dates/Times
        </div>
        <div className="flex justify-between items-center gap-2">
          Available Slot
        </div>
        <div className="flex justify-between items-center gap-2">
          <Input className={"hover:bg-emerald-600 cursor-pointer"}></Input>
          <Input className={"hover:bg-emerald-600 cursor-pointer"}></Input>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Input className={"hover:bg-emerald-600 cursor-pointer"}></Input>
        </div>
      </div>
    </div>
  );
};

export default SlotsForm;
