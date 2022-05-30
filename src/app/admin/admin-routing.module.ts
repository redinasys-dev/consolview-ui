
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AddEditUserComponent } from './user-management/add-edit-user/add-edit-user.component';
import { AddEditAccountComponent } from './account-management/add-edit-account/add-edit-account.component';


export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-management',
        component: UserManagementComponent,
        data: {
          title: 'User Management'
        }
      },
      {
        path: 'add-user',
        component: AddEditUserComponent,
        data: {
          title: 'Add User'
        }
      },
      {
        path: 'edit-user/:id',
        component: AddEditUserComponent,
        data: {
          title: 'Edit User'
        }
      },
      {
        path: 'account-management',
        component: AccountManagementComponent,
        data: {
          title: 'Account Management'
        }
      },
      {
        path: 'add-account',
        component: AddEditAccountComponent,
        data: {
          title: 'Add Account'
        }
      },

      {
        path: 'edit-account/:id',
        component: AddEditAccountComponent,
        data: {
          title: 'Edit Account'
        }
      },
     
      {
        path: '',
        redirectTo: 'user-management',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
