import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputTextFieldProps extends React.ComponentProps<"input"> {
  className?: string;
}

export default function InputTextField({
  className,
  ...props
}: InputTextFieldProps) {
  return (
    <Input
      className={cn(
        "text-gray-800 font-montserrat placeholder:text-gray-400 placeholder:italic placeholder:font-montserrat",
        "border-gray-300 focus-visible:border-gray-400 focus-visible:ring-gray-400/30",
        "h-10 px-4 text-base rounded-none",
        "shadow-sm",
        className
      )}
      style={{ backgroundColor: "#E7EAEF" }}
      {...props}
    />
  );
}
