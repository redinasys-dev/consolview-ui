import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public isLoading=false;

  constructor(private router:Router, private authService:AuthService){

  }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    customer_type: new FormControl('',[Validators.required]),
  });


  roles=[
    {
      id:1,
      name:"Admin"
    },
    {
      id:2,
      name:"Account Manager"
    },
    {
      id:3,
      name:"Viewer"
    }
  ]

ngOnInit(){
  localStorage.clear();
}
goToRegister(){
  this.router.navigate(['/auth/register-email']);
}

onSubmit(){
  console.warn(this.loginForm.value);

  this.isLoading = true;
  this.authService.login(this.loginForm.value).subscribe((response) => {
    console.log(response);
    this.isLoading = false;
    if(response['status']==200){
      //alert("Login Successful");
      localStorage.setItem('access-token',response['token']);
      localStorage.setItem('name',response['user']['customer_name']);
      localStorage.setItem('customer_type',response['user']['customer_type']);
      this.router.navigate(['/dashboard']);
      //this.message="A verfication link has been sent to your email. Please verify it."
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
    alert('Something went wrong. Please try again')
    //this.makeToast('danger','Login Failed','Something went wrong! Please try again.');
  }
)
  
}
  
}


