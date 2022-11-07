import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  countries=[];

 

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

  email:string;
  public isLoading=false;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) { 
  this.email=localStorage.getItem('email');

  }

  ngOnInit(){
    this.registerForm =  this.fb.group({
      country: ['',[Validators.required]],
      fullname: ['',[Validators.required]],
      email: [this.email,[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      cpassword: ['',[Validators.required]],
      company: ['',[Validators.required]],
      mobile_number: ['']
    },
    {
      validator: this.checkPasswords
    });

this.getAllCountries();
    

  }

  checkPasswords(group:FormGroup){
    let pass=group.get('password').value;
    let cpass=group.get('cpassword').value;

    return pass===cpass ? null : {notSame:true};

  }

 

  onSubmit(){
    console.warn(this.registerForm.value);

    let data=this.registerForm.value;
    delete data['cpassword'];

    this.isLoading = true;
    this.authService.registerCustomer(data).subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      if(response['status']==200){
        alert(response['message']);
        this.router.navigate(['/auth/login']);
        
      }
      else{
       this.isLoading = false;
       alert(response['message']);
       this.router.navigate(['/auth/login']);
       
      }
    },
    (error) => {
      //alert(response['message']);
      this.isLoading = false;
      console.log(error.error);
      alert('Something went wrong. Please try again')
      this.router.navigate(['/auth/login']);
      //this.makeToast('danger','Login Failed','Something went wrong! Please try again.');
    }
  )
    
  }

  getAllCountries(){
    this.isLoading = true;
    this.authService.getCountries().subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      if(response['status']==200){
       this.countries=response["data"];
      }
     
    },
    (error) => {
      //alert(response['message']);
      this.isLoading = false;
      console.log(error.error);
      alert('Something went wrong.')
      //this.makeToast('danger','Login Failed','Something went wrong! Please try again.');
    }
  )
  }

}
