import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private router:Router){

  }
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  name:string="";
  customer_type:string="";

  ngOnInit(){
 this.name=localStorage.getItem('name');
 this.customer_type=localStorage.getItem('customer_type');

  }
  logout(){
    if(confirm("Are you sure to logout?")){
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    }
    
  }
}
