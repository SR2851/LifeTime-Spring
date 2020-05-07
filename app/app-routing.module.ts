import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ConversationComponent } from './conversation/conversation.component';
import { InfosUserComponent } from './infos-user/infos-user.component';


const routes: Routes = [
  {
    path: "addUser",
    component: AddUserComponent
  },
  
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profil/:id",
    component: ProfilComponent
  },
  
  {
    path: "homepage/:id",
    component: HomePageComponent
  },
  {
    path: "infosUser/:id",
    component: InfosUserComponent
  },
  
  {
    path: "chat/:id",
    component: ConversationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
