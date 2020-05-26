import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album-service';
import { Album, Photo } from '../albums/albums';
import { ɵNoopAnimationDriver } from '@angular/animations/browser';

@Component({
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss']
})
export class AlbumPhotosComponent implements OnInit {
  albums: Album[] = [];
  photos: Photo[] = [];
  errorMessage: string;
  loading = false;
  

  constructor(public albumService: AlbumService) { }


  ngOnInit(): void {
    this.subscribePhotos();
  }

  subscribePhotos() {
    this.loading = true;
    this.albumService.getPhotos().subscribe(
      data => {
        this.photos = data;
        this.loading = false;

        const filtered = this.photos.filter(photo => photo.albumId === this.albumService.album.id)
        this.photos = filtered;
      },
        err => {
          this.errorMessage = err;
          this.loading = false;
        }
      )
  }

  removePhoto(photo: Photo) {
    const filtered = this.photos.filter(currentPhoto => currentPhoto.id !== photo.id) 
    this.photos = filtered;
  }

}
