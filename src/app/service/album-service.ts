import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Album, User, Photo } from '../albums/albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  allAlbums: Album[];
  allUsers: User[];
  allPhotos: Photo[];
  album: Album;
  searchedText: string;


  constructor(public http: HttpClient) {}


  setSearchedText(searchedText: string) {
    this.searchedText = searchedText;
  }

  selectedAlbum(album: Album) {
    this.album = album;
  }

  public albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
  public photosUrl = 'https://jsonplaceholder.typicode.com/photos';
  public usersUrl = 'https://jsonplaceholder.typicode.com/users';

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl).pipe(
      tap(data => this.allAlbums = data),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(data => this.allUsers = data),
      catchError(this.handleError)
    );
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl).pipe(
      tap(data => this.allPhotos = data),
      catchError(this.handleError)
    );
  }

  public handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocured: ${err.error.message}`
    } else {
      errorMessage = `Server return code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
    
}
