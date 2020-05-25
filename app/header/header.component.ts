import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { User } from '../Model/User';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User = new User();
  idUserURL: number;
  selectedImage: File;

  constructor(  private userService: UserService, private route: ActivatedRoute) { this.idUserURL = parseInt(this.route.snapshot.paramMap.get('id')); }

  ngOnInit(): void {
    console.log(this.idUserURL);
    this.userService.getById(this.idUserURL).subscribe(
      data => {
        this.user = data;
      }
    )
    

  }
  logOut() {
    localStorage.clear();
    window.location.href = "http://localhost:4200/login"
  }
  profile() {

    window.location.href = 'http://localhost:4200/profil/' + this.user.idUser
  }
  homePage() {
    this.userService.getById(this.idUserURL).subscribe(
      data => {
        this.user = data;
        window.location.href = 'http://localhost:4200/homepage/' + this.user.idUser;
      }
    )
   

  }
}


