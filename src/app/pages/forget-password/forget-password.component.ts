import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  showEmailSent=false;
  email!:string;

  authService=inject(AuthService)
  matSnackBar=inject(MatSnackBar)

  forgetPassword(){
    this.authService.forgotPassword(this.email).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.matSnackBar.open(response.message,'Close',{
            duration:5000,
          });
          this.showEmailSent=true;
        } else{
          this.matSnackBar.open(response.message,'Close',{
            duration:5000,
          });
        }
      },
      error:(error:HttpErrorResponse)=>{
        this.matSnackBar.open(error.message,'Close',{
          duration:5000,
        });
      },

    });


  }
}
