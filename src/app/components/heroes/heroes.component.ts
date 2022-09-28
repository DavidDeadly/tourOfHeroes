import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/definitions/heroes';
import { HEROES } from 'src/app/models/mocks/heroes';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  protected onSelect(hero: Hero): void  {
    this.selectedHero = hero;
  }

}
