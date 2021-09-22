import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule) }, { path: 'video', loadChildren: () => import('./pages/video/video.module').then(m => m.VideoModule) }, { path: 'comments', loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



