"use client"; // Indicates that this file should be run on the client side (not during server-side rendering).

import { Button } from "@/components/ui/button"; // Importing a button component.
import { FaEye, FaEyeSlash } from "react-icons/fa6"; // Importing icons for showing/hiding password.
import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon for loading state.
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Importing form components for form control, fields, items, labels, and messages.
import { Input } from "@/components/ui/input"; // Importing an input component.
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importing select components for dropdown selections.
import { useState } from "react"; // Importing useState for managing component state.

interface FormInputProps {
  form?: any; // Optional form object, likely from a form library like React Hook Form.
  name?: string; // The name of the form field.
  type?: string; // The type of input (e.g., text, password).
  placeholder?: string; // Placeholder text for the input field.
  loading?: boolean; // A flag indicating if the form is in a loading state.

  // Button Typings.
  label?: string; // Label text for the button.
  variant?: any; // Variant for button styling.
  disabled?: boolean; // Flag to disable the button.
}

// ButtonInput component for rendering a button with a loading state.
export function ButtonInput({
  loading,
  label,
  variant,
  disabled,
}: FormInputProps) {
  return (
    <Button
      variant={variant || "ticket"} // Sets button variant, defaulting to "ticket".
      disabled={loading || disabled} // Disables button if loading or disabled prop is true.
      className="w-full" // Full width button.
    >
      {loading ? <FaSpinner className="animate-spin" /> : label}
      {/* Displays spinner if loading, otherwise displays the button label. */}
    </Button>
  );
}

// FormInput component for rendering an input field with optional password visibility toggle.
export function FormInput({
  form,
  name,
  type,
  placeholder,
  loading,
}: FormInputProps) {
  const [eyeOpen, setEyeOpen] = useState<boolean>(false); // State to manage password visibility.
  const [inputType, setInputType] = useState<string>(type!); // State to manage the input type (text or password).

  // Function to toggle input type between text and password.
  const toggleInputType = () => {
    setEyeOpen(!eyeOpen); // Toggle eye icon state.
    setInputType((prevType) => (prevType === "password" ? "text" : "password")); // Toggle input type.
  };

  return (
    <FormField
      control={form.control} // Passes form control to FormField.
      name={name!} // Sets the name for the form field.
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              {/* Container for input and visibility toggle. */}
              <Input
                autoCapitalize="none"
                autoComplete={type === "password" ? "new-password" : "off"}
                autoCorrect="off"
                id={name}
                placeholder={placeholder}
                type={inputType}
                {...field}
                onChange={(e: any) => {
                  form.setValue(name, e.target.value); // Updates form value on change.
                }}
                disabled={loading} // Disables input if loading is true.
              />

              {type === "password" && (
                <div
                  className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-softWhite rounded-md select-none"
                  onClick={toggleInputType} // Toggles password visibility on click.
                >
                  {eyeOpen ? <FaEyeSlash /> : <FaEye />}
                  {/* Shows eye icon for toggling password visibility. */}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-deepRed text-xs font-normal" />
          {/* Displays error message if form field has validation errors. */}
        </FormItem>
      )}
    />
  );
}

// SelectInput component for rendering a dropdown select input.
export function SelectInput({ form, name }: FormInputProps) {
  return (
    <FormField
      control={form.control} // Passes form control to FormField.
      name={name!} // Sets the name for the form field.
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            {/* Select component with change handler and default value. */}
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Your Gender for a Personalized Experience" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage className="text-deepRed text-xs font-normal" />
          {/* Displays error message if form field has validation errors. */}
        </FormItem>
      )}
    />
  );
}
