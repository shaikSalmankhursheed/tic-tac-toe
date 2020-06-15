import React from "react";
import { FaTimes, FaPen, FaRegCircle } from "react-icons/fa";

const Icon = ({ name }) => {
  switch (name) {
    case "circle":
      return <FaRegCircle className="icons" color="red" size="5em" />;
    case "cross":
      return <FaTimes className="icons" color="pink" size="5em" />;
    default:
      return <FaPen className="icons" />;
  }
};

export default Icon;
