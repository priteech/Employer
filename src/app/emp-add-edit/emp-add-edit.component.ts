import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent{  
[x: string]: any;
empForm: FormGroup;
constructor(
  private _fb: FormBuilder, 
  private _empService: UsersService, 
  private _dialogRef:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  
  )


  {
  this.empForm =this._fb.group({
    id:this._fb.control(0),
    name:this._fb.control('', Validators.required),
    username:this._fb.control('', Validators.required),
    email:this._fb.control('', Validators.compose([Validators.required, Validators.email])),
    action:this._fb.control('', Validators.required),

  });
}
onFormSubmit(){
  if (this.empForm.valid){
    console.log(this.empForm)
    if(this.data){
      this._empService.updateUsersList(this.data.id, this.empForm.value).subscribe({
        next: (val: any)=>{
          alert('Update Successfully');
          this._dialogRef.close(true);
        },
        error: (err: any)=>{
          console.log(err);
        },
        })
    }
    else
    {
      this._empService.addUsers(this.empForm.value).subscribe({
        next: (val: any)=>{
          alert('added Successfully');
          this._dialogRef.close(true);
        },
        error: (err: any)=>{
          console.log(err);
        },  
      }) 
    }   
  
  }
}
}

