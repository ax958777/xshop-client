import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plant-identifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-identifier.component.html',
  styleUrl: './plant-identifier.component.css'
})
export class PlantIdentifierComponent {
  selectedFile:File|null=null;
  selectedImage:string|null=null;
  isLoading:boolean=false;
  plantInfo:string|null=null;

  onFileSelected(event:any):void{
    //console.log(event)
    this.selectedFile=event.target.files[0];
    if(this.selectedFile){
      const reader=new FileReader();
      reader.onload=(e:any)=>{
        this.selectedImage=e.target.result
      }
      reader.readAsDataURL(this.selectedFile)
      console.log(this.selectedFile)
      console.log(this.selectedImage)
    }else{
      this.selectedImage=null;
    }
  }

  identifyPlantOrRedirect():void{

  }

}
