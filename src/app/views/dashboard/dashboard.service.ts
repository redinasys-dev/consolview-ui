import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment} from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class DashboardService {

    private BASE_URL=environment.baseUrl;

  

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  


  getAllAccountsByType(type:string) {
    return this.httpClient.get(this.BASE_URL + '/account/getAccountsByType?type='+type, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 


  getAllAWSInstances(body) {
    return this.httpClient.post(this.BASE_URL + '/instances/getAWSInstances', JSON.stringify(body), this.httpHeader)
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