import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  const baseStyles =
    "block w-full h-[45px] font-[jannaltregular] font-light text-[14px] focus:outline-none text-[#484E56] bg-#F3F6F7 focus:border-primary px-4 py-2 rounded-md border border-gray-300 cursor-pointer";
  const readOnlyStyles = props.readOnly
    ? "bg-transparent text-gray-700 cursor-no-drop font-[jannaltregular] font-light"
    : "";

  return (
    <input
      className={`${baseStyles}  ${readOnlyStyles} ${className} no-spinner`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
