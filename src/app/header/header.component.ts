import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlbumService } from '../service/album-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showDropdownMenu = false;
  hideHomeLink = false;

  constructor(private router: Router, public albumService: AlbumService) {

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
  }

}
