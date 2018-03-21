import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorComponent } from './author/author.component';
import { EditComponent } from './author/edit/edit.component';
import { NewComponent } from './author/new/new.component';
import { ShowComponent } from './author/show/show.component';
import { IndexComponent } from './author/index/index.component';




const routes: Routes = [
  { path: 'show/:id', component: ShowComponent },
  { path: 'author/new', component: NewComponent },
  { path: 'author/edit/:id', component: EditComponent },
  { path: '', pathMatch: 'full', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AuthorComponent, EditComponent, NewComponent, ShowComponent, IndexComponent]
