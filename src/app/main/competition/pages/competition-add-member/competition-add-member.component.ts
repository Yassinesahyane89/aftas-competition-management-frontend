import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
} from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { CompetitionService } from "../../service/competition.service";
import { MemberService } from "app/main/member/service/member.service";


// lodash
import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { CustomToastrComponent } from '@core/components/custom-toastr/custom-toastr.component';

@Component({
  selector: "app-competition-add-member",
  templateUrl: "./competition-add-member.component.html",
  styleUrls: ["./competition-add-member.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CompetitionAddMemberComponent implements OnInit {
  @Input() competitionCode: number | null = null;
  private tempData = [];

  // public
  public contentHeader: object;
  public memberAreNotInCompetition: any;
  public selected = [];
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private options: GlobalConfig;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private competitionService: CompetitionService,
    private memberService: MemberService
  ) {
    this.options = this.toastr.toastrConfig;
  }

  // handle success case
  handleSuccess(response) {
    // redirect to list page /level/list
    this.router.navigate(["/fish/list"]).then((r) => console.log(r));

    // Handle success case
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = "toast ngx-toastr";
    this.toastr.success(response.message, "Success!", customToastrRef);
  }

  // handle error case
  handleError(error) {
    if (error.error && error.error.message) {
      const customToastrRef = cloneDeep(this.options);
      customToastrRef.toastComponent = CustomToastrComponent;
      customToastrRef.closeButton = true;
      customToastrRef.tapToDismiss = false;
      customToastrRef.progressBar = true;
      customToastrRef.toastClass = "toast ngx-toastr";
      this.toastr.error(error.error.message, "Error!", customToastrRef);
    }
  }

  // get all members that are not in competition
  getAllMemberNotInCompetition(competitionCode) {
    this.memberService
      .getAllMemberNotInCompetition(competitionCode)
      .subscribe((memberAreNotInCompetition: any) => {
        this.memberAreNotInCompetition = memberAreNotInCompetition;
        this.tempData = memberAreNotInCompetition;
      });
  }

  // add new member
  addNewMember() {
    this.competitionService
      .registerMemberToCompetition({
        competitionCode: this.competitionCode,
        memberId: this.selected,
      })
      .subscribe(
        (response: any) => {
          this.handleSuccess(response);
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  // submit form
  submit() {
    this.addNewMember();
  }

  ngOnInit(): void {
    this.getAllMemberNotInCompetition(this.competitionCode);

    // content header
    this.contentHeader = {
      headerTitle: "Datatables",
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
            name: "Forms & Tables",
            isLink: true,
            link: "/",
          },
          {
            name: "Datatables",
            isLink: false,
          },
        ],
      },
    };
  }
}
