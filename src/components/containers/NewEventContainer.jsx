"use client";
import MultiStepForm from "@/components/forms/multi-step-form/MultiStepForm";
import React from "react";
import { toast } from "sonner";
import { STEPPER_FORM_KEYS } from "@/constants/StepperFormKeys";
import SlotsForm from "../new-events/SlotsForm";
import SettingsForm from "../new-events/SettingsForm";
import ViewForm from "../new-events/ViewForm";
import PublishForm from "../new-events/PublishForm";
import EventForm from "../new-events/EventForm";
import NewEventForm from "../forms/multi-step-form/NewEventForm";

function getStepContent(step) {
  switch (step) {
    case 1:
      return <EventForm />;
    case 2:
      return <SlotsForm />;
    case 3:
      return <SettingsForm />;
    case 4:
      return <ViewForm />;
    case 5:
      return <PublishForm />;
    default:
      return "Unknown step";
  }
}

const NewEventContainer = () => {
  const onSubmit = async (formData) => {
    toast.success("Event created successfully");
  };

  return (
    <NewEventForm />
  );
};

export default NewEventContainer;
