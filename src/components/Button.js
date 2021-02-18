import React from "react"
import classnames from "classnames"

const baseClassNames =
  `flex items-center rounded shadow-sm border-transparent 
   focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium border`

const sizeToPadding = (size) => {
  if (size === "xs") return "px-2.5 py-1.5"
  if (size === "sm") return "px-3 py-2"
  if (size === "md") return "px-4 py-2"
  if (size === "lg") return "px-4 py-2"
  else return "px-6 py-3"
}

export const Button = ({ className, size, variant, onClick, type, disabled = false, ...props }) => {
  const isPrimaryEnabled = !disabled && variant === "primary"
  const isSecondaryEnabled = !disabled && variant === "secondary"
  const isPrimaryDisabled = disabled && variant === "primary"
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classnames(`${sizeToPadding(size)} text-${size} ${baseClassNames} ${className}`,
       {
          'cursor-not-allowed': disabled,
          'border-transparent': variant === 'primary',
          'bg-gray-600': isPrimaryDisabled,
          'text-gray-400': isPrimaryDisabled,
          "hover:bg-indigo-700": isPrimaryEnabled,
          'bg-indigo-600': isPrimaryEnabled,
          "text-white": isPrimaryEnabled,
          "text-gray-200": isSecondaryEnabled,
          'bg-gray-800': isSecondaryEnabled,
          'hover:border-blue-500': isSecondaryEnabled,
        })}
    >
      {props.children}
    </button>
  )
}
