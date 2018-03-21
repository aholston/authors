import { Component, OnInit } from '@angular/core';

import { AuthorService } from '../../author.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor;
  error;

  constructor(
    private _authorService: AuthorService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.newAuthor = {
      first_name: '',
      last_name: ''
    }
    this.error = '';
  }

  createAuthor() {
    let observable = this._authorService.create(this.newAuthor);
    observable.subscribe(
      (data) => {
        this._router.navigate(['']);
      },
      (err) => {
        this.error = err.json().data.message;
      })
  }

}
