import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'https://localhost:44308/api/Report';

  constructor(private http: HttpClient)
  {
  }

  Register(data)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post(this.url + '/Register', data, httpOptions)
  }
  GetReportData(data)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + '/GetReportData', data, httpOptions)
  }
  GetCategories()
  {
    return this.http.get(this.url + '/GetCategories')
  }
  Login(data)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + '/Login', data, httpOptions)
  }

  
}