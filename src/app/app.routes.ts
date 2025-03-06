import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LearnmoreComponent } from './Components/learnmore/learnmore.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HomeComponent } from './Components/home/home.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { UserpageComponent } from './Components/userpage/userpage.component';
import { authGuard } from './Services/auth.guard';
import { adminGuardGuard } from './Services/admin-guard.guard';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "admin", component: AdminComponent,canActivate:[adminGuardGuard] },
    { path: "employees", component: EmployeesComponent},
    { path:"userpage", component:UserpageComponent,canActivate:[authGuard] },
    {path:"",component:LoginComponent},
  
    {
        path: "",
        component: NavbarComponent,
        children: [
            { path: "", component: HomeComponent },
            { path: "home", component: HomeComponent },
            { path: "learnmore", component: LearnmoreComponent },
         
        ]
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
    },
];