import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/definitions/heroes';
import { HeroService } from 'src/app/services/hero/hero.service';
import { MessagesService } from 'src/app/services/message/message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Array<Hero> = [];

  constructor(
    private heroeService: HeroService, 
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroeService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
