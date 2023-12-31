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

    //gete all competitions with pagination
    getAllCompetitionWithPagination(page, pageSize) {
        return this.http.get(environment.competitionsUrl + '/page', {params: {page: page, size: pageSize}});
    }

    //get competition by id
    getCompetitionById(code) {
        return this.http.get(environment.competitionsUrl + '/' + code);
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

    // update rank of competition
    updateRankOfCompetition(CompetitionCode) {
        return this.http.put(environment.competitionsUrl + '/' +  CompetitionCode + "/rank" , CompetitionCode);
    }

    // List competitions with a filter (ongoing, closed, upcoming)
    getCompetitionByFilter(filter:any) {
        return this.http.get(environment.competitionsUrl + '/filter', {params: {filter: filter}});
    }

    // return boolean if the competition is ended or not and also must not pass 1 day from the end date
    isCompetitionEnded(code) {
        return this.http.get(environment.competitionsUrl + '/' + code + '/is-ended');
    }


}
