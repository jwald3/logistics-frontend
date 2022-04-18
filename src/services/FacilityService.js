import axios from "axios";

const FACILITY_API_BASE_URL =
    "https://logisticsmanager-env.eba-276mvvqm.us-east-1.elasticbeanstalk.com/api/facilities";

class FacilityService {
    getFacilities() {
        return axios.get(FACILITY_API_BASE_URL);
    }

    getFacilityById(facilityId) {
        return axios.get(FACILITY_API_BASE_URL + "/" + facilityId);
    }

    createFacility(facility) {
        return axios.post(FACILITY_API_BASE_URL, facility);
    }

    updateFacility(facilityId, facility) {
        return axios.put(FACILITY_API_BASE_URL + "/" + facilityId, facility);
    }

    deleteFacility(facilityId) {
        return axios.delete(FACILITY_API_BASE_URL + "/" + facilityId);
    }
}

export default new FacilityService();
