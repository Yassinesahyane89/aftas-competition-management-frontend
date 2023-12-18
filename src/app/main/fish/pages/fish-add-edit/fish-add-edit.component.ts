import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

// services
import {FishService} from "../../service/fish.service";
import {LevelService} from "../../../level/service/level.service";

@Component({
  selector: 'app-fish-add-edit',
  templateUrl: './fish-add-edit.component.html',
  styleUrls: ['./fish-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FishAddEditComponent implements OnInit {
    public contentHeader: object;
    public name = "";
    public weight : number;
    public levelId : number;
    public levelOptions: { id: number, description: string }[] = [];
    public selectedLevelId: number= null;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fishService: FishService,
        private levelService: LevelService,
    ) { }

    ngOnInit(): void {
    }

}
