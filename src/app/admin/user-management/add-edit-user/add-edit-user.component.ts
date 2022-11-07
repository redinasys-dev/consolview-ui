import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  public isLoading=false;
  public userId: string = null;
  public user:any;
  public add_user_msg='Signup User';
  public muted_title="Add new user";
  registerForm:FormGroup;
  constructor(private router:Router, private adminService:AdminService,private activatedRoute: ActivatedRoute
    ) {
      

  }

  public getUserById(): void {
		this.isLoading = true;
		this.adminService.getUserById(this.userId).subscribe((res: any) => {
			this.isLoading = false;
      this.user = res.data;
      this.add_user_msg="Update User";
      this.muted_title="Edit below fields to update user";
      console.log(this.user);
      this.registerForm = new FormGroup({
        fullname: new FormControl(this.user[0]['customer_name'],[Validators.required]),
        email: new FormControl(this.user[0]['email'],[Validators.required, Validators.email]),
        password: new FormControl(this.user[0]['password'],[Validators.required]),
        role_id: new FormControl(this.user[0]['role_id'],[Validators.required]),
      });
			
		}, error => this.isLoading = false);
  }
  



  


  roles=[
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

  this.registerForm = new FormGroup({
    fullname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    role_id: new FormControl('',[Validators.required]),
  });


  this.activatedRoute.params.subscribe(params => {
    this.userId = params['id'];
    if (this.userId) this.getUserById();
    
    console.log(this.user);
  

    
  })

}



onSubmit(){
  console.warn(this.registerForm.value);

  if(this.userId){
    console.log("Edit"+this.userId)
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
 ) 
  }
  else{
   this.isLoading = true;
   this.adminService.registerUser(this.registerForm.value).subscribe((response) => {
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
) 
  }

  
  
} 

}
