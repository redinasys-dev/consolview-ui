import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../../shared/shared.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    TabsModule,
    NgxPaginationModule,
    NgbModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
