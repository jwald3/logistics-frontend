import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FacilityService from "../../services/FacilityService";
import TripService from "../../services/TripService";
import { BiArrowBack } from "react-icons/bi";
import "../component_styles/ViewDetails.css";

const ViewFacility = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [facility, setFacility] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    FacilityService.getFacilityById(id).then((res) => {
      setFacility(res.data);
    });
    TripService.getTrips().then((res) => {
      setTrips(res.data);
    });
  }, []);

  const updateFacility = (_id) => {
    navigate(`/facilities/update/${_id}`);
  };

  const deleteFacility = (_id) => {
    FacilityService.deleteFacility(_id).then((_res) => {
      navigate(`/facilities/`);
    });
  };

  const associatedTrips = trips.filter(
    (trip) =>
      trip.originFacility.name === facility.name ||
      trip.destinationFacility.name === facility.name
  ).length;

  return (
    <div className="facility-view-container">
      <div className="facility-sub-container">
        <div className="heading">
          <button
            className="back-button"
            onClick={() => navigate("/facilities")}
          >
            <BiArrowBack />
          </button>
          <h2>View Facility</h2>
        </div>
        <div className="facility-info">
          <div className="facility-info-row">
            <label>Facility Name:</label>
            <div>{facility.name}</div>
          </div>
          <div className="facility-info-row">
            <label>Address:</label>
            <div>{facility.address}</div>
          </div>
          <div className="facility-info-row">
            <label>City:</label>
            <div>{facility.city}</div>
          </div>
          <div className="facility-info-row">
            <label>State:</label>
            <div>{facility.state}</div>
          </div>
          <div className="facility-info-row">
            <label>ZIP Code:</label>
            <div>{facility.zipCode}</div>
          </div>
          <div className="facility-button-row">
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-warning"
              onClick={() => updateFacility(facility.id)}
            >
              Update
            </button>
            <span
              style={{ margin: "0px" }}
              data-bs-toggle="tooltip"
              title="Cannot delete facility belonging to a trip"
            >
              <button
                style={{ marginLeft: "10px" }}
                className="btn btn-danger"
                disabled={associatedTrips > 0}
                onClick={() => deleteFacility(facility.id)}
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFacility;
