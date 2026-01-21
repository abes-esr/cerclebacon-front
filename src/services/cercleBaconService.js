import axios from "axios";

export class CercleBaconService {

    getBaseUrl() {
        return import.meta.env.VITE_BASE_URL
    }

    client = axios.create({
        baseURL: this.getBaseUrl()
    });

    getFiles(){
        return this.client.get("all");
    }

}
export default new CercleBaconService();