import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TruckService from "../../services/TruckService";
import ListTable from "../ListTable";
import "../component_styles/ListView.css";
import _ from "lodash";

const pageSize = 10;

const ListTrucks = () => {
  let navigate = useNavigate();
  const [trucks, setTrucks] = useState([]);
  const [paginatedTrucks, setPaginatedTrucks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    TruckService.getTrucks().then((res) => {
      setTrucks(res.data);
      setPaginatedTrucks(_(res.data).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCount = trucks ? Math.ceil(trucks.length) / pageSize : 0;

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedTruck = _(trucks).slice(startIndex).take(pageSize).value();
    setPaginatedTrucks(paginatedTruck);
  };

  const viewTruck = (id) => {
    navigate(`/trucks/${id}`);
  };

  const headers = [
    { key: "license", label: "Truck" },
    { key: "capacity", label: "Capacity" },
    { key: "trips.length", label: "Trips" },
  ];

  const actions = [{ label: "View", cName: "btn btn-info", func: viewTruck }];

  return (
    <div className="container">
      <div className="sub-container">
        <h2 className="text-center">Truck List</h2>
        <ListTable
          className="list-table"
          data={paginatedTrucks}
          headers={headers}
          actions={actions}
          id={"id"}
        />
        <div className="top-btns">
          <button className="add-btn" onClick={() => navigate("/trucks/add")}>
            Add Truck
          </button>
          <nav className="navigations">
            {
              <ul className="pagination">
                {currentPage > 1 && (
                  <li className={"page-item"}>
                    <p
                      className="page-link"
                      onClick={() => pagination(currentPage - 1)}
                    >
                      Back
                    </p>
                  </li>
                )}
                <li>
                  <p className="page-link">{currentPage}</p>
                </li>
                {currentPage < pageCount && (
                  <li className={"page-item"}>
                    <p
                      className="page-link"
                      onClick={() => pagination(currentPage + 1)}
                    >
                      Next
                    </p>
                  </li>
                )}
              </ul>
            }
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ListTrucks;
