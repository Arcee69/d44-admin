import React from "react";

const ButtonComponent = ({
  backgroundColor,
  disabled,
  isLoading,
  size,
  textColor,
  title,
  onClick,
  className,
  style,
  type = "button",
}) => {
  return (
    <button
      className={`
            flex flex-row items-center justify-center p-4 rounded font-medium leading-6 w-full ${className}
            ${backgroundColor || "bg-[#000]"} 
            ${disabled ? "opacity-[0.3]" : "opacity-100"}
            ${isLoading ? "opacity-[0.3]" : "opacity-100"}
            ${
              size === "medium"
                ? "text-[48px]"
                : size === "small"
                ? "text-[36px]"
                : "56px"
            }
            ${textColor || "text-[#FFFFFF]"}
        `}
      onClick={onClick}
      style={style}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Please wait..." : title}
    </button>
  );
};

export default ButtonComponent;
