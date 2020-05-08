import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { UserService } from '../Service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../Model/Post';
import { PostService } from '../Service/post.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: User = new User();
  post: Post = new Post();
  listUsers: User[] = [];
  listPosts:Post[]=[];
  idUserURL: number;
  selectedImage: File;

  constructor(private http: HttpClient, private userService: UserService, private postService: PostService, private route: ActivatedRoute) { this.idUserURL = parseInt(this.route.snapshot.paramMap.get('id')); }

  ngOnInit(): void {
    this.userService.getById(this.idUserURL).subscribe(
      data => {
        this.user = data;
      }
    )
    this.userService.getAll().subscribe(
      data => {
        this.listUsers = data;
      }
    )
    this.postService.getAll().subscribe(
      data=>{
        this.listPosts=data;
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
    this.http.post('http://localhost:8080/user/saveImage', formData).subscribe(
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
  addPostT() {
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
}
