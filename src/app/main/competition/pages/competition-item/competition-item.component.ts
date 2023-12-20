import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: "app-competition-item",
  templateUrl: "./competition-item.component.html",
  styleUrls: ["./competition-item.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "ecommerce-application" },
})
export class CompetitionItemComponent implements OnInit {
  @Input() competition: any;
  public dayOfWeek = "";
  public dayOfMonth = "";

  constructor() {}

  ngOnInit(): void {
     console.log("competition", this.competition);
     const dateParts = this.competition.date.split(", ");
     this.dayOfWeek = dateParts[0];
     this.dayOfMonth = dateParts[1].split(" ")[1];
  }
}
