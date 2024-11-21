import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form!:FormGroup;
  fb=inject(FormBuilder);
  authService=inject(AuthService);
  router=inject(Router);
  matSnackBar=inject(MatSnackBar);
  login(){
    this.authService.login(this.form.value).subscribe({
      next:(response)=>{
        this.router.navigate(['/']);
      },
      error:(error)=>{

        this.matSnackBar.open("something went wrong",'Close',{
          duration:5000,
          horizontalPosition:'center'
        }

        );

      },
    });
  }

  ngOnInit(): void {
    this.form=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

}
