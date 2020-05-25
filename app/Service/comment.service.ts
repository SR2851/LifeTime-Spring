import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commentaire } from '../Model/Commentaire';
import { Post } from '../Model/Post';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAll(idPost:number){
    return this.http.get<Commentaire[]>('http://localhost:8080/comment/all/'+ idPost).pipe()
  }
  
  addComment(Comment : Commentaire){
    return this.http.post<Commentaire>('http://localhost:8080/comment/create', Comment).pipe()
    
  }
  deleteComment(idComment : number){
    return this.http.delete<Commentaire>('http://localhost:8080/comment/delete/'+idComment).pipe()
  }
  updateComment(idComment : number, Comment: Comment){
    return this.http.put<Commentaire>('http://localhost:8080/comment/update/'+idComment, Comment).pipe()
  }
  getById(idComment: number){
return this.http.get<Commentaire>('http://localhost:8080/comment/findById/'+idComment).pipe()
  }
}
