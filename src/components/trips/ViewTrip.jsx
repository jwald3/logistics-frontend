import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import TripService from '../../services/TripService';
import '../component_styles/ViewDetails.css';

const ViewTrip = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [trip, setTrip] = useState({
        "tripIdentifier": "",
        "startDate": "",
        "endDate": "",
        "originFacility": {
            "name": "",
            "address": "",
            "city": "",
            "state": "",
            "zipCode": ""
        },
        "destinationFacility": {
            "name": "",
            "address": "",
            "city": "",
            "state": "",
            "zipCode": ""
        },
        "truck": {
            "license": "",
            "capacity": ""
        }
    });

    useEffect(() => {
        getTripData();
    }, [])

    const getTripData = () => {
        TripService.getTripById(id).then(res => {
            console.log(res.data)
            setTrip(res.data);
        })
    }

    const updateTrip = (_id) => {
        navigate(`/trips/update/${_id}`)
    }

    const deleteTrip = (_id) => {
        TripService.deleteTrip(_id).then(_res => {
            navigate(`/trips/`)
        })
    }

    return (
        <div className='trip-view-container'>
            <div className="trip-sub-container">
                <div className="heading">
                    <button className='back-button' onClick={() => navigate("/trips")}>
                        <BiArrowBack />
                    </button>
                    <h2>View Trip</h2>
                </div>
                <div className="trip-info">
                    <div className='trip-info-row'>
                        <label><strong>Trip Identifier:</strong></label>
                        <div>{trip.tripIdentifier}</div>
                        
                    </div>
                    <div className='trip-info-row'>
                        <label><strong>Truck:</strong></label>
                        <div>{trip?.truck?.license ?? "Unassigned"}</div>
                    </div>
                    <div className='trip-info-row'>
                        <label><strong>Start Date:</strong></label>
                        <div>{trip.startDate}</div>
                    </div>
                    <div className='trip-info-row'>
                        <label><strong>End Date:</strong></label>
                        <div>{trip.endDate}</div>
                    </div>
                    <div className='trip-info-row'>
                        <label><strong>Origin Facility:</strong></label>
                        <div>{trip.originFacility.name}</div>
                        <div>{trip.originFacility.address}</div>
                        <div>{trip.originFacility.city + ", " + trip.originFacility.state + " " + trip.originFacility.zipCode}</div>

                    </div>
                    <div className='trip-info-row'>
                        <label><strong>Destination Facility:</strong></label>
                        <div>{trip.destinationFacility.name}</div>
                        <div>{trip.destinationFacility.address}</div>
                        <div>{trip.destinationFacility.city + ", " + trip.destinationFacility.state + " " + trip.destinationFacility.zipCode}</div>
                    </div>
                </div>
                <div className="trip-button-row">
                    <button style={{marginLeft: "10px"}} className='btn-warning' onClick={() => updateTrip(trip.tripId)}>
                        Update
                    </button>
                    <button style={{marginLeft: "10px"}} className='delete-btn' onClick={() => deleteTrip(trip.tripId)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ViewTrip;