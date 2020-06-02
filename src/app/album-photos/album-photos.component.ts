import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album-service';
import { Photo } from '../albums/albums';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss']
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  errorMessage: string;
  loading = false;
  
  subscribeToSearchedTextSubscription: Subscription;
  
  constructor(public albumService: AlbumService) { }


  ngOnInit(): void {
    this.loading = true;
    this.albumService.getPhotos().subscribe(
      data => {
        const filtered = data.filter(photo => photo.albumId === this.albumService.album.id)
        this.photos = filtered;
        this.filteredPhotos = this.photos.slice();
        this.loading = false;
      },
        err => {
          this.errorMessage = err;
          this.loading = false;
        }
      )

    this.subscribeToSearchedTextChange();
  }

  subscribeToSearchedTextChange() {
    this.subscribeToSearchedTextSubscription = this.albumService.searchedTextChangedObservable()
      .subscribe(result => {
        if(!result || !result.length) {
          this.filteredPhotos = this.photos.slice();
          return;
        }

        this.filteredPhotos = this.photos.filter(item => {
          return item.title.toLocaleLowerCase().includes(result.toLocaleLowerCase());
        })
      })
  }

  removePhoto(photo: Photo) {
    const filtered = this.photos.filter(currentPhoto => currentPhoto.id !== photo.id) 
    this.filteredPhotos = filtered;
  }

}
