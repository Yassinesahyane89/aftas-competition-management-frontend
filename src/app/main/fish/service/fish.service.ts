import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FishService {
    public FishList: any ;

    constructor(
      private http: HttpClient
    ) { }

    //get all fish
    getAllFish() {
        return this.http.get(environment.fishsUrl);
    }

    //get fish by id
    getFishById(id) {
        return this.http.get(environment.fishsUrl + '/' + id);
    }

    // add fish
    addFish(fish) {
        return this.http.post(environment.fishsUrl, fish);
    }

    // update fish
    updateFish(fish) {
        return this.http.put(environment.fishsUrl + '/' + fish.id, fish);
    }

    // delete fish
    deleteFish(id) {
        return this.http.delete(environment.fishsUrl + '/' + id);
    }
}
