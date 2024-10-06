"use client";

import { Fragment } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { defineStepper } from "@stepperize/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { paymentSchema, shippingSchema } from "@/schemas/e-commerce";

import { CompleteComponent } from "./complete-component";
import { PaymentComponent } from "./payment-component";
import { ShippingComponent } from "./shipping-component";

const { useStepper, steps } = defineStepper(
  { id: "shipping", label: "Shipping", schema: shippingSchema },
  { id: "payment", label: "Payment", schema: paymentSchema },
  { id: "complete", label: "Complete", schema: z.object({}) }
);

export const StepperForm = () => {
  const stepper = useStepper();

  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(stepper.current.schema),
  });

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    console.log(`Form values for step ${stepper.current.id}:`, values);
    if (stepper.isLast) {
      stepper.reset();
    } else {
      stepper.next();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[450px] space-y-6 rounded-lg border p-6"
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-medium">Checkout</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {stepper.current.index + 1} of {steps.length}
            </span>
          </div>
        </div>
        <nav aria-label="Checkout Steps" className="group my-4">
          <ol
            className="flex items-center justify-between gap-2"
            // aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <Fragment key={step.id}>
                <li className="flex flex-shrink-0 items-center gap-4">
                  <Button
                    type="button"
                    role="tab"
                    variant={
                      index <= stepper.current.index ? "default" : "secondary"
                    }
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    onClick={() => stepper.goTo(step.id)}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.label}</span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 ${
                      index < stepper.current.index ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </ol>
        </nav>
        <div className="space-y-4">
          {stepper.switch({
            shipping: () => <ShippingComponent />,
            payment: () => <PaymentComponent />,
            complete: () => <CompleteComponent />,
          })}
          {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button type="submit">
                {stepper.isLast ? "Complete" : "Next"}
              </Button>
            </div>
          ) : (
            <Button onClick={stepper.reset}>Reset</Button>
          )}
        </div>
      </form>
    </Form>
  );
};
