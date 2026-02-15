import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistory } from './search-history';
import { BehaviorSubject,  } from 'rxjs';
import { TableInput } from '@shared/models/table-input.model';
import { LocalStorage } from '@features/search/services/local-storage';
import { TableData } from '@shared/models/table-data.model';
import { LocalStorageKey } from '@features/search/constants';

describe('SearchHistory', () => {
  let component: SearchHistory;
  let fixture: ComponentFixture<SearchHistory>;
  const historySubject = new BehaviorSubject<TableData[]>([{ 'label': 'Query', 'key': 'label' ,'id':'query'  }]);

  const localStore =  {
      searchHistory$: historySubject.asObservable(),
      deleteItem: (localstorageKey:string,key: string) => {},
      emitQuery: (query: string) => {}

    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHistory],
      providers
      : [
        { provide: LocalStorage, useValue: localStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 it('should set historyArray when searchHistory$ emits', () => {
   
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.historyArray).toEqual({data:[{ label: 'Query', key: 'label' ,id:'query'  }]});
  });
  it('testing click of search history', () => {
    const localStore = TestBed.inject(LocalStorage);
    vi.spyOn(component, 'emitQuery');
    vi.spyOn(localStore, 'deleteItem');
     component.ngOnInit();
    fixture.detectChanges();

    fixture.nativeElement.querySelector('tbody tr').click();
    expect(component.emitQuery).toHaveBeenCalledWith('query');

   
  });
   it('testing  delete of search history', () => {
    const localStore = TestBed.inject(LocalStorage);
    vi.spyOn(component, 'emitQuery');
    vi.spyOn(localStore, 'deleteItem');
     component.ngOnInit();
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.resultsContainer .deleteButton').click();
    expect(localStore.deleteItem).toHaveBeenCalledWith(LocalStorageKey,'Query');

   
  });
});
