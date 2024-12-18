import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelingRequest } from '../../interfaces/modeling-request';
import { CoreService } from '../../services/core.service';
import { ModelService } from '../../services/model.service';
import { ModelUploaderComponent } from '../model-uploader/model-uploader.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-model-add-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModelUploaderComponent, 
    MatIconModule,
  ],
  templateUrl: './model-add-edit-dialog.component.html',
  styleUrl: './model-add-edit-dialog.component.css'
})
export class ModelAddEditDialogComponent implements OnInit{
  form!:FormGroup;
  fb=inject(FormBuilder);

  categories=['Construction','Machine','Products','Games','Cosmics'];

  isSubmiting:boolean=false;

  private _dialogRef=inject(MatDialogRef<ModelAddEditDialogComponent>);
  private _coreService=inject(CoreService);
  private _mdlService=inject(ModelService);

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
  ngOnInit(): void {
    this.form=this.fb.group({
      name:['',[Validators.required]],
      category:['',[Validators.required]],
      price:[0,[Validators.required]],
      description:['',[Validators.required]],
    });
    this.form.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.form.valid){
      this.isSubmiting=true;
      const modelData:ModelingRequest={
        ...this.form.value,
      
      }
      if(this.data){
        this._mdlService.updateModeling(this.data.id,modelData).subscribe({
          next:(val:any)=>{
            this._coreService.openSnackBar('3D Model updated successfully.','Done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            this.isSubmiting=false;
          },
          complete:()=>{
            this.isSubmiting=false;
          }
        });

      }else{
        this._mdlService.addModeling(modelData).subscribe({
          next:(val:any)=>{
            this._coreService.openSnackBar('3D Model added successfully.','Done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            this.isSubmiting=false;
          },
          complete:()=>{
            this.isSubmiting=false;
          }
        });
      }
    }

  }
  onCancelClick(){
     this._dialogRef.close();
  }
}
