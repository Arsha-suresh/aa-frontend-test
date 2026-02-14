import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Facade } from '@features/search/services/facade';
import { TableData } from '@shared/models/table-data.model';
import { TableInput } from '@shared/models/table-input.model';
import { Brewery } from '@features/search/models/Brewery';
import { Store } from '@features/search/stores/store';
import { Table } from '@shared/table/table';
import { LocalStorage } from '@features/search/services/local-storage';
import { SearchHistory } from '../search-history/search-history';
import { DatePipe } from '@angular/common';
import { LocalStorageKey } from '@features/search/constants';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule,Table, SearchHistory],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  providers:[DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Search implements OnInit {
  sanitizer = inject(DomSanitizer);
  datepipe = inject(DatePipe);
  changeRef = inject(ChangeDetectorRef);
  facade = inject(Facade);
  formBuilder = inject(FormBuilder);
  localStore = inject(LocalStorage);
  form!: FormGroup;
  destroyRef = inject(DestroyRef);
  isError = false;
  tableData! :TableInput;
  store = inject(Store);
  columns = [
    { label: 'Name', key: 'name' },
    { label: 'Brewery Type', key: 'brewery_type' }, 
    { label: 'City', key: 'city' },
  ]
  page = signal(1);
  query = '';
  disableNext = false;
  showResultsAndHistory = signal(true);
  showEachResult = computed(()=>{return !this.showResultsAndHistory() });
  selectedBrewery :Brewery| null = null;
  url!: SafeUrl;
  

  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      query: ['', [Validators.required]]
    });

    
  }

  search(searchQuery?: string) {
    this.page.set(1);
    this.query =  searchQuery??this.form.get('query')?.value;
    if (this.query) {
      this.store.clearBreweries();
      this.loadUsers();
    
    } else {
      this.tableData = null as unknown as TableInput;
      this.isError = true;
      this.changeRef.markForCheck();
      this.changeRef.detectChanges();
      
    }
    const date =Date.now();
    const localHistory:TableData= {  label: `${this.query} ${this.datepipe.transform(date, "dd-MM-yyyy HH:mm:ss")} `, id:this.query };
    this.localStore.updateItem(LocalStorageKey, localHistory);
    
  }


  reRunSearch(query: string) {
   this.search(query);
  }

 

  showDetails(event:string){
    const breweryId = event;
    this.selectedBrewery = this.store.breweries()[breweryId];
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedBrewery?.websiteUrl??'');
    this.showResultsAndHistory.set(false);

  }
  closeDetailsPage(){
    this.selectedBrewery = null;
    this.showResultsAndHistory.set(true);
  }

  loadUsers() {
      this.facade.searchBreweries(this.query, this.page()).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(result => {
       
         this.tableData = { data: result.map(brewery => ({
          id: brewery.id,
          name: brewery.name,
          brewery_type: brewery.breweryType,
          city: brewery.city
        })) };
         this.store.setBreweries(result); 
         this.isError = false;
         this.changeRef.detectChanges();

     });
  
}

nextPageOutput() {
  this.page.update(n => n + 1);
  this.loadUsers();
  if (this.tableData.data.length ==0 || this.tableData.data.length < 5) {
    this.disableNext = true;
  }
}
prevPageOutput() {
  if (this.page() > 1) {
    this.page.update(n => n - 1);
    this.loadUsers();
    this.disableNext = false;
  } 
}


}
