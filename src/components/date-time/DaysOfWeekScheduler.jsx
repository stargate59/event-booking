import React, { Fragment } from "react";
import { DAYS_OF_WEEK_IN_ORDER } from "@/constants/DaysOfWeek";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const DaysOfWeekScheduler = () => {
  const form = useFormContext();

  const {
    append: addAvailability,
    remove: removeAvailability,
    fields: availabilityFields,
  } = useFieldArray({ name: "availabilities", control: form.control });

  const groupedAvailabilityFields = Object.groupBy(
    availabilityFields.map((field, index) => ({ ...field, index })),
    (availability) => availability.dayOfWeek,
  );
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4">
      {DAYS_OF_WEEK_IN_ORDER.map((dayOfWeek) => (
        <Fragment key={dayOfWeek}>
          <div className="p-4">{dayOfWeek.substring(0, 3)}</div>

          <div className="p-4">
            <div>
              <Button
                type="button"
                className="size-6 p-1"
                variant="outline"
                onClick={() => {
                  addAvailability({
                    dayOfWeek,
                    startTime: "9:00",
                    endTime: "17:00",
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
            <div>
              {groupedAvailabilityFields[dayOfWeek]?.map(
                (field, labelIndex) => (
                  <div className="flex flex-col gap-1" key={field.id}>
                    <div className="flex gap-2 items-center">
                      <FormField
                        control={form.control}
                        name={`availabilities.${field.index}.startTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-24"
                                aria-label={`${dayOfWeek} Start Time ${
                                  labelIndex + 1
                                }`}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      -
                      <FormField
                        control={form.control}
                        name={`availabilities.${field.index}.endTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-24"
                                aria-label={`${dayOfWeek} End Time ${
                                  labelIndex + 1
                                }`}
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        className="size-6 p-1"
                        variant="destructiveGhost"
                        onClick={() => removeAvailability(field.index)}
                      >
                      </Button>
                    </div>
                    <FormMessage>
                      {
                        form.formState.errors.availabilities?.at?.(field.index)
                          ?.root?.message
                      }
                    </FormMessage>
                    <FormMessage>
                      {
                        form.formState.errors.availabilities?.at?.(field.index)
                          ?.startTime?.message
                      }
                    </FormMessage>
                    <FormMessage>
                      {
                        form.formState.errors.availabilities?.at?.(field.index)
                          ?.endTime?.message
                      }
                    </FormMessage>
                  </div>
                ),
              )}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default DaysOfWeekScheduler;
