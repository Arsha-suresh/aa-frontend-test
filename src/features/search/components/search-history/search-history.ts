
import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageKey } from '@features/search/constants';
import { LocalStorage } from '@features/search/services/local-storage';
import { ConfirmModal } from '@shared/confirm-modal/confirm-modal';
import { TableInput } from '@shared/models/table-input.model';
import { Table } from '@shared/table/table';

@Component({
  selector: 'app-search-history',
  imports: [ Table, ConfirmModal],
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
   showModal =signal(false);
  title = signal('Clear Search History');
  message = signal('Are you sure to clear search history');

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

  clear(){
    this.showModal.set(false);
    this.localStore.clearAll(LocalStorageKey);


   }

   showConfirmModal(){
    this.showModal.set(true);

   }
   
  

}
