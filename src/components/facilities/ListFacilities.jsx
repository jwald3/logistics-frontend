import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import FacilityService from '../../services/FacilityService';
import ListTable from '../ListTable';
import '../../components/component_styles/ListView.css';
import _ from 'lodash'

const pageSize = 10;

const ListFacilities = () => {
    let navigate = useNavigate();
    const [facilities, setFacilities] = useState([])
    const [paginatedFacilities, setPaginatedFacilities] = useState([])

    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        FacilityService.getFacilities().then((res) => {
            setFacilities(res.data);
            setPaginatedFacilities(_(res.data).slice(0).take(pageSize).value());
        })
    }, [])

    const pageCount = facilities ? Math.ceil(facilities.length) / pageSize : 0;

    const pagination = (pageNo) => {
        setCurrentPage(pageNo)
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedTruck = _(facilities).slice(startIndex).take(pageSize).value();
        setPaginatedFacilities(paginatedTruck)
    }


    const viewFacility = (id) => {
        navigate(`/facilities/${id}`)
    }

    const headers = [
        {key: "name", label: "Name"},
        {key: "address", label: "Address"},
        {key: "city", label: "City"},
        {key: "state", label: "State"},
        {key: "zipCode", label: "ZIP Code"},
    ]

    const actions = [
        {label: "View", cName: 'btn btn-info', func: viewFacility },
    ]

    return (
        <div className='container'>
            <div className='sub-container'>
               <h2 className='text-center'>Facility List</h2>
                <ListTable data={paginatedFacilities} headers={headers} actions={actions} id={"id"}/>
                <div className='top-btns'>
                    <button className='add-btn' onClick={() => navigate("/facilities/add")}>Add Facility</button>
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

export default ListFacilities;
