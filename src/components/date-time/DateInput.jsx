"use client";
import React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Field, FieldDescription, FieldLabel } from "../ui/field";

function formatDate(date) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

const DateInput = ({ label, name, description }) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState();
  const [month, setMonth] = React.useState();
  const [value, setValue] = React.useState("");

  const form = useFormContext();
  const { register } = form;

  return (
    <div className="flex flex-col gap-3">
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
              <div className="relative flex gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant="outline"
                      className="w-48 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        setDate(date);
                        setValue(formatDate(date));
                        setOpen(false);
                        console.log(formatDate(date));
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            <FieldDescription>
              {description}
            </FieldDescription>
            <FormMessage />
          </Field>
        )}
      />
    </div>
  );
};

export default DateInput;
