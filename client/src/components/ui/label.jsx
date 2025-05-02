import React from "react";

export const Label = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <label
      className={`block text-black text-[16px] ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Label.displayName = "Label";
