import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  public MemberList: any;

  constructor(
    private http: HttpClient
  ) {}

  //get all members
  getAllMember() {
    return this.http.get(environment.membersUrl);
  }

  //get member by id
  getMemberById(id) {
    return this.http.get(environment.membersUrl + '/' + id);
  }
}
