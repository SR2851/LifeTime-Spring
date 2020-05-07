import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Comment[]>('http://localhost:8080/comment/all').pipe()
  }
  addComment(Comment : Comment){
    return this.http.post<Comment>('http://localhost:8080/comment/create', Comment).pipe()
    
  }
  deleteComment(idComment : number){
    return this.http.delete<Comment>('http://localhost:8080/comment/delete/'+idComment).pipe()
  }
  updateComment(idComment : number, Comment: Comment){
    return this.http.put<Comment>('http://localhost:8080/comment/update/'+idComment, Comment).pipe()
  }
  getById(idComment: number){
return this.http.get<Comment>('http://localhost:8080/comment/findById/'+idComment).pipe()
  }
}
