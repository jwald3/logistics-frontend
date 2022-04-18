import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TruckService from '../../services/TruckService';
import { BiArrowBack } from 'react-icons/bi';
import '../component_styles/ViewDetails.css'

const ViewTruck = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [truck, setTruck] = useState({
        truck: "",
        trips: [
            {
                tripId: "",
                tripIdentifier: "",
                startDate: "",
                endDate: "",
                destinationFacility: {
                    name: ""
                },
                originFacility: {
                    name: ""
                }

            }
        ]
    });

    useEffect(() => {
        TruckService.getTruckById(id).then(res => {
            setTruck(res.data);
        });
    }, [])

    const updateTruck = (_id) => {
        navigate(`/trucks/update/${_id}`)
    }

    const deleteTruck = (_id) => {
        TruckService.deleteTruck(_id).then(_res => {
            navigate(`/trucks/`)
        })
    }

    return (
        <div className="truck-view-container">
            <div className="truck-sub-container">
                <div className="heading">
                    <button className='back-button' onClick={() => navigate("/trucks")}>
                        <BiArrowBack />
                    </button>
                    <h2>View Truck</h2>
                </div>
                <div className='truck-info'>
                    <div className='truck-info-row'>
                        <label>Truck License:</label>
                        <div>{truck.license}</div>
                    </div>
                    <div className='truck-info-row'>
                        <label>Capacity:</label>
                        <div>{truck.capacity}</div>
                    </div>
                </div>
                <hr />
                <div className='related-trips'>
                    <h2 className='text-center'>Related Trips</h2>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Trip Identifier</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Origin Facility</th>
                                <th>Destination Facility</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                truck.trips.map((trip) => (
                                    <tr key={trip.tripId}>
                                        <td>{trip.tripIdentifier}</td>
                                        <td>{trip.startDate}</td>
                                        <td>{trip.endDate}</td>
                                        <td>{trip.originFacility.name}</td>
                                        <td>{trip.destinationFacility.name}</td>
                                    </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="truck-button-row">
                    <button style={{marginLeft: "10px"}} className='btn-warning' onClick={() => updateTruck(truck.id)}>
                        Update
                    </button>
                    <button style={{marginLeft: "10px"}} className='delete-btn' onClick={() => deleteTruck(truck.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ViewTruck;