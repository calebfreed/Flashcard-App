import React from "react";
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <Link
        to="/"
        className="btn btn-margin btn-primary">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
