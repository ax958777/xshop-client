import { Routes } from '@angular/router';
import { PlantIdentifierComponent } from './pages/plant-identifier/plant-identifier.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreditShopComponent } from './pages/credit-shop/credit-shop.component';
import { authGuard } from './guards/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AccountComponent } from './pages/account/account.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HomeComponent } from './pages/home/home.component';
import { MyThreedModelsComponent } from './pages/my-threed-models/my-threed-models.component';

export const routes: Routes = [
    {
        path: 'plant-identifier',
        component: PlantIdentifierComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'credit-shop',
      component: CreditShopComponent,
      canActivate:[authGuard]
    },
    {
      path: 'checkout',
      component: CheckoutComponent,
      canActivate:[authGuard]
    },
    {
      path: 'account/:id',
      component: AccountComponent,
      canActivate:[authGuard]
    },
    {
      path: 'forget-password',
      component: ForgetPasswordComponent,
    },
    {
      path: 'reset-password',
      component: ResetPasswordComponent,
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
      canActivate:[authGuard]
    },
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'my-3d-models',
      component: MyThreedModelsComponent,
      canActivate:[authGuard]
    },
];
