import { Injectable } from '@angular/core';
import { TableData } from '@shared/models/table-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
   private searchHistorySubject = new BehaviorSubject<Array<TableData>>(
   []
  );
  searchHistory$ = this.searchHistorySubject.asObservable();
  setItem(key: string, value: Array<TableData>) {
    localStorage.setItem(key, JSON.stringify(value));
    this.searchHistorySubject.next(value);
  }
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }
  updateItem<T>(key: string, value: TableData) { {
    const existing= <Array<TableData> |null>this.getItem<T>(key);  
    if (existing) {
      
     existing.push(value);
      this.setItem(key, existing);
      this.searchHistorySubject.next(existing);
    } else {
      this.setItem(key, [value]);
    }  
  }
  
}
deleteItem(localstorageKey:string,key: string) {
  const existing= <Array<TableData> |null>this.getItem<Array<TableData>>(localstorageKey);
  if (existing) {
    const updated = existing.filter(item => item['label'] !== key);
    this.setItem(localstorageKey, updated);
    this.searchHistorySubject.next(updated);
  }  
}
}
