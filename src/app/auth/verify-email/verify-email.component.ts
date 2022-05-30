import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  sub;
  email;
  public isLoading = false;
  constructor(private activatedroute:ActivatedRoute, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.sub=this.activatedroute.paramMap.subscribe(params => { 
      console.log(params);
       this.email = params.get('email'); 
       console.log(this.email);
       this.verifyEmail();
      
   });
  }

  verifyEmail(){
    this.isLoading=true;
    const email=this.email;
    this.authService.verifyEmail(email).subscribe((response) => {
      console.log(response);
      this.isLoading=false;
      if(response['status']==200){
        localStorage.setItem("email",this.email);
        alert(response['message']);
        this.router.navigate(['/auth/register']);
        //this.message="A verfication link has been sent to your email. Please verify it."
      }
      else if(response['status']==201){
        alert(response['message']);
        this.router.navigate(['/auth/login']);
        
       }
       else if(response['status']==202){
        localStorage.setItem("email",this.email); 
        alert(response['message']);
        this.router.navigate(['/auth/register']);
        
       } 
      else{
       alert(response['message']);
       this.router.navigate(['/auth/login']);
       
      }
    },
    (error) => {
      //alert(response['message']);
      this.isLoading=false;
      console.log(error.error);
      alert('Something went wrong. Please try again');
      this.router.navigate(['/auth/login']);
      //this.makeToast('danger','Login Failed','Something went wrong! Please try again.');
    }
  )
    
  }


}
