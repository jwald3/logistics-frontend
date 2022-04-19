import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import TripService from '../../services/TripService';
import FacilityService from '../../services/FacilityService';
import TruckService from '../../services/TruckService';

const CreateTrip = () => {
    let navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [destinationId, setDestinationId] = useState("");
    const [originId, setOriginId] = useState("");
    const [truckId, setTruckId] = useState("");

    const [facilities, setFacilities] = useState([]);
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        FacilityService.getFacilities()
            .then(res => {
                setFacilities(res.data)
                
            })
            .catch(err => {console.log(err)})

        TruckService.getTrucks()
            .then(res => {
                setTrucks(res.data)
                
            })
            .catch(err => {console.log(err)})
    }, [])

    const saveTrip = (e) => {
        e.preventDefault();


        let trip = {
            "tripIdentifier": identifier, 
            "startDate": startDate,
            "endDate": endDate,
            "originFacility": {"id": originId},
            "destinationFacility": {"id": destinationId},  
            "truck": {"id": truckId}
        }

        console.log(trip)

        TripService.createTrip(trip).then(_res => {
            navigate("/trips/");
        });
    }

    return (
        <div className="trip-update-container">
            <div className="trip-update-sub-container">
                <div className="heading">
                    <h2>Create Trip</h2>
                </div>
                <div className="trip-update-form">
                    <form onSubmit={saveTrip}>
                        <div className='form-group'>
                            <label>Identifier:</label>
                            <input required placeholder='Trip Identifier' name="tripIdentifier" className="form-control" 
                                value={identifier} onChange={(event) => setIdentifier(event.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label>Start Date:</label>
                            <input required type='datetime-local' placeholder='Start Date' name="startDate" className="form-control" 
                                value={startDate} onChange={(event) => setStartDate(event.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label>End Date:</label>
                            <input required type='datetime-local' placeholder='End Date' name="endDate" className="form-control" 
                                value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)}/>
                        </div>
                        {<div className='form-group'>
                            <label>Origin Facility:</label>
                            <select required onChange={(event) => setOriginId(event.target.value)}>
                                <option value={originId}>{facilities.filter(facility => facility.id === originId).map(f => f.name)}</option>
                                    {facilities.map((facility => <option value={facility.id}>{facility.name}</option>))}
                            </select>
                        </div>}
                        <div className='form-group'>
                            <label>Destination Facility:</label>
                            <select required onChange={(event) => setDestinationId(event.target.value)}>
                                <option value={destinationId}>{facilities.filter(facility => facility.id === destinationId).map(f => f.name)}</option>
                                {facilities.map((facility => <option value={facility.id}>{facility.name}</option>))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Truck:</label>
                            <select required onChange={(event) => setTruckId(event.target.value)}>
                                <option value={truckId}>{trucks.filter(truck => truck.id === truckId).map(f => f.license)}</option>
                                    {trucks.map((truck => <option value={truck.id}>{truck.license}</option>))}
                            </select>
                        </div>
                        <div className="update-trip-button-row">
                            <button type='submit' className=''>Save</button>
                            <button type="button" className='' style={{marginLeft: "10px"}} onClick={() => navigate("/trips/")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTrip;