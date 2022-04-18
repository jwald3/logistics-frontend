import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TripService from '../../services/TripService';
import ListTable from '../ListTable';
import '../component_styles/ListView.css';
import _ from 'lodash'

const pageSize = 10;

const ListTrips = () => {
    let navigate = useNavigate();
    const [trips, setTrips] = useState([])
    const [paginatedTrips, setPaginatedTrips] = useState([])

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        TripService.getTrips().then((res) => {
            setTrips(res.data);
            setPaginatedTrips(_(res.data).slice(0).take(pageSize).value());
        })
    }, [])

    const pageCount = trips ? Math.ceil(trips.length) / pageSize : 0;

    const pagination = (pageNo) => {
        setCurrentPage(pageNo)
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedTruck = _(trips).slice(startIndex).take(pageSize).value();
        setPaginatedTrips(paginatedTruck)
    }

    const viewTrip = (id) => {
        navigate(`/trips/${id}`)
    }

    const headers = [
        {key: "tripIdentifier", label: "Trip ID"},
        {key: "truck.license", label: "Truck"},
        {key: "startDate", label: "Start Date"},
        {key: "endDate", label: "End Date"},
        {key: "originFacility.name", label: "Origin Facility"},
        {key: "destinationFacility.name", label: "Destination Facility"},
    ]

    const actions = [
        {label: "Info", cName: 'btn btn-info', func: viewTrip },
    ]


    return (
        <div className='container'>
            <div className='trip-sub-container'>
               <h2 className='text-center'>Trip List</h2>
                <ListTable data={paginatedTrips} headers={headers} actions={actions} id={"tripId"}/>
                <div className='top-btns'>
                    <button className='add-btn' onClick={() => navigate("/trips/add")}>Add Trip</button>
                    <nav className='navigations'>
                        {
                            (<ul className='pagination'>
                                {currentPage > 1 && <li className={'page-item'}>
                                    <p 
                                        className='page-link' 
                                        onClick={() => pagination(currentPage - 1)}
                                    >
                                        Back
                                    </p>
                                </li>}
                                <li>
                                    <p className='page-link'>{currentPage}</p>
                                </li>
                                { currentPage < pageCount && <li className={'page-item'}>
                                    <p 
                                        className='page-link' 
                                        onClick={() => pagination(currentPage + 1)}
                                    >
                                        Next
                                    </p>
                                </li>}
                            </ul>)
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}


export default ListTrips;
