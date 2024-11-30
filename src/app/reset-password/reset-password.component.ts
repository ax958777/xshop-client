import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordRequest } from '../interfaces/reset-password-request';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  resetForm: FormGroup;

  route=inject(ActivatedRoute);

  resetPassword={}as ResetPasswordRequest;

  authService=inject(AuthService);

  matSnackBar=inject(MatSnackBar)
  

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.resetPassword.email=params['email'];
      this.resetPassword.token=params['token'];
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid) {
      // Handle password reset logic here
      console.log('Password reset submitted:', this.resetForm.value);
      this.resetPassword.password=this.resetForm.value.password;
      this.authService.resetPassword(this.resetPassword).subscribe({
        next:(response)=>{
          this.matSnackBar.open(response.message,'Close',{
            duration:5000
          });

        },
        error:(error:HttpErrorResponse)=>{
          this.matSnackBar.open(error.error.message,'Close',{
            duration:5000
          });
        }
      });
      
    }
  }
}
