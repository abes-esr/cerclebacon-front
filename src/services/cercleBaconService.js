import axios from "axios";


export class CercleBaconService {


    client = axios.create({
        baseURL: "http://localhost:8080"
    });

    getFiles(){
        return this.client.get("/all");
    }

}
export default new CercleBaconService();