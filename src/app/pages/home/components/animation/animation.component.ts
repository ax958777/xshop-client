import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { AnimationService } from '../services/animation.service';

@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.css'
})
export class AnimationComponent implements OnInit {
  model;

  @ViewChild('rendererCanvas',{static:true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(public anmServ:AnimationService){
    
  }
  ngOnInit(): void {
    this.modelStatus();
    
    this.anmServ.createScene(this.rendererCanvas);
    this.anmServ.resize();
    this.modelStatus();
 
  }

  modelStatus():void{
    this.model=this.anmServ.theModel;
  }

}
