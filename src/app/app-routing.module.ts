import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumPhotosComponent } from './album-photos/album-photos.component';

const routes: Routes = [
  { path: 'albums', component: AlbumsComponent },
  { path: 'album-photos', component: AlbumPhotosComponent },
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: '**', redirectTo: 'albums', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
