import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  EMAIL: 3,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, isRequired }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          required={isRequired}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={name} data-testid="field-testid" required={isRequired} />;
      break;
    case FIELD_TYPES.EMAIL:
      component = (
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          autoComplete="email"
          autoCapitalize="off"
          required={isRequired}
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          required={isRequired}
        />
      );
  }
  return (
    <div className="inputField">
      <span>
        {label}
        {isRequired ? " *" : ""}
      </span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
};
Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  isRequired: false,
};

export default Field;
