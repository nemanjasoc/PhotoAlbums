import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album-service';
import { Album, User } from '../albums/albums';

@Component({
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  users: User[] = [];
  errorMessage: string;
  loading = false;


  constructor(public albumService: AlbumService) { }


  ngOnInit(): void {
    this.subscribeAlbums();
    this.subscribeUsers();
  }

  subscribeAlbums() {
    this.loading = true;
    this.albumService.getAlbums().subscribe(
      data => {
        this.albums = data;
        console.log("albums: ", this.albums)
        //this.searchText();
        this.loading = false;
      },
      err => {
        this.errorMessage = err;
        this.loading = false;
      }
    )
  }

  subscribeUsers() {
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

  // searchText() {
  //   console.log("this.albumService.searchedText:", this.albumService.searchedText)
  //   if (this.albumService.searchedText === null || this.albumService.searchedText === undefined || this.albumService.searchedText === '') {
  //     return this.albums;
  //   } else {
  //     const filtered = this.albums.filter(album => album.title.indexOf(this.albumService.searchedText.toLowerCase()) >= 0)
  //     this.albums = filtered;
  //   }
  // }

}
