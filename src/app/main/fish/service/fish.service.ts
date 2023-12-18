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
}
