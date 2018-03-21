import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../author.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentAuthor;
  errors;

  constructor(private _authorService: AuthorService,
              private _router: Router,
              private _route: ActivatedRoute
            ) { }

  ngOnInit() {
    this.errors = '';
    this.currentAuthor = {first_name: '', last_name: '', _id: ''};
    this._route.params.subscribe((params) => {
      let observable = this._authorService.getAuthor(params.id);
      observable.subscribe(
        (data) => {
          let author = data.json().data;
          this.currentAuthor = {first_name: author.first_name, last_name: author.last_name, _id: author._id}

        },
        (err) => {
          console.log(err);
        }
      )
    });
  }

  editAuthor(id, currentAuthor) {
    let observable = this._authorService.edit(id, currentAuthor);
    observable.subscribe(
      (data) => {
      this._router.navigate(['']);
    },
      (err) => {
        this.errors = err.json().data.message;
      })
  }

}
