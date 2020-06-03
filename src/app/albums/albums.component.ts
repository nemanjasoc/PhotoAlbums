import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { SearchService } from '../service/search.service';
import { Album } from '../albums/albums';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  errorMessage: string;
  loading = false;

  subscribeToSearchedTextSubscription: Subscription;

  constructor(public apiService: ApiService,
    public searchService: SearchService) { }


  ngOnInit(): void {
    this.getData();
    this.subscribeToSearchedTextChange();
  }

  getData() {
    this.loading = true;
    forkJoin([
      this.apiService.getUsers(),
      this.apiService.getAlbums(),
    ]).subscribe(([users, albums]) => {
      albums.forEach(album => {
        album.userName = users.find(user => user.id === album.userId).name;
      });
      this.albums = albums;
      this.filteredAlbums = albums.slice();
      this.loading = false;
    }, err => {
      this.errorMessage = err;
      this.loading = false;
    });
  }

  subscribeToSearchedTextChange() {
    this.subscribeToSearchedTextSubscription = this.searchService.searchedTextChangedObservable()
      .subscribe(result => {
        if (!result || !result.length) {
          this.filteredAlbums = this.albums.slice();
          return;
        }

        this.filteredAlbums = this.albums.filter(item => {
          return item.title.toLocaleLowerCase().includes(result.toLocaleLowerCase());
        });
      });
  }

  showAlbumPhotos(album: Album): void {
    this.apiService.selectedAlbum(album);
  }


}
