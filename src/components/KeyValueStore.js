import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useHistory,
} from "react-router-dom";

import "../styles/App.css";

const KeyValueStore = () => {
  const [keyValues, setKeyValues] = useState({});
  const history = useHistory();
  const { search } = useLocation();
  const parseKeyValuesFromURL = () => {
    const searchParams = new URLSearchParams(search);
    const keyValues = {};
    searchParams.forEach((value, key) => {
      keyValues[key] = value;
    });
    setKeyValues(keyValues);
  };

  const updateKeyValue = (key, value) => {};

  const getQueryStringFromKeyValues = (keyValues) => {
    const searchParams = new URLSearchParams();
    for (let key in keyValues) {
      searchParams.append(key, keyValues[key]);
    }
    console.log(searchParams.toString());
    return searchParams.toString();
  };

  const handleUpdateClick = () => {
    const queryString = getQueryStringFromKeyValues(keyValues);
    const url = `/?${queryString}`;
    history.push(url);
  };

  const handleDeleteClick = (key) => {
    const newKeyValues = { ...keyValues };
    delete newKeyValues[key];
    const queryString = getQueryStringFromKeyValues(newKeyValues);
    const url = `/?${queryString}`;
    history.push(url);
  };

  useEffect(() => {
    parseKeyValuesFromURL();
  }, [search]);
  const key = 3;
  return (
    <div>
      <h1>Key Value Store</h1>
      <div>
        {Object.keys(keyValues).map((key) => (
          <div key={key} className="key-value-div">
            <span className="key-field">{key}:</span>
            <input
              className="value-field"
              type="text"
              value={keyValues[key]}
              onChange={(evt) => {
                const value = evt.target.value;
                setKeyValues((prev) => ({ ...prev, [key]: value }));
              }}
            />
            <button
              className="delete-btn"
              onClick={() => handleDeleteClick(key)}
            >
              Delete
            </button>
          </div>
        ))}

        {/* Do not include Update button, while mapping the key-value */}
        <button className="update-btn" onClick={handleUpdateClick}>
          Update Values
        </button>
      </div>

      {Object.keys(keyValues).length === 0 ? (
        <p>No key values found in URL.</p>
      ) : null}
    </div>
  );
};

export default KeyValueStore;
