import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album-service';
import { Album, User } from '../albums/albums';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  users: User[] = [];
  errorMessage: string;
  loading = false;

  subscribeToSearchedTextSubscription: Subscription;

  constructor(public albumService: AlbumService) { }


  ngOnInit(): void {
    this.getAlbums();
    this.getUsers();
    this.subscribeToSearchedTextChange();
  }

  subscribeToSearchedTextChange() {
    this.subscribeToSearchedTextSubscription = this.albumService.searchedTextChangedObservable()
      .subscribe(result => {
        if(!result || !result.length) {
          this.filteredAlbums = this.albums.slice();
          return;
        }

        this.filteredAlbums = this.albums.filter(item => {
          return item.title.toLocaleLowerCase().includes(result.toLocaleLowerCase());
        })
      })
  }

  getAlbums() {
    this.loading = true;
    this.albumService.getAlbums().subscribe(
      data => {
        this.albums = data;
        this.loading = false;
      },
      err => {
        this.errorMessage = err;
        this.loading = false;
      }
    )
  }

  getUsers() {
    this.loading = true;
    this.albumService.getUsers().subscribe(
      data => {
        this.users = data;
        this.loading = false;
        var newAlbums = [];
        for (let i = 0; i < this.users.length; i++) {
          let currentUser = this.users[i];

          let currentAlbum;
          for (let j = 0; j < this.albums.length; j++) {
            currentAlbum = this.albums[j];
            if (currentAlbum.userId === currentUser.id) {
              currentAlbum.userName = currentUser.name
              newAlbums.push(currentAlbum)
            }
          }

        }
        this.albums = newAlbums;
        this.filteredAlbums = this.albums.slice();
      },
      err => {
        this.errorMessage = err;
        this.loading = false;
      }
    )
  }

  showAlbumPhotos(album: Album): void {
    this.albumService.selectedAlbum(album);
  }


}
