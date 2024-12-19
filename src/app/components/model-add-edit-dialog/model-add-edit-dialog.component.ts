import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelingRequest } from '../../interfaces/modeling-request';
import { CoreService } from '../../services/core.service';
import { ModelService } from '../../services/model.service';
import { ModelUploaderComponent } from '../model-uploader/model-uploader.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';
import { ThreedPreviewComponent } from '../threed-preview/threed-preview.component';

@Component({
  selector: 'app-model-add-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModelUploaderComponent, 
    MatIconModule,
    ThreedPreviewComponent,
  ],
  templateUrl: './model-add-edit-dialog.component.html',
  styleUrl: './model-add-edit-dialog.component.css'
})
export class ModelAddEditDialogComponent implements OnInit{
  form!:FormGroup;
  fb=inject(FormBuilder);
  apiUrl:string=environment.API_URL;


  categories=['Construction','Machine','Products','Games','Cosmics'];

  isSubmiting:boolean=false;

  uploadProgress=0;

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
      models:[[]],
    });
    this.form.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.form.valid){
      this.isSubmiting=true;
      const modelData:ModelingRequest={
        ...this.form.value,
        models:this.form.get('models')?.value || [],
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

  getModelUrl(fileId:String){
    return this.apiUrl+'file/' + fileId;
  }

  removeModel(model:string,e:Event){
    e.preventDefault();
    const index=this.form.get('models').value.indexOf(model);
    if(index>-1){
      this.form.get('models').value.splice(index,1);
    }
  }

  onFilesUploaded(urls:string[]){
    this.form.get('models')? this.form.get('models').value.push(...urls)
    :this.form.patchValue({models:urls});
  }

  onUploadProgress(progress:number){
    this.uploadProgress=progress;
  }
}
