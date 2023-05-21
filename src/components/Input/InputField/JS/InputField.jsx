import PropTypes from 'prop-types';

const InputField = ({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  labelStyle,
  containerStyle,
  inputStyle,
  containerClassName,
  labelClassName,
  inputClassName,
}) => (
  <div className={containerClassName} style={containerStyle}>
    {label && (
      <label
        htmlFor="input-field"
        style={labelStyle}
        className={labelClassName}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      style={inputStyle}
      className={inputClassName}
    />
  </div>
);

InputField.defaultProps = {
  value: '',
};

InputField.propTypes = {
  /**
   * **value** prop accepts the value of the input tag.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * **name** prop accepts the name of the input tag.
   */
  name: PropTypes.string.isRequired,
};

export default InputField;
