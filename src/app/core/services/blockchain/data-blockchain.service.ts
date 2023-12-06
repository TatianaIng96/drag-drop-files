import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, map, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataBlockchainService {

  private readonly infuraApiKey = environment.apiKey; // Reemplaza con tu clave de API de Infura
  private readonly infuraUrl = environment.infuraURL;

  constructor(private http: HttpClient) { }

  getHeaders(req: number): HttpHeaders{
    if(req === 1){
        return new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":"*",
          "Access-Control-Request-Method": "POST"
          }
        )
    }else{
      return new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlciI6IjYzZmNlNDgwZjIzNDY5MWYyNjU0YjkzZCIsIm9yZ2FuaXphdGlvbiI6IjYzZmNlNDdlNmVmNmQ5ZmQ5ODM2MjA1ZCJ9LCJpYXQiOjE3MDE4MjkyNjQsImV4cCI6MTcwNzAxMzI2NH0.JbfiDebhV3N-IqbnPVg4iPWxHDQzUoPOjxYd6zTrPKY"
        }
      )
    }
  }

  loginBlockchainNetwork(): Observable<any>{
    const body = {
      email : "support@lineadecodigo.net",
      password : "123456"
    }

    return this.http.post<any>('https://sandbox-eda.lineadecodigo.net/v1/auth/login', body, {
      headers: this.getHeaders(1)
    })
      .pipe(map(
        (response)=> response,
        (error:any)=> error
      ));
  }

  sendDataToBlockchain(name:any, hash:any, token: any ){
    const endpoint = 'https://sandbox-eda.lineadecodigo.net/v1/transaction/resources/assets';
    const body = JSON.stringify({
     name: name,
     hash: hash
    });
    console.log("hash: ", hash, " name: ", name);
    return this.http.post<any>(endpoint, body, {
      headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}
    })
      .pipe(map(
        (response)=> response,
        (error:any)=> error
      ));
  }
}
