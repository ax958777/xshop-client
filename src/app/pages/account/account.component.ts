////@ts-nocheck
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserDetailResponse } from '../../interfaces/user-detail-response';
import { UserDetailsService } from '../../services/user-details.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FileService } from '../../services/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateUserRequest } from '../../interfaces/update-user-request';
import { FileUploadResponse,  } from '../../interfaces/file-upload-response';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [DatePipe,AsyncPipe,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  fileService=inject(FileService);

  userAvatarUrl:string|null=null;

  public apiUrl:string=environment.API_URL;
 
  userDeatlsService=inject(UserDetailsService)
  user$=this.userDeatlsService.getUserDetails()

  onFileSelected(event:any):void{
        const file:File = event.target.files[0];
        //console.log(file);
      
        if (file) {

            const formData = new FormData();
            formData.append("files", file);

            const upload$ = this.fileService.uploadImage(formData);
            upload$.subscribe({
              next:(response:[FileUploadResponse])=>{
                //console.log(response);
                const user:UpdateUserRequest={
                  Avatar:response[0].id
                };
                console.log(user);
                this.userDeatlsService.updateUser(user).subscribe({
                  next:()=>{
                    this.user$=this.userDeatlsService.getUserDetails();
                    this.userAvatarUrl=`${this.apiUrl}file/${user.Avatar}`

                  },
                  error:()=>{

                  },
                });
                
              },
              error:(error:HttpErrorResponse)=>{

              }
            });


        }
    
  }

}
