import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Messagerie } from '../Model/Messagerie';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Messagerie[]>('http://localhost:8080/messagerie/all').pipe()
  }
  addMessagerie(Messagerie : Messagerie){
    return this.http.post<Messagerie>('http://localhost:8080/messagerie/create', Messagerie).pipe()
    
  }
  deleteMessagerie(idMessagerie : number){
    return this.http.delete<Messagerie>('http://localhost:8080/messagerie/delete/'+idMessagerie).pipe()
  }
  updateMessagerie(idMessagerie : number, Messagerie: Messagerie){
    return this.http.put<Messagerie>('http://localhost:8080/messagerie/update/'+idMessagerie, Messagerie).pipe()
  }
  getById(idMessagerie: number){
return this.http.get<Messagerie>('http://localhost:8080/messagerie/findById/'+idMessagerie).pipe()
  }
}