import PropTypes from "prop-types";
import Button from "./button.js";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd_callback, showAdd_state }) => {
  const location = useLocation(); // check the current router we are on

  return (
    <header className="header">
      <h1>{title}</h1>

      {location.pathname === "/" && (
        <Button
          color={showAdd_state ? "red" : "green"}
          text={showAdd_state ? "Close" : "Add"}
          onClick_callback={onAdd_callback}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in js
// <h1 style={headingStyle}>{title}</h1>
const headingStyle = {
  color: "red",
  backgroundColor: "black",
};

export default Header;
