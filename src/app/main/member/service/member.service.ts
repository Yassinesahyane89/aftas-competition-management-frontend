import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  public MemberList: any;

  constructor(private http: HttpClient) {}

  //get all members
  getAllMember() {
    return this.http.get(environment.membersUrl);
  }

  //get member by id
  getMemberById(id) {
    return this.http.get(environment.membersUrl + "/" + id);
  }

  //add new member
  addMember(member) {
    return this.http.post(environment.membersUrl, member);
  }

  //update member
  updateMember(member) {
    return this.http.put(environment.membersUrl + "/" + member.id, member);
  }

  //delete member
  deleteMember(id) {
    return this.http.delete(environment.membersUrl + "/" + id);
  }

  //get all members that are not in competition
  getAllMemberNotInCompetition(competitionCode) {
    return this.http.get(
      environment.membersUrl + "/not-in-competition/" + competitionCode);
  }

  //get all members that are in competition
  getAllMemberInCompetition(competitionCode) {
    return this.http.get(
      environment.membersUrl + "/in-competition/" + competitionCode
    );
  }
}
