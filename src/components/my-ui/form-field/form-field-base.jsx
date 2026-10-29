import { Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

function FormFieldBase({
  children,
  control,
  label,
  name,
  description,
  controlFirst,
  horizontal,
  type,
  classNameControl,
  classNameLabel,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel className={classNameLabel} htmlFor={field.name}>
              {label}
            </FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </>
        );
        const control = children({
          ...field,
          id: field.name,
          type: type,
          className: classNameControl,
          "aria-invalid": fieldState.invalid,
        });
        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        );

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? "horizontal" : undefined}
          >
            {controlFirst ? (
              <>
                {control}
                <FieldContent>
                  {labelElement}
                  {errorElem}
                </FieldContent>
              </>
            ) : (
              <>
                <FieldContent>{labelElement}</FieldContent>
                {control}
                {errorElem}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}

export const FormFieldInput = (props) => {
  return (
    <FormFieldBase {...props}>{(field) => <Input {...field} />}</FormFieldBase>
  );
};

export const FormFieldTextarea = (props) => {
  return (
    <FormFieldBase {...props}>
      {(field) => <Textarea {...field} />}
    </FormFieldBase>
  );
};

export const FormFieldSelect = ({ children, ...props }) => {
  return (
    <FormFieldBase {...props}>
      {({ onChange, onBlur, ...field }) => (
        <Select {...field} onValueChange={onChange}>
          <SelectTrigger
            aria-invalid={field["aria-invalid"]}
            id={field.id}
            onBlur={onBlur}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormFieldBase>
  );
};

export const FormFieldCheckbox = (props) => {
  return (
    <FormFieldBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormFieldBase>
  );
};

export const FormFieldSwitch = (props) => {
  return (
    <FormFieldBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Switch {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormFieldBase>
  );
};

export const FormFieldDateInput = (props) => {
  return (
    <FormFieldBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Switch {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormFieldBase>
  );
};
