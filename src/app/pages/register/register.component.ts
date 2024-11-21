import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  form!:FormGroup;
  authService=inject(AuthService);
  router=inject(Router);
  matSnackBar=inject(MatSnackBar);
  fb=inject(FormBuilder);

  ngOnInit(): void {
    this.form=this.fb.group({
      email :['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      name:['',Validators.required]
    }
    )
  }

  register(){
    this.authService.register(this.form.value).subscribe({
      next:(response)=>{
        this.router.navigate(['/login']);
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

}
