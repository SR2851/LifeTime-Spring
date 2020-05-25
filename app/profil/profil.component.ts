import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Post } from '../Model/Post';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { CommentService } from '../Service/comment.service';
import { UserService } from '../Service/user.service';
import { PostService } from '../Service/post.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Model/User';
import { Commentaire } from '../Model/Commentaire';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User = new User();
  post: Post = new Post();
  comment: Commentaire = new Commentaire();
  listUsers: User[] = [];
  listPosts: Post[] = [];
  listComments: Commentaire[] = [];
  idUserURL: number;
  selectedImage: File;

  constructor(private http: HttpClient, private commentService: CommentService, private userService: UserService, private postService: PostService, private route: ActivatedRoute) { this.idUserURL = parseInt(this.route.snapshot.paramMap.get('id2')); }

  ngOnInit(): void {
    console.log(this.idUserURL);
    this.userService.getById(this.idUserURL).subscribe(
      data => {
        this.user = data;
        this.postService.getAllByUser(this.user.idUser).subscribe(
          data => {
            this.listPosts = data;
          }
        )
      }
    )
    
    

  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  previous: any = '';

  fileChangeEvent(imageInput: any, event: any): void {
    this.imageChangedEvent = event;
    this.selectedImage = event.target.files[0];


  }
  imageCropped(imageInput: any, event: ImageCroppedEvent) {
    this.previous = event.base64;
    this.croppedImage = base64ToFile(event.base64);
    console.log(event, base64ToFile(event.base64));


  }
  startCropImage() {

  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  addPhoto() {
    var x = document.getElementById("textOnly");
    var y = document.getElementById("photo");

    x.style.display = "none";
    y.style.display = "block";
  }
  addPostP(idPost: number, post: Post) {
    const formData = new FormData();
    this.post.photo = this.selectedImage.name;
    formData.append('image', this.croppedImage, this.selectedImage.name)
    this.http.post('http://localhost:8080/post/saveImage', formData).subscribe(
      res => {
        console.log(res);
      }
    )
    this.userService.getById(this.idUserURL).subscribe(
      data => {
        this.user = data;

        this.post.user = data;
        this.postService.addPost(this.post).subscribe(
          data => {
            if (data['idPost'] == 0) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

              })
            }
            else if (data['idPost']) {

              window.location.reload();

            }
          }
        )
      }
    )
  }
  addComment(idPost: number, post: Post) {
    console.log(this.idUserURL)


    this.postService.getById(idPost).subscribe(
      data => {
        this.post = data;
        this.comment.post = data;
        this.userService.getById(this.idUserURL).subscribe(
          data => {

            this.comment.user1 = data;
            console.log(this.comment.user1.idUser)
            this.commentService.addComment(this.comment).subscribe(
              data => {
                if (data['idComment'] == 0) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',

                  })
                }
                else if (data['idComment']) {

                  window.location.reload();

                }
              }
            )
          }
        )

      }
    )
  }
  profil() {

    window.location.href = 'http://localhost:4200/profil/' + this.user.idUser
  }
  homePage() {
    this.userService.getById(this.idUserURL).subscribe(
      data => {
        this.user = data;
        window.location.href = 'http://localhost:4200/homepage/' + this.user.idUser;
      }
    )
  }
  ShowComment(idPost:number){
    var x = document.getElementById("commentaires");
    x.style.display="block"

    
    this.commentService.getAll(idPost).subscribe(
      data=>{
        this.listComments=data;
      }
    )
  }
}