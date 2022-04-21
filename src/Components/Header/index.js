import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function Header({ apiUserData }) {
  return (
    <header>
      <Link to="/">
        <h1 className="companyName"> Edvora</h1>
      </Link>
      <nav>
        <ul>
          <li className="profileName">{apiUserData?.name}</li>
          <li>
            <div className="profileImg">
              <img src={apiUserData?.url} alt={apiUserData?.name} />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
