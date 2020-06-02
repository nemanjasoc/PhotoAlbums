import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private searchedPhotoTextChanged = new Subject<string>();


  constructor() { }


  searchedPhotoTextChangedObservable(): Observable<string> {
    return this.searchedPhotoTextChanged.asObservable();
  }

  searchedPhotoTextChangedNotify(value: string) {
    this.searchedPhotoTextChanged.next(value);
  }

}
