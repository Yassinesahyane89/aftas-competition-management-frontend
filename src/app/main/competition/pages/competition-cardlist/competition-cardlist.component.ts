import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CompetitionService } from "../../service/competition.service";

@Component({
  selector: "app-competition-cardlist",
  templateUrl: "./competition-cardlist.component.html",
  styleUrls: ["./competition-cardlist.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "ecommerce-application" },
})
export class CompetitionCardlistComponent implements OnInit {
  public contentHeader: object;
  public competitions: any[];
  public page = 1;
  public pageSize = 6;
  public searchText = "";

  constructor(private CompetitionService: CompetitionService) {}

  sortCompetitions(key) {
    this.competitions.sort(key);
  }

  // get all competitions
  getCompetitions() {
    this.CompetitionService.getAllCompetition()
      .subscribe((competitions: any) => {
        this.competitions = competitions.data;
      });
  }

  ngOnInit(): void {
    this.CompetitionService.getAllCompetition()
        .subscribe((competitions: any) => {
          this.competitions = competitions.data;
        });

    this.contentHeader = {
      headerTitle: "Competitions",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Competitions",
            isLink: false,
          },
        ],
      },
    };
  }
}
