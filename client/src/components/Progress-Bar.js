import React from "react";

const ProgressBar = (props) => {
  const { progress, amount } = props;

  function completedValue(progress, amount) {
    const value = Math.floor((progress / amount) * 100);

    return value;
  }

  const value = completedValue(progress, amount);

  function background(value) {
    let color = "";
    if (value < 25) {
      color = "#FF0000";
      return color;
    } else if (25 <= value && value <= 49) {
      color = "#FF8700";
      return color;
    } else if (50 <= value && value <= 74) {
      color = "#D9DC00";
      return color;
    } else if (75 <= value && value <= 99) {
      color = "#00AB00";
      return color;
    } else if (value === 100) {
      color = "#007500";
      return color;
    }
  }

  const bgcolor = background(value);

  const containerStyles = {
    height: 40,
    width: "85%",
    backgroundColor: "#FFFFFF",
    margin: 50,
    marginTop: "75px",
  };

  const fillerStyles = {
    height: "100%",
    width: `${value}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <div className="whiteTextProg">{`${value}%`}</div>
        <span style={labelStyles}></span>
      </div>
    </div>
  );
};

export default ProgressBar;
