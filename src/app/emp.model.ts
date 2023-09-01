

export interface EmployeeData{
    id:number;
    name:string;
    username:string;
    email: string;  
}

export interface EmpModel{
    list: EmployeeData[];
    empdataObject: EmployeeData,
    errormessage: string
    

}