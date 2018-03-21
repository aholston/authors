import { Component, OnInit } from '@angular/core';

import { AuthorService } from '../../author.service';

import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  authors;
  errors

  constructor(
    private _authorService: AuthorService,
    private _router: Router

    ) { }

  ngOnInit() {
    this.getAll();
    this.errors = '';

  }

  getAll() {
    let observable = this._authorService.get();
    observable.subscribe((data) => {
    const response = data.json();
    this.authors = response.data;
    console.log(this.authors);
  });
}

  deleteAuthor(id) {
    let observable = this._authorService.delete(id);
    observable.subscribe(
      (data) => {
        this._router.navigate(['']);
        this.getAll();
      },
      (err) => {
        this.errors = err.json().data.message;
      });

  }

}
