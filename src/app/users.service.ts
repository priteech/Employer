
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
export interface EmployeeData{
  "id":number,
  "name":string,
  "username": string,
  "email": string,
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  Create: any;
  
  constructor(private _http:HttpClient) { }
  addUsers(data: any): Observable<any>{
    return this._http.post('https://jsonplaceholder.typicode.com/users', data);
  }

  getUsersList(){
      return this._http.get<EmployeeData[]>('https://jsonplaceholder.typicode.com/users');
  }

  updateUsersList(id: number, data:EmployeeData): Observable<any>{
    return this._http.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
  }

  deleteUsersList(id: number): Observable<any>{
    return this._http.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
}
  }  
