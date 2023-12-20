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

    // add competition
    addCompetition(competition) {
        return this.http.post(environment.competitionsUrl, competition);
    }

    // update competition
    updateCompetition(competition) {
        return this.http.put(environment.competitionsUrl + '/' + competition.code, competition);
    }

    // delete competition
    deleteCompetition(id) {
        return this.http.delete(environment.competitionsUrl + '/' + id);
    }

    //register member to competition
    registerMemberToCompetition(ranking) {
        return this.http.post(
          environment.competitionsUrl + "/register-member",
          ranking
        );}
}
