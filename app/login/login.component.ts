import { Component, OnInit } from '@angular/core';
import { Login } from '../Model/Login';
import { User } from '../Model/User';
import { UserService } from '../Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Login = new Login();
  userLoggedIn: User = new User();
  listUser: User[]=[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
this.userService.getAll().subscribe(
  data=>{
    this.listUser=data;
  }
)
  }
  login() {
    this.userService.login(this.user).subscribe(
      data => {
        if (data) {
          this.userLoggedIn = data;
          localStorage.setItem("user", this.userLoggedIn.identifiant);
          localStorage.setItem("nom", this.userLoggedIn.nomUser);
          localStorage.setItem("prenom", this.userLoggedIn.prenomUser);


          Swal.fire({
            position: 'center',
            icon: 'success',
            
            title: 'Authentification réussie!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            
              window.location.href = "http://localhost:4200/homepage/"+data.idUser;
           
          })
        }
        else  {
          
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Echec de l'authentification!",
            
          }).then( () => {
            window.location.href = "http://localhost:4200/login"
          })
        }
      }
      
    )
  }

}
