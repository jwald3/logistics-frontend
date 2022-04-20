import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TruckService from "../../services/TruckService";

const CreateTruck = () => {
  let navigate = useNavigate();
  const [license, setLicense] = useState("");
  const [capacity, setCapacity] = useState("");

  const saveTruck = (e) => {
    e.preventDefault();

    let truck = {
      license: license,
      capacity: capacity,
    };

    TruckService.createTruck(truck).then((_res) => {
      navigate("/trucks/");
    });
  };

  return (
    <div className="truck-update-container">
      <div className="truck-update-sub-container">
        <div className="truck-heading">
          <h2>Add Truck</h2>
        </div>
        <div className="truck-update-form">
          <form onSubmit={saveTruck}>
            <div className="form-group">
              <label>License Plate:</label>
              <input
                placeholder="Truck License Plate"
                name="license"
                className="form-control"
                value={license}
                required
                onChange={(event) => setLicense(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Truck Capacity:</label>
              <input
                placeholder="Truck Capacity"
                name="capacity"
                className="form-control"
                value={capacity}
                required
                onChange={(event) => setCapacity(event.target.value)}
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
                onClick={() => navigate("/trucks/")}
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

export default CreateTruck;
