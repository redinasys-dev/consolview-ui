import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class AdminService {

    private BASE_URL=environment.baseUrl;

  

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  registerUser(body) {
    return this.httpClient.post(this.BASE_URL + '/user/create', JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 

  updateUser(body,id) {
    return this.httpClient.post(this.BASE_URL + '/user/update/'+id, JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 

  deleteUser(id) {
    return this.httpClient.post(this.BASE_URL + '/user/delete/'+id, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 

  updateUserStatus(body,id) {
    return this.httpClient.post(this.BASE_URL + '/user/changeActiveStatus/'+id, JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 

  getAllUsers() {
    return this.httpClient.get(this.BASE_URL + '/user/getAll', this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 

  getUserById(userId:string) {
    return this.httpClient.get(this.BASE_URL + '/user/getUserById?id='+userId, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 


  //Account Manangement

  getAllAccountsByType(type:string) {
    return this.httpClient.get(this.BASE_URL + '/account/getAccountsByType?type='+type, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 


  registerAccount(body) {
    return this.httpClient.post(this.BASE_URL + '/account/create', JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
  
  updateAccount(body,id) {
    return this.httpClient.post(this.BASE_URL + '/account/update/'+id, JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 

  deleteAccount(id) {
    return this.httpClient.post(this.BASE_URL + '/account/delete/'+id, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 


  httpError(error) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}