import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../../models/definitions/heroes';
import { HEROES } from '../../models/mocks/heroes';
import { MessagesService as MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(private messageService: MessageService) { }
  
  getHeroes(): Observable<Array<Hero>> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
