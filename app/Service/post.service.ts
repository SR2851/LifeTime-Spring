import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Post[]>('http://localhost:8080/post/all').pipe()
  }
  addPost(Post : Post){
    return this.http.post<Post>('http://localhost:8080/post/create', Post).pipe()
    //envoie moi la requette post sur postmann avec Post comme corps de reuette
  }
  deletePost(idPost : number){
    return this.http.delete<Post>('http://localhost:8080/post/delete/'+idPost).pipe()
  }
  updatePost(idPost : number, Post: Post){
    return this.http.put<Post>('http://localhost:8080/post/update/'+idPost, Post).pipe()
  }
  getById(idPost: number){
return this.http.get<Post>('http://localhost:8080/post/findById/'+idPost).pipe()
  }
}
