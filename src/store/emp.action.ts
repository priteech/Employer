import { Action, createAction, props } from '@ngrx/store';
import { EmployeeData } from "src/app/emp.model";

export const GET_EMPLOYEE_LOADING = '[ALL]load employee';
export const GET_EMPLOYEE_SUCCESS = '[ALL]load employee success';
export const GET_EMPLOYEE_ERROR = '[ALL]load employee error';

export const ADD_EMPLOYEE = '[ADD]add employee';
export const ADD_EMPLOYEE_SUCCESS = '[ADD]add employee success';
export const ADD_EMPLOYEE_ERROR= '[ADD]add employee error';

export const UPDATE_EMPLOYEE = '[UPDATE]update employee';
export const UPDATE_EMPLOYEE_SUCCESS = '[UPDATE]update employee success';
export const UPDATE_EMPLOYEE_ERROR='[UPDATE]update employee error';

export const DELETE_EMPLOYEE = '[DELETE]delete employee';
export const DELETE_EMPLOYEE_SUCCESS = '[DELETE]delete employee success';
export const DELETE_EMPLOYEE_ERROR='[DELETE] delete employee error';

export class GetEmployee implements Action {
    readonly type = GET_EMPLOYEE_LOADING;
  }
export class GetEmployeeSuccess implements Action {
    readonly type = GET_EMPLOYEE_SUCCESS;
    constructor(public payload: EmployeeData[]) {
    }
  }
export class GetEmployeeError implements Action {
    readonly type = GET_EMPLOYEE_ERROR;
    constructor(public payload: Error) {
    }
  }

  // ADD//

export class AddEmployee implements Action {
  readonly type = ADD_EMPLOYEE;
  constructor(public payload: EmployeeData) {
  }
}

export class AddEmployeeSuccess implements Action {
  readonly type = ADD_EMPLOYEE_SUCCESS;
  constructor(public payload: number) {
  }
}
export class AddEmployeeError implements Action {
    readonly type = ADD_EMPLOYEE_ERROR;
    constructor(public payload: Error) {
    }
  }


// UPDATE
export class UpdateEmployee implements Action {
  readonly type = UPDATE_EMPLOYEE;
  constructor(public payload: EmployeeData) {
  }
}

export class UpdateEmployeeSuccess implements Action {
  readonly type = UPDATE_EMPLOYEE_SUCCESS;
//   constructor(public payload: number) {
//   }

}
export class UpdateEmployeeError implements Action {
    readonly type = UPDATE_EMPLOYEE_ERROR;
    constructor(public payload: Error) {
    }
}

// DELETE

export class DeleteEmployee implements Action {
    readonly type = DELETE_EMPLOYEE;
    constructor(public payload: number) {
    }
  }
  
export class DeleteEmployeeSuccess implements Action {
    readonly type = DELETE_EMPLOYEE_SUCCESS;
    constructor(public payload: EmployeeData) {
    }
  }

export class DeleteEmployeeError implements Action {
    readonly type = DELETE_EMPLOYEE_ERROR;
  
    constructor(public payload: Error) {
    }
  }



