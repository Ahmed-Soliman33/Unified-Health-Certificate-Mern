import React from "react";

export const Select = React.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    const baseStyles =
      "block w-full font-[jannaltregular] font-light focus:outline-none text-[#484E56] bg-#F3F6F7 focus:border-primary px-4 py-2 rounded-md border border-gray-300 cursor-pointer";
    const disabledStyles = props.disabled
      ? "bg-transparent text-gray-700 cursor-no-drop font-light"
      : "";

    return (
      <select
        className={`${baseStyles} ${disabledStyles} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
