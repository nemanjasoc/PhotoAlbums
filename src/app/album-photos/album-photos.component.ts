import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { SearchService } from '../service/search.service';
import { Photo } from '../albums/albums';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss']
})
export class AlbumPhotosComponent implements OnInit {
  urlAlbumId: number;
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  errorMessage: string;
  loading = false;

  subscribeToSearchedTextSubscription: Subscription;

  constructor(public apiService: ApiService,
    public searchService: SearchService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getAlbumById();
    this.getData();
    this.subscribeToSearchedTextChange();
  }

  getAlbumById() {
    this.route.params.subscribe(params => {
      this.urlAlbumId = Number(params.albumId);
    });
  }

  getData() {
    this.loading = true;
    this.apiService.getPhotos().subscribe(
      data => {
        this.photos = data.filter(photo => photo.albumId === this.urlAlbumId);
        this.filteredPhotos = this.photos.slice();
        this.loading = false;
      },
      err => {
        this.errorMessage = err;
        this.loading = false;
      });
  }

  subscribeToSearchedTextChange() {
    this.subscribeToSearchedTextSubscription = this.searchService.searchedTextChangedObservable()
      .subscribe(result => {
        if (!result || !result.length) {
          this.filteredPhotos = this.photos.slice();
          return;
        }

        this.filteredPhotos = this.photos.filter(item => {
          return item.title.toLocaleLowerCase().includes(result.toLocaleLowerCase());
        });
      });
  }

  removePhoto(photo: Photo) {
    const filtered = this.photos.filter(currentPhoto => currentPhoto.id !== photo.id);
    this.filteredPhotos = filtered;
  }

}
