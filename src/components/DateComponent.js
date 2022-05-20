import DatePicker from "react-datepicker";
import React, { Component } from "react";
import moment from "moment";

function formatDateForInput(storedDate) {
  // the returned value will be available as `input.value`
  return moment(pickedDate).format("right format for your input");
}

function parseDateForStore(pickedDate) {
  // the returned value will be stored in the redux store
  return moment(storedDate).format("desired format for storage");
}

const MyDatePicker = ({ input, meta: { touched, error } }) => {
  const onChange = (event) => {
    const pickedDate = event.path.to.value;
    input.onChange(pickedDate);
  };

  return (
    <div>
      <DatePicker
        dateFormat="YYYY-MM-DD"
        selected={input.value ? moment(input.value) : null}
        onChange={onChange}
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
};

MyDatePicker.propTypes = {
  input: PropTypes.shape().isRequired,
  meta: PropTypes.shape().isRequired,
};

<Field
  component={MyDatePicker}
  format={formatDateForInput}
  parse={parseDateForStore}
/>;

export default MyDatePicker;
