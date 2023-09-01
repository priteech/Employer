import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as empAction from './emp.action';
import { EmployeeData } from '../app/emp.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class EmployeeEffects {
  constructor(private actions$: Actions,
              private http: HttpClient) {
        }

obs=createEffect(()=>
this.actions$.pipe(
  ofType(empAction.GET_EMPLOYEE_LOADING),
  switchMap((action: empAction.GetEmployee)=>
  {
    console.log('action', action)
    return this.http
          .get<EmployeeData[]>('https://jsonplaceholder.typicode.com/users')
          .pipe(
            // tap((res) => console.log(res)),
           tap(res=>console.log('res', res)), map((res: EmployeeData[]) => new empAction.GetEmployeeSuccess(res)),
            catchError(async (err) => new empAction.GetEmployeeError(err))
          );
  })
)
)

// createEffect(()=>
// this.actions$.pipe(
//   ofType(empAction.GET_EMPLOYEE_LOADING),
//   switchMap((action:empAction.GetEmployee) => this.svc)
//   // map(heroes => new GetEmployeeSuccess(employees)),
//   // catchError((err) => [new GetEmployeeError(err)])
// ))
//   // getEmployee$: Observable<Action> = 

// @createEffect()
//   addEmployee$ = this.actions$.pipe(
//     ofType(empAction.ADD_EMPLOYEE),
//     map((action: AddEmployee) => action.payload),
//     switchMap(newEmp => this.svc.insert(newEmp)),
//     map((response) => new AddEmployeeSuccess(response.id)),
//     catchError((err) => [new AddEmployeeError(err)])
//   );

// @createEffect()
//   updateEmployee$ = this.actions$.pipe(
//     ofType(empAction.UPDATE_EMPLOYEE),
//     map((action: UpdateEmployee) => action.payload),
//     switchMap(emp => this.svc.update(emp)),
//     map(() => new UpdateEmployeeSuccess()),
//     catchError((err) => [new empAction.UpdateEmployeeError(err)])
//   );

//   @createEffect()
//   deleteEmployee$ = this.actions$.pipe(
//     ofType(empAction.DELETE_EMPLOYEE),
//     map((action: DeleteEmployee) => action.payload),
//     switchMap(id => this.svc.delete(id)),
//     map((emp: EmployeeData) => new empAction.DeleteEmployeeSuccess(emp)),
//     catchError((err) => [new empAction.DeleteEmployeeError(err)])
//   );
  }