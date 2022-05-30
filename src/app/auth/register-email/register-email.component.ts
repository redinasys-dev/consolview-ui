import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-email',
  templateUrl: 'register-email.component.html'
})
export class RegisterEmailComponent {

  emailForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  });

  message="";
  public isLoading = false;

  constructor(private authService:AuthService) { }

  onSubmit(){
    console.warn(this.emailForm.value);
    const email=this.emailForm.value['email'];

    let body={ "email":email};
    this.isLoading = true;
    this.authService.registerEmail(body).subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      if(response['status']==200){
        alert(response['message']);
        //this.router.navigate(['/admin/dashboard']);
        this.message="A verfication link has been sent to your email. Please verify it."
      }
      else{
       this.isLoading = false;
       alert(response['message']);
       
      }
    },
    (error) => {
      //alert(response['message']);
      this.isLoading = false;
      console.log(error.error);
      alert('Email not sent. Please try again')
      //this.makeToast('danger','Login Failed','Something went wrong! Please try again.');
    }
  )
    
  }

}
