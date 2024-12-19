export interface UploadFile {
    file:File;
    preview:string;
    progress:number;
    uploaded:boolean;
    emited:boolean;
    error?:string;
    uploadedUrl?:string;
}
