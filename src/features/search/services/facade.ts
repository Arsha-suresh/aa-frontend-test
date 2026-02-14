import { inject, Injectable } from '@angular/core';
import { Http } from './http';
import { map } from 'rxjs';
import { ApiModel } from '../models/apiModel';
import { Adapter } from './adapter';

@Injectable({
  providedIn: 'root',
})
export class Facade {
  http = inject(Http);
  adapter = inject(Adapter);

  searchBreweries(query: string, page: number = 1  ) {
    return this.http.get<ApiModel[]>('search', { query , per_page:5,page}).pipe(map((response: ApiModel[]) => this.adapter.generateBreweryModel(response))  );
  }
  
}
