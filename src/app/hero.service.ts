import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hero } from './hero.interface';  
import md5 from 'md5';  

interface MarvelApiResponse {
  data: {
    results: Hero[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private apiUrl = 'http://gateway.marvel.com/v1/public/characters';
  private publicKey = 'dedb6a9bdb5015fd13c9ac2b776abf60';
  private privateKey = '82b6ead49d20630605ff91460244a94b254c5d56';

  constructor(private http: HttpClient) {}

  getMarvelHeroes(): Observable<MarvelApiResponse> {
    const ts = new Date().getTime().toString(); 
    const hash = md5(ts + this.privateKey + this.publicKey);

    return this.http
      .get<MarvelApiResponse>(
        `${this.apiUrl}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`
      )
  }

  searchHeroes(term: string): Observable<MarvelApiResponse> {
    const ts = new Date().getTime().toString(); 
    const hash = md5(ts + this.privateKey + this.publicKey);

    return this.http
      .get<MarvelApiResponse>(
        `${this.apiUrl}?nameStartsWith=${term}&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`
      )
  }

  getHeroDetails(id: number): Observable<MarvelApiResponse> {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + this.privateKey + this.publicKey);

    return this.http.get<MarvelApiResponse>(
      `${this.apiUrl}/${id}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`
    )
  }

  
}
