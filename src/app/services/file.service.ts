import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { FileUploadResponse } from '../interfaces/file-upload-response';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl:string=environment.API_URL;

  constructor(private http:HttpClient) { }
  uploadImage(data:FormData):Observable<[FileUploadResponse]>{
    console.log('data',data)
    return this.http.post<[FileUploadResponse]>(`${this.apiUrl}file/upload`, data)
  }
}
