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

    // get level list
    getLevelList() {
        this.levelService.getAllLevel().
        subscribe(
            (response: any) => {
            this.levelOptions = response.data;
        },
        (error) => {
            this.router.navigate([`/fish/list`]);
        }
        );
    }

    // get fish by id
    getFishById(id) {
        this.fishService.getFishById(id).
        subscribe(
            (response: any) => {
            this.name = response.data.name;
            this.weight = response.data.weight;
            this.selectedLevelId = response.data.level.id;
        },
        (error) => {
            this.router.navigate([`/fish/list`]);
        }
        );
    }

}
