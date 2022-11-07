
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



import { AdminRoutingModule } from './admin-routing.module';


import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AddEditUserComponent } from './user-management/add-edit-user/add-edit-user.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { AddEditAccountComponent } from './account-management/add-edit-account/add-edit-account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    NgxPaginationModule,
    TabsModule,
    NgbModule
    
  ],
  declarations: [
      UserManagementComponent,
      AccountManagementComponent,
      AddEditUserComponent,
      AddEditAccountComponent
  ],
})
export class AdminModule {
}
