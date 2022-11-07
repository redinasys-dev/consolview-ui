import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  public isLoading:boolean=false;
  public total: number = 0;
	public page: number = 1;
	public limit: number = 10;
  public search: string = '';

  public activeTab: string="aws";
  account_type:string="aws"; 
  awsAccounts=[];
  azureAccounts=[];
  gcpAccounts=[];
  editAWSAccountForm:FormGroup;
  closeResult='';
  data:any;

  constructor(private router:Router, private adminService:AdminService,private activatedRoute: ActivatedRoute,private modalService: NgbModal
    ) {
      
  }

  closeModel(){
		this.modalService.dismissAll();
  }
  
  openEditAccount(content,data) {
		console.log(data);
		this.data=data;	
		this.editAWSAccountForm = new FormGroup({
      account_name: new FormControl(data.account_name,Validators.required),
      description: new FormControl(data.description,Validators.required),
      role_arn: new FormControl(data.role_arn,Validators.required)
		  });
		
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
		 
		  this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
		  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		  //alert('closed')
		});
	  }
	
	  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
		  return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  return 'by clicking on a backdrop';
		} else {
		  return `with: ${reason}`;
		}
    }

    onEditAccountSubmit(){
      //alert('test');
      console.log(this.editAWSAccountForm.value);
      //const body = {status: this.changeStatusForm.value['status'],};
      //console.log(body);
      this.editAWSAccountForm.value['account_type']=this.account_type;
        this.adminService.updateAccount(this.editAWSAccountForm.value,this.data._id).subscribe((response: any) => {
          this.modalService.dismissAll();
          if(response['status']==200){
          alert(response['message']);
          this.getAllAccountsByType();
          }
          else{
            alert(response['message']);
          }
        }, error => {
          this.modalService.dismissAll();
        }
          );
      }


  ngOnInit(): void {
    this.getAllAccountsByType();
  }


  changeTab($event) {
    this.activeTab = $event.id;
    console.log(this.activeTab);
    this.account_type=this.activeTab;
 }

 getAllAccountsByType(){
  this.isLoading = true;
  this.adminService.getAllAccountsByType(this.account_type).subscribe((response) => {
   console.log(response);
   this.isLoading = false;
   if(response['status']==200){
     if(this.account_type=="aws"){
      this.awsAccounts=response['data'];
      this.total=this.awsAccounts.length; 
     }
        
     else if(this.account_type=="azure")
        this.azureAccounts=response["data"];
     else if(this.account_type=="gcp")
        this.gcpAccounts=response["data"]; 

       

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

 public pageChange(page: number): void {
  this.page = page;
  //this.getAllCategory();
}

goToAddAccount(){
  this.router.navigate(['/admin/add-account']);
}

deleteAccount(id){
  if(confirm("Do you really want to delete this account?")){
    this.isLoading = true;
    this.adminService.deleteAccount(id).subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      if(response['status']==200){
        this.getAllAccountsByType();
        alert(response['message'])
        //this.router.navigate(['/admin/account-management']);
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
