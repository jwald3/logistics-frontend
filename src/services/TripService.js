import axios from "axios";

const TRIP_API_BASE_URL =
    "http://logisticsmanager-env.eba-276mvvqm.us-east-1.elasticbeanstalk.com/api/trips";

class TripService {
    getTrips() {
        return axios.get(TRIP_API_BASE_URL);
    }

    getTripById(tripId) {
        return axios.get(TRIP_API_BASE_URL + "/" + tripId);
    }

    createTrip(trip) {
        return axios.post(TRIP_API_BASE_URL, trip);
    }

    updateTrip(tripId, trip) {
        return axios.put(TRIP_API_BASE_URL + "/" + tripId, trip);
    }

    deleteTrip(tripId) {
        return axios.delete(TRIP_API_BASE_URL + "/" + tripId);
    }
}

export default new TripService();
