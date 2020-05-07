import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../Model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Role[]>('http://localhost:8080/role/all').pipe()
  }
  addRole(Role : Role){
    return this.http.post<Role>('http://localhost:8080/role/create', Role).pipe()
    //envoie moi la requette post sur postmann avec Role comme corps de reuette
  }
  deleteRole(idRole : number){
    return this.http.delete<Role>('http://localhost:8080/role/delete/'+idRole).pipe()
  }
  updateRole(idRole : number, Role: Role){
    return this.http.put<Role>('http://localhost:8080/role/update/'+idRole, Role).pipe()
  }
  getById(idRole: number){
return this.http.get<Role>('http://localhost:8080/role/findById/'+idRole).pipe()
  }
}
