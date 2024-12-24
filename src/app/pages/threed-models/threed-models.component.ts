import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModelService } from '../../services/model.service';
import { ThreedPreviewComponent } from '../../components/threed-preview/threed-preview.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-threed-models',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    ThreedPreviewComponent,
  ],
  templateUrl: './threed-models.component.html',
  styleUrl: './threed-models.component.css'
})
export class ThreedModelsComponent {
  apiUrl:string=environment.API_URL;
  modelService=inject(ModelService);
  models$=this.modelService.getAllModels();
  categories=['Construction','Machine','Products','Games','Cosmics'];
  selectedCategory:string='Cosmics';
  selectCategory(category:string){
    this.selectedCategory=category;
  }
  getModelUrl(fileId:String){
    return this.apiUrl+'file/' + fileId;
  }
}
