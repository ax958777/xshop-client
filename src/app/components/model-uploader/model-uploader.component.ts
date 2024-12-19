import { Component, EventEmitter, Output } from '@angular/core';
import { UploadFile } from '../../interfaces/upload-file';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileUploadResponse } from '../../interfaces/file-upload-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-uploader',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './model-uploader.component.html',
  styleUrl: './model-uploader.component.css'
})
export class ModelUploaderComponent {
  @Output() filesUploaded=new EventEmitter<string[]>();
  @Output() uploadProgress=new EventEmitter<number>();

  files:UploadFile[]=[];
  isDragging=false;
  isUploading=false;
  apiUrl:string=environment.API_URL;

  constructor(private http:HttpClient){}

  onDragOver(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging=true;
  }
  onDragLeave(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging=false;
  }
  onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.isDragging=false;

    const files=event.dataTransfer?.files;
    if(files){
      this.handleFiles(files);
    }
  }

  handleFiles(fileList:FileList){
    Array.from(fileList).forEach((file)=>{
      /* if(!(file.type.includes('.glb') || file.type.includes('.gltf'))){
        return
      } */
      const reader=new FileReader();
      reader.onload=(e:ProgressEvent<FileReader>)=>{
        this.files.push({
          file:file,
          preview:e.target?.result as string,
          progress:0,
          uploaded:false,
          emited:false,
        });
      };
      reader.readAsDataURL(file);  
    });
  }

  onFileSelected(event:Event){
    const input=event.target as HTMLInputElement;
    if(input.files){
      this.handleFiles(input.files);
    }
  }

  getUploadStatus(){
    const totalFiles=this.files.length;
    const uploadedFiles=this.files.filter((f)=> f.uploaded).length;
    const failedFiles=this.files.filter((f)=>f.error).length;

    return `${uploadedFiles} of ${totalFiles} files uploaded ${failedFiles ?`($(failedFiles) failed)` :''}`;
  }

  allFilesUploaded():boolean{
    return this.isUploading || this.files.every((f)=>f.uploaded);
  }

  buttonDisabled(){
    return this.isUploading || this.files.every((f)=>f.uploaded);
  }

  uploadFiles(e:Event){
    e.preventDefault();
    this.isUploading=true;
    let completedUploads=0;
    const totalFiles=this.files.filter((f)=> !f.uploaded && !f.error).length;

    this.files.forEach((fileObj)=>{
      if(fileObj.uploaded || fileObj.error){
        return;
      }

      const formData=new FormData();
      formData.append('files',fileObj.file);

      this.http
      .post<[FileUploadResponse]>(`${this.apiUrl}file/upload`,formData,{
        reportProgress:true,
        observe:'events'
      })
      .subscribe({
        next:(event:any)=>{
          if(event.type===HttpEventType.UploadProgress){
            fileObj.progress=Math.round(100* (event.loaded/event.total));
            this.updateTotalProgress();
          }else if(event.type===HttpEventType.Response){
            fileObj.uploaded=true;
            fileObj.uploadedUrl=event.body[0].id;
            completedUploads++;
            if(completedUploads===totalFiles){
              this.emitUploadedUrls();
            }
          }
        },
        error:(error)=>{
          fileObj.error='Upload failed';
          completedUploads++;
          if(completedUploads===totalFiles){
            this.emitUploadedUrls();
          }
        },
        complete:()=>{
          this.isUploading=this.files.some((f)=>!f.uploaded && !f.error);
        }
      })

    });

  }

  private updateTotalProgress(){
    const totalProgress=this.files.reduce((acc,file)=>acc+file.progress,0);
    const averageProgress=totalProgress/this.files.length;
    this.uploadProgress.emit(averageProgress);
  }

  private emitUploadedUrls(){
    const urls=this.files.filter((f)=>f.uploaded && !f.emited && f.uploadedUrl)
    .map((f)=>f.uploadedUrl);
    this.filesUploaded.emit(urls);
    this.files.forEach((fileObj)=>{fileObj.emited=true;});
  }
}
