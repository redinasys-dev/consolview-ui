
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AuthRoutingModule } from './auth-routing.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule
    
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterEmailComponent,
    VerifyEmailComponent
  ],
})
export class AuthModule {
}
