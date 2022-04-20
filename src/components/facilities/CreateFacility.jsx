import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacilityService from "../../services/FacilityService";
import "../../components/component_styles/ViewDetails.css";

const CreateFacility = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const saveFacility = (e) => {
    e.preventDefault();

    let facility = {
      name: name,
      address: address,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    FacilityService.createFacility(facility).then((_res) => {
      navigate("/facilities/");
    });
  };

  return (
    <div className="facility-update-container">
      <div className="facility-update-sub-container">
        <div className="facility-heading">
          <h2>Add facility</h2>
        </div>
        <div className="facility-update-form">
          <form onSubmit={saveFacility}>
            <div className="form-group">
              <label>Name:</label>
              <input
                required
                placeholder="Facility Name"
                name="facilityName"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                required
                placeholder="Facility Address"
                name="facilityAddress"
                className="form-control"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                required
                placeholder="Facility City"
                name="facilityCity"
                className="form-control"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input
                required
                placeholder="Facility State"
                name="facilityState"
                className="form-control"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                required
                placeholder="Facility Zip Code"
                name="facilityZipCode"
                className="form-control"
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
              />
            </div>
            <div className="update-truck-button-row">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginLeft: "10px" }}
                onClick={() => navigate("/facilities/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFacility;
