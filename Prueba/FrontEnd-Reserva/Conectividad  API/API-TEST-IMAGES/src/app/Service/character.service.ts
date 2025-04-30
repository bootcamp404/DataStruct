import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../Models/character';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrl: string = 'https://rickandmortyapi.com/api/character';
  characters: Character[];

  constructor(private httpClient: HttpClient) { 
    this.characters = [];
  }

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<any>(this.baseUrl)
      .pipe(
        map(response => response.results)
      );
  }
}
