"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import React, { Fragment, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleFormSchema } from "@/schema/schedule";
import { timeToInt } from "@/lib/utils";
import { DAYS_OF_WEEK_IN_ORDER } from "@/constants/DaysOfWeek";
import { formatTimezoneOffset } from "@/lib/formatters";
import DaysOfWeekScheduler from "../date-time/DaysOfWeekScheduler";

const ScheduleForm = ({ schedule }) => {
  const [successMessage, setSuccessMessage] = useState();
  const form = useForm({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      timezone:
        schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      availabilities: schedule?.availabilities?.toSorted((a, b) => {
        return timeToInt(a.startTime) - timeToInt(b.startTime);
      }),
    },
  });


  async function onSubmit(values) {
    const data = await saveSchedule(values);

    if (data?.error) {
      form.setError("root", {
        message: "There was an error saving your schedule",
      });
    } else {
      setSuccessMessage("Schedule saved!");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        {successMessage && (
          <div className="text-green-500 text-sm">{successMessage}</div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The name you will see when adding a schedule to an event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Intl.supportedValuesOf("timeZone").map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                      {` (${formatTimezoneOffset(timezone)})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription className={"mt-4"}>
          Click the Plus button to add availible times for each day
        </FormDescription>
        <DaysOfWeekScheduler />
        <div className="flex gap-2 justify-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>{" "}
        </div>
      </form>
    </Form>
  );
};

export default ScheduleForm;
