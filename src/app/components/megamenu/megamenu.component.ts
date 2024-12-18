import { Component, inject,ChangeDetectionStrategy, } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule} from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-megamenu',
  standalone: true,
  imports: [
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegamenuComponent {

  authService=inject(AuthService);
  matSnackBar=inject(MatSnackBar);
  router=inject(Router);

  logout=()=>{
    this.authService.logout();
    this.matSnackBar.open('Logout success', 'Close',{
      duration:5000,
      horizontalPosition:'center'
    });
    this.router.navigate(['/login']);
  }

}
