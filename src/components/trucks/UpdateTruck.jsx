import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TruckService from '../../services/TruckService';

const UpdateTruck = () => {
    let navigate = useNavigate();
    let { id } = useParams();
    const [license, setLicense] = useState("");
    const [capacity, setCapacity] = useState("");

    useEffect(() => {
        TruckService.getTruckById(id).then(res => {
            let truck = res.data;
            setLicense(truck.license);
            setCapacity(truck.capacity);
        })
    }, [])

    const updateTruck = (e) => {
        e.preventDefault();

        let truck = {
            "license": license, 
            "capacity": capacity
        }

        TruckService.updateTruck(id, truck).then(_res => {
            navigate("/trucks/");
        });
    }

    return (
        <div className="truck-update-container">
            <div className="truck-update-sub-container">
                <div className="heading">
                    <h2>Update Truck</h2>
                </div>
                <div className="truck-update-form">
                    <form onSubmit={updateTruck}>
                        <div className='form-group'>
                            <label>License Plate:</label>
                            <input required placeholder='Truck License Plate' name="license" className="form-control" 
                                value={license} onChange={(event) => setLicense(event.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label>Truck Capacity:</label>
                            <input required placeholder='Truck Capacity' name="capacity" className="form-control" 
                                value={capacity} onChange={(event) => setCapacity(event.target.value)}/>
                        </div>
                        <div className="update-truck-button-row">
                            <button type="submit" className=''>Save</button>
                            <button type="button" className='' style={{marginLeft: "10px"}} onClick={() => navigate("/trucks/")}>Cancel</button>
                        </div>
                  </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateTruck;