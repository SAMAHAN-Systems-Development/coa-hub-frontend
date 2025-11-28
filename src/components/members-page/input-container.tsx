import React from "react";

interface InputContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function InputContainer({
  title,
  children,
  className = "",
}: InputContainerProps) {
  return (
    <div
      className={`w-full rounded-xl p-6 border border-gray-800 shadow-xl ${className}`}
      style={{
        background:
          "linear-gradient(90deg, #485159 0%, #3a4148 50%, #32383e 100%)",
      }}
    >
      <h3
        className="font-semibold font-montserrat text-xl md:text-2xl mb-2"
        style={{ color: "#E7EAEF" }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
