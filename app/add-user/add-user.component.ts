import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: User = new User();
  
  selectedImage: File;
  
    constructor(private http:HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    
    
  }
  
  imageChangedEvent: any = '';
    croppedImage: any = '';
    previous:any = '';
    
    fileChangeEvent(imageInput: any, event: any): void {
        this.imageChangedEvent = event;
        this.selectedImage = event.target.files[0];
        
    
    }
    imageCropped(imageInput: any, event: ImageCroppedEvent) {
      this.previous=event.base64;
        this.croppedImage = base64ToFile(event.base64);
        console.log(event, base64ToFile(event.base64));
      
          
    }
    startCropImage(){

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
    
  addUser(idUser:number, newUser:User){
    const formData = new FormData();
    this.newUser.photo = this.selectedImage.name;
formData.append('image', this.croppedImage, this.selectedImage.name)
this.http.post('http://localhost:8080/user/saveImage',formData).subscribe(
  res => {
    console.log(res);
  }
)
    
    this.userService.addUser(this.newUser).subscribe(
      data => {
        if (data['idUser'] == 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
        }
        else if(data['idUser']){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compte créé!',
            showConfirmButton: true,
            timer: 1500
          }).then( () => {
            window.location.href = "http://localhost:4200/login"
          })
        }
      }
    )
  }

}

