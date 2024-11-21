import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackBar=inject(MatSnackBar);
  if(inject(AuthService).isLoggedIn()){
    return true;
  }
  matSnackBar.open('You need to be logged in.','Ok',{
    duration:3000,
  });

  inject(Router).navigate(['/']);

  return false;
};
