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

    // add level
    addLevel(level) {
        return this.http.post(environment.levelsUrl, level);
    }

    // update level
    updateLevel(level) {
        return this.http.put(environment.levelsUrl + '/' + level.id, level);
    }

    // delete level
    deleteLevel(id) {
        return this.http.delete(environment.levelsUrl + '/' + id);
    }
}
