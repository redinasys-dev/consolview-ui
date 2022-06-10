import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users=[];
  public total: number = 0;
	public page: number = 1;
	public limit: number = 10;
  public search: string = '';
  public isLoading=false;

  constructor(private router:Router, private adminService:AdminService) { }

  ngOnInit(): void {

    

    /* this.users=[
      {
        "fullname":"Rohan",
        "customer_type":"viewer",
        "created_at":new Date()
      },
      {
        "fullname":"Rohit",
        "customer_type":"account_manager",
        "created_at":new Date()
      },
      {
        "fullname":"Sheela",
        "customer_type":"viewer",
        "created_at":new Date()
      },
      {
        "fullname":"Mohit",
        "customer_type":"account_manager",
        "created_at":new Date()
      },
      {
        "fullname":"Rohan",
        "customer_type":"viewer",
        "created_at":new Date()
      },
      {
        "fullname":"Rohit",
        "customer_type":"account_manager",
        "created_at":new Date()
      },
      {
        "fullname":"Sheela",
        "customer_type":"viewer",
        "created_at":new Date()
      },
      {
        "fullname":"Mohit",
        "customer_type":"account_manager",
        "created_at":new Date()
      }
     
    ]; */

   
    this.getAllUsers();
    this.total=this.users.length;
  }

  public pageChange(page: number): void {
		this.page = page;
		//this.getAllCategory();
  }
  
  goToAddUser(){
    this.router.navigate(['/admin/add-user']);
  }

  getAllUsers(){
   this.isLoading = true;
   this.adminService.getAllUsers().subscribe((response) => {
    console.log(response);
    this.isLoading = false;
    if(response['status']==200){
      //alert(response['message'])
      this.users=response['data'];
      //this.router.navigate(['/admin/user-management']);
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

  updateStatus(userId,status){
    console.log(userId,status);
    let data={status:status?1:0}
    this.isLoading = true;
    this.adminService.updateUserStatus(data,userId).subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      if(response['status']==200){
        this.getAllUsers();
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

  deleteUser(userId){
    if(confirm("Do you really want to delete this user?")){
      this.isLoading = true;
      this.adminService.deleteUser(userId).subscribe((response) => {
        console.log(response);
        this.isLoading = false;
        if(response['status']==200){
          this.getAllUsers();
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
