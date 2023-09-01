import * as empAction from './emp.action';
import { AppAction } from 'src/app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { EmployeeData } from 'src/app/emp.model';

export interface AppState {
    data: EmployeeData[];
    selected: any;
    action: string;
    done: boolean;
    error?: Error;
}

const initialState: AppState = {
    data: [],
    selected: undefined,
    action: '',
    done: false
  
};

export function reducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
     // GET Emp actions
    case empAction.GET_EMPLOYEE_LOADING:
      return {
        ...state,
        action: empAction.GET_EMPLOYEE_LOADING,
        done: false,
        // error: null
      };
    case empAction.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        // selected: null,
        // error: null
      };
    case empAction.GET_EMPLOYEE_ERROR:
      return {
        ...state,
        done: true,
        // selected: null,
        error: action.payload
      }; 

     // ADD Employee actions
    
    case empAction.ADD_EMPLOYEE:
      return {
        ...state,
        selected: action.payload,
        action: empAction.ADD_EMPLOYEE,
        done: false,
        // error: null
      };
    case empAction.ADD_EMPLOYEE_SUCCESS:
      {
        const newEmp = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newEmp
        ];
        return {
          ...state,
          data,
        //   selected: null,
        //   error: null,
          done: true
        };
      }
    case empAction.ADD_EMPLOYEE_ERROR:
      return {
        ...state,
        // selected: null,
        done: true,
        error: action.payload
      };

     
     // UPDATE EMPLOYEE 
     
    case empAction.UPDATE_EMPLOYEE:
      return {
        ...state,
        selected: action.payload,
        action: empAction.UPDATE_EMPLOYEE,
        done: false,
      
      };
    case empAction.UPDATE_EMPLOYEE_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
          
          };
        }
        return state;
      }
    case empAction.UPDATE_EMPLOYEE_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

     
     // DELETE EMPLOYEE
    
    case empAction.DELETE_EMPLOYEE:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: empAction.DELETE_EMPLOYEE,
          done: false,
         
        };
      }
    case empAction.DELETE_EMPLOYEE_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          done: true
        };
      }
    case empAction.DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}


 //SELECTORS
 
export const getEmployeeState = createFeatureSelector<AppState> ('employee');
export const getAllGames = createSelector(getEmployeeState, (state: AppState) => state.data);
export const getEmployee = createSelector(getEmployeeState, (state: AppState) => {
  if (state.action === empAction.GET_EMPLOYEE_LOADING && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isLoaded = createSelector(getEmployeeState, (state: AppState) =>
  state.action === empAction.GET_EMPLOYEE_SUCCESS && state.done && !state.error);

export const isDeleted = createSelector(getEmployeeState, (state: AppState) =>
  state.action === empAction.DELETE_EMPLOYEE && state.done && !state.error);

export const isCreated = createSelector(getEmployeeState, (state: AppState) =>
 state.action === empAction.ADD_EMPLOYEE && state.done && !state.error);

export const isUpdated = createSelector(getEmployeeState, (state: AppState) =>
 state.action === empAction.UPDATE_EMPLOYEE && state.done && !state.error);

export const getDeleteError = createSelector(getEmployeeState, (state: AppState) => {
  return state.action === empAction.DELETE_EMPLOYEE
    ? state.error
   : null;
});
export const getCreateError = createSelector(getEmployeeState, (state: AppState) => {
  return state.action === empAction.ADD_EMPLOYEE
    ? state.error
   : null;
});
export const getUpdateError = createSelector(getEmployeeState, (state: AppState) => {
  return state.action === empAction.UPDATE_EMPLOYEE
    ? state.error
   : null;
});
