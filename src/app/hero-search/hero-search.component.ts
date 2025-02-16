import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { Hero } from '../hero.interface';
import { map } from 'rxjs/operators'; 

@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styleUrls: ['./search-hero.component.scss']
})
export class SearchHeroComponent {
  heroes: Observable<Hero[]> = new Observable<Hero[]>(); 

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    this.heroes = this.heroService.searchHeroes(term).pipe(
      map(response => response.data.results) 
    );
  }
}
