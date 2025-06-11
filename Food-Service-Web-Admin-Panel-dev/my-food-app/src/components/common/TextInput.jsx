const TextInput = ({
  id,
  formik,
  label,
  disabled,
  placeholder,
  labelIcon,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="font-semibold mb-1 flex items-center gap-1"
      >
        {label}
        {labelIcon && <span>{labelIcon}</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={formik.values[id]}
        onChange={(event) =>
          formik.setFieldValue(id, event?.target?.value)
        }
        onBlur={formik.handleBlur}
        className={`w-full p-3 border ${
          formik.touched[id] && formik.errors[id]
            ? "border-red-500"
            : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
      />

      {formik.touched[id] && formik.errors[id] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[id]}</p>
      )}
    </div>
  );
};

export default TextInput;
