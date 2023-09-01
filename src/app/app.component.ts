import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { UsersService } from './users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRef } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { EmployeeData } from './emp.model';
import { GetEmployee, GetEmployeeSuccess } from 'src/store/emp.action';
import { AppState } from 'src/store/emp.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentName="app"
  static componentName: any;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = ['id','name', 'username', 'email', 'action'];
  dataSource: MatTableDataSource<EmployeeData> = new MatTableDataSource<EmployeeData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  employeelist!:EmployeeData[];
  datasource:any;
  constructor(
    private _dialog:MatDialog, 
    private _empService: UsersService,
    private store:Store<AppState>
    ){
      // this.dataSource = this.store.select(state => state.data);
    }

    ngOnInit(): void {
 
      this.store.select((state: any) => state).subscribe(
        item=>{        
          // this.employeelist=item;
          if (item['employee']) {          
            this.dataSource = new MatTableDataSource<EmployeeData>(item['employee'].data);
          }        
       
          this.dataSource.sort=this.sort;
           this.dataSource.paginator=this.paginator;
        }
      )

      this.store.dispatch(new GetEmployee());     
     
    }

  openAddEditEmpForm(){
    if(this._dialog.openDialogs.length==0){
   const dialogRef= this._dialog.open(EmpAddEditComponent,{width: '300px'});
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getUsersList();
        // console.log('data loaded')
      }
    }
   }) }
  }
  
  getUsersList(){
    this._empService.getUsersList().subscribe({
    // next:(res)=>{
      
    //   this.store.dispatch(GetEmployeeSuccess({allEmployee:res}))
    
    // },
    // error: console.log,
    });
  }    

  deleteUsersList(id: number){
    console.log('id', id)
    this._empService.deleteUsersList(id).subscribe(val=>{
      this.getUsersList();
      // next(val){ 
      //   if(val){
      //     // this.getUsersList();
      //   }
      // },
      // // next:(_res)=>{
      // //   alert('delete successfully');
      // //   this.getUsersList();
      // //   this._dialog
      // // },
      // error: console.log
      
    });
  }
  
  openEditEmpForm( data: any){
    if(this._dialog.openDialogs.length==0){
    this._dialog.open(EmpAddEditComponent,
       {width: '300px', data,});  
}}
}
