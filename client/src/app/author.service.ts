import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthorService {

  constructor(private _http: Http) { }




  get() {
    return this._http.get('/authors');
  }

  getAuthor(id) {
    return this._http.get(`/authors/${id}`);
  }

  create(author) {
    return this._http.post('/authors', author)
  }

  edit(id, author) {
    return this._http.patch(`authors/${id}`, author);
  }

  delete(id) {
    return this._http.delete(`/authors/${id}`);
  }

}
