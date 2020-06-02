import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album-service';
import { Photo } from '../albums/albums';
import { Subscription } from 'rxjs';
import { PhotoService } from '../service/photo-service';

@Component({
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  errorMessage: string;
  loading = false;
  
  subscribeToSearchedPhotoTextSubscription: Subscription;
  
  constructor(public albumService: AlbumService, public photoService: PhotoService) { }


  ngOnInit(): void {
    this.loading = true;
    this.albumService.getPhotos().subscribe(
      data => {
        this.photos = data;
        this.loading = false;

        const filtered = this.photos.filter(photo => photo.albumId === this.albumService.album.id)
        this.photos = filtered;
        this.filteredPhotos = this.photos;
      },
        err => {
          this.errorMessage = err;
          this.loading = false;
        }
      )
      
    this.subscribeToSearchedPhotoTextChange();
  }

  subscribeToSearchedPhotoTextChange() {
    this.subscribeToSearchedPhotoTextSubscription = this.photoService.searchedPhotoTextChangedObservable()
      .subscribe(result => {
        if(!result || !result.length) {
          this.filteredPhotos = this.photos;
          return;
        }

        this.filteredPhotos = this.photos.filter(item => {
          return item.title.toLocaleLowerCase().includes(result.toLocaleLowerCase());
        })
      })
  }

  removePhoto(photo: Photo) {
    const filtered = this.photos.filter(currentPhoto => currentPhoto.id !== photo.id) 
    this.photos = filtered;
  }

}
