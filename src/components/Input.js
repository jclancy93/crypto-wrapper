import classnames from "classnames"

const baseClassNames = "relative shadow-sm bg-gray-700 text-gray-300 px-2 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xl text-xl border-gray-300 rounded-md z-0"

export const Input = ({ 
  name, 
  label,
  disabled,
  value,
  type,
  placeholder,
  className,
  icon,
  error,
  onChange,
  ...props
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-md font-medium text-gray-200">
        {label}
      </label>
      <div className="mt-1 relative">
        <input 
          type={type} 
          name={name}
          disabled={disabled}
          id={name} 
          value={value}
          min="0"
          className={classnames(baseClassNames, {
            'cursor-not-allowed': disabled,
          })}
          placeholder={placeholder}
          onChange={onChange}
        />
        {icon}
      </div>
      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  )
}