import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album, Photo, User } from '../albums/albums';

const apiUrl = 'http://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(public http: HttpClient) { }


  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${apiUrl}/albums`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${apiUrl}/users`);
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${apiUrl}/photos`);
  }

}
