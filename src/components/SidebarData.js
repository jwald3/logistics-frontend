import React from 'react'
import { FaMapMarkedAlt, FaTruckMoving } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import {GiFactory} from 'react-icons/gi';

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "Trucks",
        path: "/trucks",
        icon: <FaTruckMoving />,
        cName: "nav-text",
    },
    {
        title: "Trips",
        path: "/trips",
        icon: <FaMapMarkedAlt />,
        cName: "nav-text",
    },
    {
        title: "Facilities",
        path: "/facilities",
        icon: <GiFactory />,
        cName: "nav-text",
    }
];