import {Component, OnInit, ViewChild} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent implements OnInit {

  public selectedOption = 10;
  public searchValue = '';
  public ColumnMode = ColumnMode;
  public levelList : any = [];
  public tempData = [];

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor() { }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    this.levelList = this.tempData.filter(function (d) {
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  ngOnInit(): void {
  }

}
