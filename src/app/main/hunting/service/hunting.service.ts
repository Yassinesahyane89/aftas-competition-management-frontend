import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HuntingService {

  constructor(
    private http: HttpClient
  ) { }

  //add heunting result
    addHuntingResult(huntingResult) {
        return this.http.post(environment.huntingUrl + "/add-hunting-result", huntingResult);
    }
}
