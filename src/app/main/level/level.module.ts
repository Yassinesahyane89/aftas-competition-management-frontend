import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// level
import { LevelListComponent } from "./pages/level-list/level-list.component";
import {LevelAddEditComponent} from "./pages/level-add-edit/level-add-edit.component";

@NgModule({
  declarations: [LevelListComponent, LevelAddEditComponent],
  imports: [
    CommonModule
  ]
})
export class LevelModule { }
