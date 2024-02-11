import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },{
    path: "login", component: LoginComponent, title: "Login"
  },{
    path: "register", component: RegisterComponent, title: "Register"
  },
  {
    path: "home", component: HomeComponent, title: "Home"
  },
  {
    path: "profile", component: ProfileComponent, title: "Profile"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
