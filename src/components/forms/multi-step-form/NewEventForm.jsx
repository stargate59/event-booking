import DateInput from "@/components/date-time/DateInput";
import DaysOfWeekScheduler from "@/components/date-time/DaysOfWeekScheduler";
import {
  FormFieldInput,
  FormFieldSwitch,
  FormFieldTextarea,
} from "@/components/my-ui/form-field/form-field-base";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const NewEventForm = () => {
  const methods = useForm({
    mode: "onTouched",
    // resolver
  });

  const onSubmit = async (formData) => {
    console.log({ formData });
    // simulate api call
    try {
      //   await submitResults(formData);
    } catch ({ message: errorMessage, errorKey }) {
      console.log(errorMessage);
      if (
        errorKey &&
        Object.values(stepperFormKeys)
          .flatMap((fieldNames) => fieldNames)
          .includes(errorKey)
      ) {
        let erroredStep;
        // get the step number based on input name
        for (const [key, value] of Object.entries(stepperFormKeys)) {
          if (value.includes(errorKey)) {
            erroredStep = Number(key);
          }
        }
        // set active step and error
        setActiveStep(erroredStep);
        setError(errorKey, {
          message: errorMessage,
        });
        setErroredInputName(errorKey);
      } else {
        setError("root.formError", {
          message: errorMessage,
        });
      }
    }
  };

  const onStartDateChange = (date) => {
    // setStartDate(date);
  };

  const onEndDateChange = (date) => {
    // setEndDate(date);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        {methods.formState.errors.root && (
          <div className="text-destructive text-sm">
            {methods.formState.errors.root.message}
          </div>
        )}
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className={"cursor-pointer, text-emerald-500"}>
              Event Information
            </AccordionTrigger>
            <AccordionContent>
              <FormFieldInput
                classNameLabel="mt-6"
                ontrol={methods.control}
                name="name"
                label="Event Name"
              />
              <FormFieldInput
                description="In minutes"
                classNameLabel="mt-6"
                control={methods.control}
                type="number"
                name="durationInMinutes"
                label="Duration"
              />
              <FormFieldTextarea
                description="Optional description of the event"
                classNameLabel="mt-6"
                control={methods.control}
                name="description"
                label="Description"
              />
              <FormFieldSwitch
                description="Inactive events will not be visible for users to book"
                classNameLabel="mt-6"
                classNameControl="mt-6"
                control={methods.control}
                name="isActive"
                label="Active"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className={"cursor-pointer, text-emerald-500"}>
              Event Date/Times/Slots
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2 py-4">
                <div className="flex justify-between items-center">
                  Day of Event:
                </div>
                <DateInput
                  label={"Start Date"}
                  name={"startDate"}
                  description="The start date of the event"
                  onChange={onStartDateChange}
                />
                <DateInput
                  label={"End Date"}
                  name={"endDate"}
                  description="The end date of the event"
                  onChange={onEndDateChange}
                />
              </div>
              <div>
                <DaysOfWeekScheduler /*onSubFormSubmit={handleSubFormSubmit}*/
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className={"cursor-pointer, text-emerald-500"}>
              Setttings
            </AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className={"cursor-pointer, text-emerald-500"}>
              View
            </AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </FormProvider>
  );
};

export default NewEventForm;
