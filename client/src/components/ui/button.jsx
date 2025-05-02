export const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-bold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-green-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className} ${
    disabled ? "cursor-not-allowed opacity-70" : ""
  }`;

  return (
    <button type={type} className={styles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
