import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showDropdownMenu = false;
  hideHomeLink = false;

  constructor(private router: Router, public searchService: SearchService) {

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
    this.searchService.searchedTextChangedNotify(event.target.value);
  }

}
