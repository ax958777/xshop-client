import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private genAI:GoogleGenerativeAI;

  constructor() { 
    this.genAI=new GoogleGenerativeAI(environment.GEMINI_API_KEY);
  }

  async identifyPlant(imageData:string):Promise<string>{
    const model=this.genAI.getGenerativeModel({
      model:'gemini-1.5-flash'
    });

    const prompt= 'Identify this plant and provide its name and important information';
    const result=await model.generateContent([prompt,{inlineData:{

      data:imageData,
      mimeType:'image/jpeg'
    }}]);
    const response=await result.response;
    return response.text();
  }

}
