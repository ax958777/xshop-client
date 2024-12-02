import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  authService=inject(AuthService);

  matSnackBar=inject(MatSnackBar);

  router=inject(Router);

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.passwordForm.get(field);
    return !!(formField?.invalid && formField?.touched);
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      //console.log('Password change submitted:', this.passwordForm.value);
      // Add your API call here
      this.authService
      .changePassword({
        email:this.authService.getUserDetail()?.email,
        newPassword:this.passwordForm.value.newPassword,
        currentPassword:this.passwordForm.value.currentPassword
      })
      .subscribe({
        next:(response)=>{
          if(response.isSuccess){
            this.matSnackBar.open(response.message,'Close',{
              duration:4000,
            });
            this.authService.logout();
            this.router.navigate(['/login']);
          }else{
            this.matSnackBar.open(response.message,'Close',{
              duration:4000,
            });
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.matSnackBar.open(err.error.message,'Close',{
            duration:4000,
          });
        },
      });
    }
  }
}
