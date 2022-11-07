import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private BASE_URL=environment.baseUrl;

  

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  

   registerEmail(body) {
    return this.httpClient.post(this.BASE_URL + '/auth/sendVerificationEmail', JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 
  
  registerCustomer(body) {
    return this.httpClient.post(this.BASE_URL + '/auth/customerSignup', JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 

  login(body) {
    return this.httpClient.post(this.BASE_URL + '/auth/loginCustomer', JSON.stringify(body), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  verifyEmail(email) {
    return this.httpClient.post(this.BASE_URL + '/auth/verifyEmail/'+email, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  

  getCountries() {
    return this.httpClient.get(this.BASE_URL + '/dropdown/getAllCountries/', this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  } 
 

  /* isAuth(){
      const token=localStorage.getItem('AuthToken');
      return token!=null;
  } */


  isAuth(){
    const token=localStorage.getItem('access-token');
    return token!=null;
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