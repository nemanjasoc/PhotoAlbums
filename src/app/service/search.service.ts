import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchedTextChanged = new Subject<string>();


  constructor(public http: HttpClient) { }


  searchedTextChangedObservable(): Observable<string> {
    return this.searchedTextChanged.asObservable();
  }

  searchedTextChangedNotify(value: string) {
    this.searchedTextChanged.next(value);
  }
}
