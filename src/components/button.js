import React from "react";

const Button = ({ color, text, onClick_callback }) => {
  return (
    <div>
      <button
        onClick={onClick_callback}
        style={{ backgroundColor: color }}
        className="btn"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
