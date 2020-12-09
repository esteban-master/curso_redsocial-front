import React from "react";
import { Link } from "react-router-dom";

const FollowGrid = ({ personas, label }) => {
  return (
    <div>
      <h2>{label}</h2>
      {personas.map((person) => (
        <Link to={`/usuario/${person._id}`} key={person._id}>
          <p>{person.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default FollowGrid;
