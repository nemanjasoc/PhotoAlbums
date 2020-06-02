import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { Album, Photo } from '../albums/albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  album: Album;

  private searchedTextChanged = new Subject<string>();


  constructor(public http: HttpClient) { }


  searchedTextChangedObservable(): Observable<string> {
    return this.searchedTextChanged.asObservable();
  }

  searchedTextChangedNotify(value: string) {
    this.searchedTextChanged.next(value);
  }

  selectedAlbum(album: Album) {
    this.album = album;
  }

  getAlbumsAndUsers(): Observable<any[]> {
    let responseAlbums = this.http.get('https://jsonplaceholder.typicode.com/albums')
    let responseUsers = this.http.get('https://jsonplaceholder.typicode.com/users')

    return forkJoin([responseAlbums, responseUsers]);
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos');
  }

}
