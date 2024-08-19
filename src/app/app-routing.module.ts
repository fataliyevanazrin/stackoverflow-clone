import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { SolutionsComponent } from './solutions/solutions.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: '', pathMatch: 'full', redirectTo:'login'},
{path: 'create-user', component: CreateUserComponent},
{path: 'home', component: HomeComponent},
{path: 'solutions/:questionId', component: SolutionsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
