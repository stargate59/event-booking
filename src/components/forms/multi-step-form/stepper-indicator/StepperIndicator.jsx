import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Check } from "lucide-react";
import React, { Fragment } from "react";

const StepperIndicator = ({ activeStep, maxSteps = 5 }) => {
  console.log(activeStep);
  const stepArray = [...Array(maxSteps + 1).keys()].slice(1);

  console.log(stepArray);
  return (
    <div className="flex w-full justify-center items-center">
      {stepArray?.map(
        (step) => (
          console.log(step),
          (
            <Fragment key={step}>
              <div
                className={clsx(
                  "w-[40px] h-[40px] flex justify-center items-center m-[5px] border-[2px] rounded-full",
                  step < activeStep && "bg-primary text-white",
                  step === activeStep && "border-primary text-primary"
                )}
              >
                {step >= activeStep ? step : <Check className="h-5 w-5" />}
              </div>
              {step !== 5 && (
                <div className="w-[100px] h-[3px] bg-primary">
                  <Separator
                    orientation="horizontal"
                    className={clsx(step <= activeStep - 1 && "bg-primary")}
                  />
                </div>
              )}
            </Fragment>
          )
        )
      )}
    </div>
  );
};
// <Separator
//   orientation="horizontal"
//   className={clsx(
//     "w-[100px] h-[2px]",
//     step <= activeStep - 1 && "bg-primary"
//   )}
// />
export default StepperIndicator;
