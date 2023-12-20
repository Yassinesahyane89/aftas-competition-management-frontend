import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrOptions } from 'ng2-flatpickr';


// services
import { CompetitionService } from "../../service/competition.service";

// lodash
import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { CustomToastrComponent } from '@core/components/custom-toastr/custom-toastr.component';
@Component({
  selector: "app-competition-add-edit",
  templateUrl: "./competition-add-edit.component.html",
  styleUrls: ["./competition-add-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CompetitionAddEditComponent implements OnInit {
  public contentHeader: object;
  public featuredImage: string;
  public pageType: string;
  public pageTitle: string;
  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
  };
  public fileName = undefined;
  private options: GlobalConfig;

  public code: string;
  public amount: number;
  public numberOfParticipants: number;
  public date: NgbDateStruct;
  public startTime;
  public endTime;
  public location: string;
  public isCompetitionCreated: boolean = false;

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
  isDisabled = (date: NgbDate, current: { month: number; year: number }) =>
    date.month !== current.month;
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
    if (time == null) {
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

  // add formatDate method for formatting date
  formatDate(date: NgbDateStruct) {
    return new Date(date.year, date.month - 1, date.day)
      .toISOString()
      .split("T")[0];
  }

  //

  //add handleSuccess method for handling success case
  handleSuccess(response, form) {
    // change button state
    this.isCompetitionCreated = true;

    // Handle success case
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = "toast ngx-toastr";
    this.toastr.success(response.message, "Success!", customToastrRef);
  }

  //add handleError method for handling error case
  handleError(error, form) {
    if (error.error && error.error.message) {
      const customToastrRef = cloneDeep(this.options);
      customToastrRef.toastComponent = CustomToastrComponent;
      customToastrRef.closeButton = true;
      customToastrRef.tapToDismiss = false;
      customToastrRef.progressBar = true;
      customToastrRef.toastClass = "toast ngx-toastr";
      this.toastr.error("Error!", "Error!", customToastrRef);
    } else if (error && error.error) {
      const validationErrors = error.error;

      Object.keys(validationErrors).forEach((prop) => {
        const formControl = form.controls[prop];
        if (formControl) {
          // activate the error message
          formControl.setErrors({
            serverError: validationErrors[prop][0],
          });
        }
      });
    }
  }

  // git commit -m "add methode addNewCompetition for adding new competition"
  addNewCompetition(form) {
    this.competitionService
      .addCompetition({
        amount: this.amount,
        numberOfParticipants: this.numberOfParticipants,
        date: this.formatDate(this.date),
        startTime: this.formatTime(this.startTime),
        endTime: this.formatTime(this.endTime),
        location: this.location,
      })
      .subscribe(
        (response: any) => {
          this.handleSuccess(response, form);
          this.code = response.data.code;
        },
        (error) => {
          this.handleError(error, form);
        }
      );
  }

  // git commit -m "add methode updateCompetition for updating competition"
  updateCompetition(form) {
    // create new
    this.competitionService.updateCompetition({code:this.code,amount: this.amount, numberOfParticipants: this.numberOfParticipants, date: this.formatDate(this.date), startTime: this.formatTime(this.startTime), endTime: this.formatTime(this.endTime), location: this.location}).subscribe(
      (response: any) => {
        this.handleSuccess(response, form);
      },
      (error) => {
        this.handleError(error, form);
      }
    );
  }

  // git commit -m "add submit method for submitting form"
  submit(form) {
    if (form.valid) {
      if (this.pageType === "add" && this.code == undefined) {
        this.addNewCompetition(form);
      } else {
        this.updateCompetition(form);
      }
    }
  }

  // add checkPageType method for checking page type
  checkPageType() {
    if (window.location.href.indexOf("add") > -1) {
      this.pageType = "add";
      this.pageTitle = "Add New Competition";
    } else {
      this.code = this.route.snapshot.paramMap.get("code");
      this.getCompetitionById(this.code);
      this.pageType = "edit";
      this.pageTitle = "Edit Competition";
    }
  }

  // add getCompetitionById method for getting competition by id
  getCompetitionById(id) {
    this.competitionService
      .getCompetitionById(id)
      .subscribe((response: any) => {
        this.code = response.data.code;
        this.amount = response.data.amount;
        this.numberOfParticipants = response.data.numberOfParticipants;
        this.date = response.data.date;
        this.startTime = response.data.startTime;
        this.endTime = response.data.endTime;
        this.location = response.data.location;
      });
  }

  // add ngOnInit method
  ngOnInit(): void {
    this.featuredImage = "assets/images/illustration/fishing-competition.jpg";
    // check page type
    this.checkPageType();

    // content header
    this.contentHeader = {
      headerTitle: this.pageTitle,
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
            name: "Competition",
            isLink: true,
            link: "/competition/list",
          },
          {
            name: this.pageTitle,
            isLink: false,
          },
        ],
      },
    };
  }
}
