import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

    private BASE_URL = 'http://localhost:5200';

    constructor(private http: Http) {
    }


    //need to figure out how to use response data to push info to the front end
    searchAsset(asset) {
        return this.http.post(this.BASE_URL + '/lock/search', asset)
            .map(res=> res.json());
    }

    deleteAsset(asset) {
       return this.http.post(this.BASE_URL + '/lock/delete', asset)
            .map(res=> res.json());
    }

    updateAsset(asset) {
        return this.http.post(this.BASE_URL + '/lock/delete', asset)
            .map(res=> res.json());
    }

    addAsset(asset) {
        console.log('addAsset called');
        return this.http.post(this.BASE_URL + '/lock/add', asset)
            .map(res=> res.json());

    }

}


