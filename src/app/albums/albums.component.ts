import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album-service';
import { Album } from '../albums/albums';
import { Subscription} from 'rxjs';

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

  constructor(public albumService: AlbumService) { }


  ngOnInit(): void {
    this.loading = true;
    this.albumService.getAlbumsAndUsers().subscribe(responseList => {

      var newAlbums = [];
      for (let i = 0; i < responseList[1].length; i++) {
        let currentUser = responseList[1][i];
  
        let currentAlbum;
        for (let j = 0; j < responseList[0].length; j++) {
          currentAlbum = responseList[0][j];
          if (currentAlbum.userId === currentUser.id) {
            currentAlbum.userName = currentUser.name
            newAlbums.push(currentAlbum)
          }
        }
      }
  
      this.albums = newAlbums;
      this.filteredAlbums = this.albums.slice();
      this.loading = false;
    });
    
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

  showAlbumPhotos(album: Album): void {
    this.albumService.selectedAlbum(album);
  }


}
