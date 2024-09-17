// Import React and necessary components from Radix UI and react-hook-form libraries.
import * as React from "react"; // Core React library for building UI components.
import * as LabelPrimitive from "@radix-ui/react-label"; // Radix UI's label component.
import { Slot } from "@radix-ui/react-slot"; // Radix UI's Slot component for rendering children.
import {
  Controller,
  ControllerProps, // Type definition for Controller props.
  FieldPath, // Type definition for field path.
  FieldValues, // Type definition for field values.
  FormProvider, // FormProvider component from react-hook-form.
  useFormContext, // Hook to access form context from react-hook-form.
} from "react-hook-form"; // Form management library.

import { cn } from "@/lib/utils"; // Utility function to conditionally combine class names.
import { Label } from "@/components/ui/label"; // Custom label component for consistent styling.

const Form = FormProvider; // Aliasing FormProvider for easier usage.

// Type definition for the context value provided by FormFieldContext.
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName; // Name of the form field.
};

// Creating a context for form field values.
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue // Providing a default empty value.
);

// FormField component is responsible for managing form field state.
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} /> {/* Controller manages the form field state. */}
    </FormFieldContext.Provider>
  );
};

// Custom hook to access form field context and state.
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext); // Accessing FormFieldContext.
  const itemContext = React.useContext(FormItemContext); // Accessing FormItemContext.
  const { getFieldState, formState } = useFormContext(); // Getting form state from react-hook-form.

  const fieldState = getFieldState(fieldContext.name, formState); // Getting state for a specific field.

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>"); // Error handling if context is missing.
  }

  const { id } = itemContext; // Retrieving the ID from FormItemContext.

  // Returning an object with various field state and ID values.
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// Type definition for the context value provided by FormItemContext.
type FormItemContextValue = {
  id: string; // Unique ID for the form item.
};

// Creating a context for form item values.
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue // Providing a default empty value.
);

// FormItem component is a wrapper for form items with context.
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId(); // Generate a unique ID for the form item.

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
      {/* Provide the generated ID to FormItemContext and apply styles. */}
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem"; // Set display name for debugging.

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField(); // Access field state and ID.

  return (
    <Label
      ref={ref}
      className={cn(error && "text-red-500 dark:text-red-900", className)}
      htmlFor={formItemId} // Associate label with the form item.
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel"; // Set display name for debugging.

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField(); // Access field state and IDs.

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}` // If no error, only description is used.
          : `${formDescriptionId} ${formMessageId}` // If there is an error, include message.
      }
      aria-invalid={!!error} // Indicate whether the input is invalid.
      {...props}
    />
  );
});
FormControl.displayName = "FormControl"; // Set display name for debugging.

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField(); // Access description ID.

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription"; // Set display name for debugging.

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField(); // Access error state and message ID.
  const body = error ? String(error?.message) : children; // Determine the message content.

  if (!body) {
    return null; // If no message content, return nothing.
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "text-sm font-medium text-red-500 dark:text-red-900",
        className
      )}
      {...props}
    >
      {body} {/* Render the error message or children. */}
    </p>
  );
});
FormMessage.displayName = "FormMessage"; // Set display name for debugging.

// Exporting all components and hooks for use in other parts of the application.
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
