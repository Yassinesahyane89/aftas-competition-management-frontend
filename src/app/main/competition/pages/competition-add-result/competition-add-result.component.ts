import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
} from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";

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
import {FishService} from "../../../fish/service/fish.service";
import {HuntingService} from "../../../hunting/service/hunting.service";
@Component({
  selector: 'app-competition-add-result',
  templateUrl: './competition-add-result.component.html',
  styleUrls: ['./competition-add-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompetitionAddResultComponent implements OnInit {

  // public
  @Input() competitionCode: number | null = null;
  public contentHeader: object;
  public memberAreInCompetition: any;
  public FullName:any
  public fishList: any;
  public averageWeight: number;
  public selectedFish = false;
  public selectedMember ;
  public selectedMemberId;
  public selected  = [];
  public basicSelectedOption: number = 10;
  selectedFishId:number;
  public fishName:String;
  public Fishid:number;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private options: GlobalConfig;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  private tempData = [];

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
      private memberService: MemberService,
      private fishService: FishService,
      private huntingService: HuntingService
  ) {
    this.options = this.toastr.toastrConfig;
  }

  handleSuccess(response) {
    // redirect to list page /level/list

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

  //get all members that are in competition
    getMembersAreInCompetition() {
        this.memberService
        .getAllMemberInCompetition(this.competitionCode)
        .subscribe((response:any) => {
            this.memberAreInCompetition = response.data;
            this.tempData = response;
        });
    }

    // update rank of competition
    updateRankOfCompetition() {
        console.log(this.competitionCode);
        this.competitionService
        .updateRankOfCompetition(this.competitionCode)
        .subscribe((response:any) => {
            this.memberAreInCompetition = response.data;
        });
    }

    //get all fish
    getAllFish() {
        this.selectedFish = true;
        this.fishService.getAllFish().subscribe((response: any) => {
            this.fishList = response.data;
            this.selectedFish = false;
        });
    }

    //add hunting result
    addHuntingResult() {
      const selectedIds:number[] = this.selected.map(({ id }) => id);
      console.log(selectedIds)
        this.huntingService.addHuntingResult({code:this.competitionCode, fishId:this.selectedFishId, averageWeight:this.averageWeight, membershipNumber:this.selectedMemberId})
            .subscribe((response: any) => {
            this.handleSuccess(response);
            this.updateRankOfCompetition();
        }, (error) => {
            this.handleError(error);
        });
    }

  submit(form) {
    if (form.valid) {
      this.addHuntingResult();
    }
  }

  submit1(){

  }

    ngOnInit(): void {
        this.updateRankOfCompetition();
        this.getAllFish();
    }
}
