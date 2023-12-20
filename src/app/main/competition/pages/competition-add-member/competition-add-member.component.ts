import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
} from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { CompetitionService } from "../../service/competition.service";

@Component({
  selector: "app-competition-add-member",
  templateUrl: "./competition-add-member.component.html",
  styleUrls: ["./competition-add-member.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CompetitionAddMemberComponent implements OnInit {
  @Input() competitionCode: number | null = null;
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  // public
  public contentHeader: object;
  public rows: any;
  public selected = [];
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
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
    private competitionService: CompetitionService,
    private memberService: MemberService 
  ) {}

  ngOnInit(): void {}
}
