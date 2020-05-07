import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Message[]>('http://localhost:8080/message/all').pipe()
  }
  addMessage(Message : Message){
    return this.http.post<Message>('http://localhost:8080/message/create', Message).pipe()
    
  }
  deleteMessage(idMessage : number){
    return this.http.delete<Message>('http://localhost:8080/message/delete/'+idMessage).pipe()
  }
  updateMessage(idMessage : number, Message: Message){
    return this.http.put<Message>('http://localhost:8080/message/update/'+idMessage, Message).pipe()
  }
  getById(idMessage: number){
return this.http.get<Message>('http://localhost:8080/message/findById/'+idMessage).pipe()
  }
}
