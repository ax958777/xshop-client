import { Component } from '@angular/core';
import { AnimationComponent } from './components/animation/animation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AnimationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
