import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes, Router } from "@angular/router";
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { CoreCommonModule } from "@core/common.module";
import { CoreDirectivesModule } from "@core/directives/directives";

// fish
import { FishListComponent } from "./pages/fish-list/fish-list.component";
import {FishAddEditComponent} from "./pages/fish-add-edit/fish-add-edit.component";

const routes: Routes = [
    {
        path: "list",
        component: FishListComponent,
        data: { animation: "FishListComponent" },
    },
    {
        path: "add",
        component: FishAddEditComponent,
        data: { animation: "toastr" },
    },
    {
        path: "edit/:id",
        component: FishAddEditComponent,
        data: { animation: "FishAddEditComponent" },
    },
    {
        path: "**",
        redirectTo: "list",
        pathMatch: "full",
    },
];
@NgModule({
  declarations: [FishAddEditComponent, FishListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    NgbModule,
    CoreCommonModule,
    CoreDirectivesModule,
    ContentHeaderModule,
    ToastrModule,
    NgSelectModule,
  ]
})
export class FishModule { }
