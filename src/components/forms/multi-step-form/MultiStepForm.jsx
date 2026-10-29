"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import StepperIndicator from "./stepper-indicator/StepperIndicator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

const MultiStepForm = ({
  getStepContent,
  submitResults,
  stepperFormKeys,
  numberOfSteps,
  schema,
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [erroredInputName, setErroredInputName] = useState("");
  const methods = useForm({
    mode: "onTouched",
    // resolver: zodResolver(schema),
  });

  const form = methods;

  console.log(activeStep);
  const {
    trigger,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  // focus errored input on submit
  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName]);

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (formData) => {
    console.log({ formData });
    // simulate api call
    try {
      await submitResults(formData);
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

  return (
    <div>
      <StepperIndicator activeStep={activeStep} />
      {errors.root?.formError && (
        <Alert variant="destructive" className="mt-[28px]">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Form Error</AlertTitle>
          <AlertDescription>{errors.root?.formError?.message}</AlertDescription>
        </Alert>
      )}
      <FormProvider {...methods}>
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
            {getStepContent(activeStep)}
            <div className="flex justify-center space-x-[20px]">
              <Button
                type="button"
                className="w-[100px] hover:bg-gray-300 cursor-pointer"
                variant="secondary"
                onClick={handleBack}
                disabled={activeStep === 1}
              >
                Back
              </Button>
              {activeStep === numberOfSteps ? (
                <Button
                  className="w-[100px] hover:bg-emerald-600 cursor-pointer"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-[100px] hover:bg-emerald-600 cursor-pointer"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
