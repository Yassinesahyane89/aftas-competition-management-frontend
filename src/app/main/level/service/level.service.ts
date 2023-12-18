import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  public LevelList: any ;

  constructor(
    private http: HttpClient
  ) { }

  //get all level
  getAllLevel() {
    return this.http.get(environment.levelsUrl);
  }

  //get level by id
    getLevelById(id) {
        return this.http.get(environment.levelsUrl + '/' + id);
    }
}
