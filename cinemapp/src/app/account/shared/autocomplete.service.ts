import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AutocompleteService {

  constructor(protected http: HttpClient) {}

  getCitySuggestions(value: string) {

    return this.http.get<string[]>(`/api/autocomplete/${value}`);

  }

}
