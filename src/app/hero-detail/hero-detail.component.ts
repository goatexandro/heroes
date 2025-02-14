import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero.interface'; 

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  imports: [CommonModule],
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined; 

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();  
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10); 
    this.heroService.getHeroDetails(id).subscribe(response => {
      this.hero = response.data.results[0]; 
    });
  }

  goBack(): void {
    this.location.back(); 
  }
}
