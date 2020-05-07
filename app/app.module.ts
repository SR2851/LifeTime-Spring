import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilComponent } from './profil/profil.component';
import { ConversationComponent } from './conversation/conversation.component';
import { InfosUserComponent } from './infos-user/infos-user.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    HomePageComponent,
    ProfilComponent,
    ConversationComponent,
    InfosUserComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ImageCropperModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
