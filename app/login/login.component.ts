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
  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }
  login() {
    this.userService.login(this.user).subscribe(
      data => {
        if (data) {
          this.userLoggedIn = data;
          localStorage.setItem("user", this.userLoggedIn.identifiant);
          localStorage.setItem("nom", this.userLoggedIn.nomUser);
          localStorage.setItem("prenom", this.userLoggedIn.prenomUser);


          if (this.userLoggedIn.role.nomRole == "Client") {
            localStorage.setItem("role", "Client");
          }
          else if (this.userLoggedIn.role.nomRole == "Employé") {
            localStorage.setItem("role", "Employé");
          }
          else if (this.userLoggedIn.role.nomRole == "Gérant") {
            localStorage.setItem("role", "Gérant");
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            
            title: 'Authentification réussie!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            if (this.userLoggedIn.role.nomRole == "Client") {
              window.location.href = "http://localhost:4200/homepageClient/"+data.idUser;
            }
            else if (this.userLoggedIn.role.nomRole == "Employé") {
              window.location.href = "http://localhost:4200/homepageEmploye/"+data.idUser;
            }
            else if (this.userLoggedIn.role.nomRole == "Gérant") {
              window.location.href = "http://localhost:4200/homepageEmploye/"+data.idUser;
            }
            else if (this.userLoggedIn.role.nomRole == "Cuisinier") {
              window.location.href = "http://localhost:4200/homepageEmploye/"+data.idUser;
            }
            else {
              window.location.href = "http://localhost:4200/login"
            }
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
