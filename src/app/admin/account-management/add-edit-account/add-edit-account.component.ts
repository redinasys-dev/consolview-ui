import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';



@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {

  public isLoading=false;
  accountForm:FormGroup;
  accountId:string;
  public activeTab: string="aws";
  account_type:string="aws"; 
  constructor(private router:Router, private adminService:AdminService,private activatedRoute: ActivatedRoute
    ) {
      

  }

ngOnInit(){

  this.accountForm = new FormGroup({
    account_name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    role_arn: new FormControl('',[Validators.required])
      });


  this.activatedRoute.params.subscribe(params => {
    this.accountId = params['id'];
    //if (this.accountId) this.getAccountById();
    
    //console.log(this.user);
  

    
  })

}

onAWSSubmit(){
  console.warn(this.accountForm.value);

  this.accountForm.value['account_type']=this.activeTab;

  if(this.accountId){
    /* console.log("Edit"+this.accountId)
    this.isLoading = true;
    this.adminService.updateUser(this.registerForm.value,this.userId).subscribe((response) => {
     console.log(response);
     this.isLoading = false;
     if(response['status']==200){
       alert(response['message'])
       this.router.navigate(['/admin/user-management']);
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
 )  */
  }
  else{
   this.isLoading = true;
   this.adminService.registerAccount(this.accountForm.value).subscribe((response) => {
    console.log(response);
    this.isLoading = false;
    if(response['status']==200){
      alert(response['message'])
      this.router.navigate(['/admin/account-management']);
    }
    else{
     this.isLoading = false;
     alert(response['message']);
     
    }
  },
  (error) => {

    this.isLoading = false;
    console.log(error.error);
    alert('Something went wrong. Please try again')
  } 
) 
  }

} 



changeTab($event) {
   this.activeTab = $event.id;
   console.log(this.activeTab);
   this.account_type=this.activeTab;
}




getAllAccountsByType(){

}

copyText(id){
  //alert(id);
   /* Get the text field */
   var copyText = document.getElementById(id)  as HTMLInputElement | null;

   /* Select the text field */
   copyText.select();
   copyText.setSelectionRange(0, 99999); /* For mobile devices */
 
    /* Copy the text inside the text field */
   navigator.clipboard.writeText(copyText.value);
 
   /* Alert the copied text */
   alert("Copied the text: " + copyText.value);
}

}