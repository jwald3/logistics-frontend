import React, { useState, useEffect } from "react";
import { FaMapMarkedAlt, FaTruckMoving } from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import "../components/component_styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import FacilityService from "../services/FacilityService";
import TruckService from "../services/TruckService";
import TripService from "../services/TripService";

const Home = () => {
  let navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    TripService.getTrips().then((res) => {
      setTrips(res.data);
    });

    FacilityService.getFacilities()
      .then((res) => {
        setFacilities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    TruckService.getTrucks()
      .then((res) => {
        setTrucks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="contain">
      <div className="cards truck-card" onClick={() => navigate("/trucks/")}>
        <div className="card-logo">
          <FaTruckMoving />
        </div>
        <div className="content">
          <h2>Trucks</h2>
          <h5>
            {trucks.length !== 1
              ? `${trucks.length} trucks listed`
              : `${trucks.length} truck listed`}
          </h5>
        </div>
      </div>
      <div
        className="cards facility-card"
        onClick={() => navigate("/facilities/")}
      >
        <div className="card-logo">
          <GiFactory />
        </div>
        <div className="content">
          <h2>Facilities</h2>
          <h5>
            {facilities.length !== 1
              ? `${facilities.length} facilities listed`
              : `${facilities.length} facility listed`}
          </h5>
        </div>
      </div>
      <div className="cards trip-card" onClick={() => navigate("/trips/")}>
        <div className="card-logo">
          <FaMapMarkedAlt />
        </div>
        <div className="content">
          <h2>Trips</h2>
          <h5>
            {trips.length !== 1
              ? `${trips.length} trips listed`
              : `${trips.length} trip listed`}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Home;
