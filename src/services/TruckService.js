import axios from "axios";

const TRUCK_API_BASE_URL = "https://logi-manager.com/api/trucks";

class TruckService {
    getTrucks() {
        return axios.get(TRUCK_API_BASE_URL);
    }
    
    getTruckById(truckId) {
        return axios.get(TRUCK_API_BASE_URL + "/" + truckId);
    }

    createTruck(truck) {
        return axios.post(TRUCK_API_BASE_URL, truck);
    }

    updateTruck(truckId, truck) {
        return axios.put(TRUCK_API_BASE_URL + "/" + truckId, truck);
    }

    deleteTruck(truckId) {
        return axios.delete(TRUCK_API_BASE_URL + "/" + truckId);
    }
}

export default new TruckService();
