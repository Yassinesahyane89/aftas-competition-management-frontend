import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FlatpickrOptions } from 'ng2-flatpickr';


// services
import { CompetitionService } from "../../service/competition.service";

@Component({
  selector: 'app-competition-add-edit',
  templateUrl: './competition-add-edit.component.html',
  styleUrls: ['./competition-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionAddEditComponent implements OnInit {
  public contentHeader: object;

  public competitionId: number;
  public competitionCode = "";
  public competitionAmount : number;
  public competitionNumberOfParticipants : number;
  public competitionDate: NgbDateStruct;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  public startTime;
  public endTime;
  public competitionLocation = "";
  public   timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true
  }
  public fileName = undefined;
  public featuredImage: string;
  isCompetitionCreated: boolean = false;
  constructor(
      private router: Router,
      private competitionService: CompetitionService,
      private calendar: NgbCalendar,
      private formatter: NgbDateParserFormatter
  ) { }

  // git commit -m "add isDisabled and isWeekend methods"
  isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
  isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  ngOnInit(): void {
  }

}
