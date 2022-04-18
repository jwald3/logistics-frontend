import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";

import ListTrucks from "./components/trucks/ListTrucks";
import ViewTruck from "./components/trucks/ViewTruck";
import CreateTruck from "./components/trucks/CreateTruck";
import UpdateTruck from "./components/trucks/UpdateTruck";

import ListTrips from "./components/trips/ListTrips";
import ViewTrip from "./components/trips/ViewTrip";
import CreateTrip from "./components/trips/CreateTrip";
import UpdateTrip from "./components/trips/UpdateTrip";

import ListFacilities from "./components/facilities/ListFacilities";
import ViewFacility from "./components/facilities/ViewFacility";
import CreateFacility from "./components/facilities/CreateFacility";
import UpdateFacility from "./components/facilities/UpdateFacility";

import "./App.css";


const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trucks" element={<ListTrucks />} />
                    <Route path="/trucks/:id" element={<ViewTruck />} />
                    <Route path="/trucks/add" element={<CreateTruck />} />
                    <Route
                        path="/trucks/update/:id"
                        element={<UpdateTruck />}
                    />
                    <Route path="/trips" element={<ListTrips />} />
                    <Route path="/trips/:id" element={<ViewTrip />} />
                    <Route path="/trips/add" element={<CreateTrip />} />
                    <Route
                        path="/trips/update/:id"
                        element={<UpdateTrip />}
                    />
                    <Route
                        path="/facilities"
                        element={<ListFacilities />}
                    />
                    <Route
                        path="/facilities/:id"
                        element={<ViewFacility />}
                    />
                    <Route
                        path="/facilities/add"
                        element={<CreateFacility />}
                    />
                    <Route
                        path="/facilities/update/:id"
                        element={<UpdateFacility />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
