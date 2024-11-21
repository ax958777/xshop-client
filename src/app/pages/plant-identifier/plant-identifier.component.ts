import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { AuthService } from '../../services/auth.service';


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

  geminiService=inject(GeminiService);
  authService=inject(AuthService);

  onFileSelected(event:any):void{
    //console.log(event)
    this.selectedFile=event.target.files[0];
    if(this.selectedFile){
      const reader=new FileReader();
      reader.onload=(e:any)=>{
        this.selectedImage=e.target.result
      }
      reader.readAsDataURL(this.selectedFile)
      //console.log(this.selectedFile)
      //console.log(this.selectedImage)
    }else{
      this.selectedImage=null;
    }
  }

  async identifyPlantOrRedirect():Promise<void>{
    //TODO:Authorizathion
    if(this.authService.isLoggedIn()){
      if(this.authService.HasCredit()){
        await this.identifyPlant();
      }
    }else{
      if(this.authService.isInTrail()){
        await this.identifyPlant();
        this.authService.deTrail();
      }else{
        //Todo: Open a dialog
        alert('Your trail peroid is end.')
      }
    }
   

  }

  async identifyPlant(): Promise<void> {
    if(!this.selectedFile){
      alert("Please select an image first.");
      return;
    }
    
    this.isLoading=true;
    const reader=new FileReader();
    reader.onload=async(e:any)=>{
      const imageData=e.target.result.split(',')[1];
      console.log('imageData',imageData)
      try{
        this.plantInfo=await this.geminiService.identifyPlant(imageData);

      } catch (error) {
        console.error('Error identifying plant:', error);
        this.plantInfo='An error occurred while identifying the plant.'

      } finally {
        this.isLoading=false;

      }
    };
    reader.readAsDataURL(this.selectedFile);

  }

}


