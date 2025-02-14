import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [RouterModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]> = of([]);
  private searchTerms = new Subject<string>();

  heroes: Hero[] = [];
  heroesPerPage = 10;
  currentPage = 1;
  totalPages = 1;

  private heroService = inject(HeroService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => 
        this.heroService.searchHeroes(term).pipe(
          map(response => response.data.results),
          catchError(() => of([]))
        )
      )
    );

    this.route.params.subscribe(params => {
      this.currentPage = +params['page'];
      this.getMarvelHeroes();
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getMarvelHeroes(): void {
    this.heroService.getMarvelHeroes().subscribe(({ data }) => {
      this.heroes = this.shuffleArray(data.results);
      this.totalPages = Math.ceil(this.heroes.length / this.heroesPerPage);
    });
  }
  

  private shuffleArray(array: Hero[]): Hero[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getPagedHeroes(): Hero[] {
    const start = (this.currentPage - 1) * this.heroesPerPage;
    return this.heroes.slice(start, start + this.heroesPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate(['/dashboard', page]);
    }
  }
}
