import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
    public CompetitionList: any ;

    constructor(
      private http: HttpClient
    ) { }

    //get all competitions
    getAllCompetition() {
        return this.http.get(environment.competitionsUrl);
    }

    //get competition by id
    getCompetitionById(id) {
        return this.http.get(environment.competitionsUrl + '/' + id);
    }
}
