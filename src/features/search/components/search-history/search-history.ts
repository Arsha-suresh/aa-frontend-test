
import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageKey } from '@features/search/constants';
import { LocalStorage } from '@features/search/services/local-storage';
import { TableInput } from '@shared/models/table-input.model';
import { Table } from '@shared/table/table';

@Component({
  selector: 'app-search-history',
  imports: [ Table],
  templateUrl: './search-history.html',
  styleUrl: './search-history.scss',
})
export class SearchHistory implements OnInit {
  localStore = inject(LocalStorage);
  destroyRef = inject(DestroyRef);
  historyArray: TableInput= { data: [] };
  keys =[] as string[];
  columns = [{ label: 'Query', key: 'label'   }];
  page = 1;
  reRunSearch = output<string>();

  ngOnInit(): void {
   this.localStore.searchHistory$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(history => {
    
    this.historyArray = { data: history};
   });
  }

  emitQuery(query: string) {
    this.reRunSearch.emit(query);
    // You can implement an EventEmitter here to emit the query to the parent component
  }

  deleteRow(label: string) {
    this.localStore.deleteItem(LocalStorageKey,label)
  };
  

}
