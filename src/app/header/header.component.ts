import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlbumService } from '../service/album-service';
import { PhotoService } from '../service/photo-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showDropdownMenu = false;
  hideHomeLink = false;

  constructor(private router: Router, public albumService: AlbumService, public photoService: PhotoService) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        if (event.url == '/' || event.url === '/albums') {
          this.hideHomeLink = true;
        } else {
          this.hideHomeLink = false;
        }
      });
  }

  onEnterSearchedText(event): void {
    this.albumService.searchedTextChangedNotify(event.target.value);
    this.photoService.searchedPhotoTextChangedNotify(event.target.value);
  }

}
