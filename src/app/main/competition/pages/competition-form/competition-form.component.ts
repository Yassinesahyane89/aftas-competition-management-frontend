import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FlatpickrOptions} from "ng2-flatpickr";
import {ActivatedRoute} from "@angular/router";
import {CompetitionService} from "../../service/competition.service";
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

// lodash
import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { CustomToastrComponent } from '@core/components/custom-toastr/custom-toastr.component';
@Component({
  selector: 'app-competition-form',
  templateUrl: './competition-form.component.html',
  styleUrls: ['./competition-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionFormComponent implements OnInit {

  @Input() competition: any;
  @Input() pageType: string;
  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true
  }
  public fileName = undefined;
  public featuredImage: string;
  isCompetitionCreated: boolean = false;
  private options: GlobalConfig;
  constructor(
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private competitionService: CompetitionService,
      private calendar: NgbCalendar,
      private formatter: NgbDateParserFormatter
  ) {
    this.options = this.toastr.toastrConfig;
  }

  // add isDisabled and isWeekend methods
  isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
  isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  // add uploadImage 

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.featuredImage = event.target.result;
      };

      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // add formatTime method for formatting time
  formatTime(time) {
    if(time==null){
      return null;
    }
    // here i want to do if time is 24
    let timedate = new Date(time).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // here i want to check if timedate have 24 in houres replacet with 00
    if (timedate.includes("24")) {
      timedate = timedate.replace("24", "00");
    }

    return timedate;
  }

  // add formatTime method for formatting time from  [Wed Dec 20 2023 00:00:00 GMT+0100 (GMT+01:00)] to HH:MM:SS
    formatTimeFromNgbTimeStruct(time: NgbTimeStruct) {
      return `${time.hour}:${time.minute}:${time.second}`;
    }

  // add formatDate method for formatting date
  formatDate(date: NgbDateStruct) {
    return new Date(date.year, date.month - 1, date.day).toISOString().split('T')[0];
  }

  //add handleSuccess method for handling success case
  handleSuccess(response,form) {
    // change button state
    this.isCompetitionCreated = true;

    // Handle success case
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success(response.message, 'Success!', customToastrRef);
  }

  //add handleError method for handling error case
  handleError(error,form) {
    if (error.error && error.error.message) {
      const customToastrRef = cloneDeep(this.options);
      customToastrRef.toastComponent = CustomToastrComponent;
      customToastrRef.closeButton = true;
      customToastrRef.tapToDismiss = false;
      customToastrRef.progressBar = true;
      customToastrRef.toastClass = 'toast ngx-toastr';
      this.toastr.error("Error!", 'Error!', customToastrRef);
    }else if (error && error.error){
      const validationErrors = error.error;

      Object.keys(validationErrors).forEach(prop => {
        const formControl = form.controls[prop];
        if (formControl) {
          // activate the error message
          formControl.setErrors({
            serverError: validationErrors[prop][0]
          });
        }
      });
    }
  }

  // git commit -m "add methode addNewCompetition for adding new competition"
  addNewCompetition(form) {
    this.competition.startTime = this.formatTime(this.competition.startTime);
    this.competition.endTime = this.formatTime(this.competition.endTime);
    this.competition.date = this.formatDate(this.competition.date);
    this.competitionService.addCompetition(this.competition)
        .subscribe((response :any) => {
          this.handleSuccess(response,form);
          this.competition.code = response.data.code;
        }, (error) => {
          this.handleError(error,form);
        });
  }

  // git commit -m "add methode updateCompetition for updating competition"
  updateCompetition(form) {
    // create new
    this.competitionService.updateCompetition(this.competition)
        .subscribe((response :any) => {
          this.handleSuccess(response,form);
        }, (error) => {
          this.handleError(error,form);
        });
  }

  // git commit -m "add submit method for submitting form"
  submit(form) {
    if (form.valid) {
      if (this.pageType === 'add') {
        this.addNewCompetition(form);
      } else {
        this.updateCompetition(form);
      }
    }
  }
  ngOnInit(): void {
    this.featuredImage = "assets/images/illustration/fishing-competition.jpg";
  }
}
