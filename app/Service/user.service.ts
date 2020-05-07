import { Injectable } from '@angular/core';
import { User } from '../Model/User';
import { Login } from '../Model/Login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<User[]>('http://localhost:8080/user/all').pipe()
  }
  addUser(user : User){
    return this.http.post<User>('http://localhost:8080/user/create', user).pipe()
    //envoie moi la requette post sur postmann avec User comme corps de reuette
  }
  deleteUser(idUser : number){
    return this.http.delete<User>('http://localhost:8080/user/delete/'+idUser).pipe()
  }
  updateUser(idUser : number, User: User){
    return this.http.put<User>('http://localhost:8080/user/update/'+idUser, User).pipe()
  }
  updateRole(idUser : number, User: User){
    return this.http.put<User>('http://localhost:8080/user/updateRole/'+idUser, User).pipe()
  }
  getById(idUser: number){
return this.http.get<User>('http://localhost:8080/user/findById/'+idUser).pipe()
  }
  login(login: Login){
    return this.http.post<User>('http://localhost:8080/user/login', login).pipe()
      }
}

