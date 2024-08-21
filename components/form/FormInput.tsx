import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FormInputProps {
  form?: any;
  name?: string;
  type?: string;
  placeholder?: string;
  loading?: boolean;

  // Button Typings.
  label?: string;
  variant?: any;
}

export function FormInput({
  form,
  name,
  type,
  placeholder,
  loading,
}: FormInputProps) {
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type!);

  const toggleInputType = () => {
    setEyeOpen(!eyeOpen);
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                autoCapitalize="none"
                autoComplete={type === "password" ? "new-password" : "off"}
                autoCorrect="off"
                id={name}
                placeholder={placeholder}
                type={inputType}
                {...field}
                onChange={(e: any) => {
                  form.setValue(name, e.target.value);
                }}
                disabled={loading}
              />

              {type === "password" && (
                <div
                  className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-softWhite rounded-md select-none"
                  onClick={toggleInputType}
                >
                  {eyeOpen ? <FaEyeSlash /> : <FaEye />}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-deepRed text-xs font-normal" />
        </FormItem>
      )}
    />
  );
}

export function ButtonInput({ loading, label, variant }: FormInputProps) {
  return (
    <Button
      variant={variant || "ticketa"}
      disabled={loading}
      className="w-full"
    >
      {loading ? <FaSpinner className=" animate-spin" /> : label}
    </Button>
  );
}
