import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, of, tap } from 'rxjs';
import { Hero } from '../../models/definitions/heroes';
import { MessagesService as MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; 
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
  
  getHeroes(): Observable<Array<Hero>> {
    return (
      this.http.get<Array<Hero>>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Array<Hero>>('getHeroes', []))
        )
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return (
      this.http.get<Hero>(url)
        .pipe(
          tap(_ => this.log(`fetched hero id=${id}`)),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
        )
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return (
      this.http.put(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        )
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return (
      this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
          catchError(this.handleError<Hero>('addHero'))
        )
    )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return (
      this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
    )
  }

  searchHeroes(term: string): Observable<Array<Hero>> {
    if (!term.trim()) {
      return of([]);
    }
    return (
      this.http.get<Array<Hero>>(`${this.heroesUrl}/?name=${term}`)
        .pipe(
          tap(x => x.length ?
            this.log(`found heroes matching "${term}"`) :
            this.log(`no heroes matching "${term}"`)),
          catchError(this.handleError<Array<Hero>>('searchHeroes', []))
        )
    );
  }

  handleError<T>(operation: string, result?: T): (err: any, caught: Observable<T>) => ObservableInput<T> {
    return (err: any): Observable<T> => {
      console.error(err);

      this.log(`${operation} failed: ${err.message}`);

      return of(result as T);
    }
  }
}
