import Select from "react-select";
import { components } from "react-select";
import Avatar from "@mui/material/Avatar";
import makeAnimated from "react-select/animated";
import ErrorMessage from "./ErrorMessage";

const animatedComponents = makeAnimated();

const MultiValueLabel = (props) => {
  return (
    <div className="w-max">
      <components.MultiValueLabel {...props} />
    </div>
  );
};

const { Option } = components;
export const IconOption = (props) => (
  <Option {...props}>
    <div className="flex items-center cursor-pointer">
      <Avatar
        alt={props.data.label}
        src={props.data.image}
        sx={{ width: 24, height: 24 }}
      />
      <div className="ml-2">{props.data.label}</div>
    </div>
  </Option>
);
const colourStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "#fff",
    borderColor: isFocused ? "#000" : "#000",
    minHeight: 44,
  }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#000066" : "#FFF",
      color: isFocused ? "#FFF" : "#101828",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

const SearchableSelect = ({
  options,
  name,
  isUpdatingObj = false,
  value,
  onChange,
  placeholder,
  isLoading,
  extraFunction,
  defaultValue,
  error, 
  touched,
  setFieldValue,
  multipleOptions = false,
  label,
  ...props
}) => {
  const getValue = () => {
    if (multipleOptions) {
      const selectedOptions = [];
      Array.isArray(value) &&
        value.forEach((val) => {
          const option = options
            ? options.find((option) => option?.value === val)
            : "";
          option && selectedOptions.push(option);
        });
      return selectedOptions;
    } else {
      return options ? options.find((option) => option?.value === value) : "";
    }
  };

  // const NoOptionsMessage = (props) => {
  //   return (
  //     <components.NoOptionsMessage {...props}>
  //       <span className="custom-css-class">
  //         You have not saved any card yet
  //       </span>
  //     </components.NoOptionsMessage>
  //   );
  // };

  return (
    <div>
      <label>{label}</label>
      <Select
        components={{MultiValueLabel, animatedComponents}}
        options={options}
        value={getValue()}
        onChange={(option) => {
          if(multipleOptions) {
            const values = option.map(opt => opt.value)
            setFieldValue?.(name, values);
          } else {
            setFieldValue?.(name, isUpdatingObj ? option : option.value);
          }
          extraFunction && extraFunction(option);
        }}
        styles={colourStyles}
        placeholder={!isLoading ? placeholder : ""}
        isLoading={isLoading}
        defaultInputValue={defaultValue}
        isMulti={multipleOptions}
        {...props}
      />
      <ErrorMessage error={error} touched={touched}  />
    </div>
  );
};

export default SearchableSelect;