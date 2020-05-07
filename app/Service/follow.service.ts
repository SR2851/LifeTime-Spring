import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Follow } from '../Model/Follow';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Follow[]>('http://localhost:8080/follow/all').pipe()
  }
  addFollow(Follow : Follow){
    return this.http.post<Follow>('http://localhost:8080/follow/create', Follow).pipe()
    
  }
  deleteFollow(idFollow : number){
    return this.http.delete<Follow>('http://localhost:8080/follow/delete/'+idFollow).pipe()
  }
  updateFollow(idFollow : number, Follow: Follow){
    return this.http.put<Follow>('http://localhost:8080/follow/update/'+idFollow, Follow).pipe()
  }
  getById(idFollow: number){
return this.http.get<Follow>('http://localhost:8080/follow/findById/'+idFollow).pipe()
  }
}
