import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Search } from './search';
import { Store } from '@features/search/stores/store';
import { map, of } from 'rxjs';
import { Facade } from '@features/search/services/facade';
import { Brewery } from '@features/search/models/Brewery';
import { ChangeDetectorRef } from '@angular/core';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  let breweries:Brewery[] = [
    {id: '1', name: 'Brewery 1', breweryType: 'micro', city: 'City 1', state: 'State 1', country: '', address: '', postalCode: '', longitude: '1', latitude: '23', phone: 98999999, websiteUrl: '', street: ''},
    {id: '2', name: 'Brewery 2', breweryType: 'macro', city: 'City 2', state: 'State 2', country: '', address: '', postalCode: '', longitude: '2', latitude: '23', phone: 9889900, websiteUrl: '', street: ''},  
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [
        {
          provide: Store, useValue: {
            clearBreweries: vi.fn() ,
            setBreweries: () => {},
            breweries: ()=>{ return {'1': breweries[0], '2': breweries[1]} }
            
             
          }
        },{
          provide: Facade, useValue: {
            searchBreweries: vi.fn().mockReturnValue(of(breweries as Brewery[]))
          }
        },
          {provide: ChangeDetectorRef, useValue:{  markForCheck: vi.fn(),
        detectChanges: vi.fn()}}
      ]   
    })
    .compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should initialize form', () => {
    vi.spyOn(component, 'search');
    component.ngOnInit();
    expect(component.form).toBeTruthy();
  });

  it('should search on search button submit click', () => {
    vi.spyOn(component, 'search');
    component.form.get('query')?.setValue('san');
    fixture.nativeElement.querySelector('.searchButton').click();
    expect(component.search).toHaveBeenCalled();
  });

  it('should call loadBreweries on search', () => {
    vi.spyOn(component, 'loadBreweries');
    component.form.get('query')?.setValue('san');
    component.search();
    expect(component.loadBreweries).toHaveBeenCalled();
  });

  it('should update tableData on successful search', () => {
    component.form.get('query')?.setValue('san');
    component.search()  ;
    fixture.detectChanges();
    expect(component.tableData).toEqual({
      data: breweries?.map(brewery => ({
          id: brewery.id,
          name: brewery.name,
          brewery_type: brewery.breweryType,
          city: brewery.city
        })),
    });
  });

 it('should test nextPageOutput', () => {
    vi.spyOn(component, 'loadBreweries');
    component.page.set(1);
    component.nextPageOutput();
    expect(component.page()).toBe(2);
    expect(component.loadBreweries).toHaveBeenCalledTimes(1);
 });

it('should test prevPageOutput does not go below 1', () => {
    vi.spyOn(component, 'loadBreweries');
    component.page.set(1);
    component.prevPageOutput();
    expect(component.page()).toBe(1);
    expect(component.loadBreweries).toHaveBeenCalledTimes(0);
  });
  it('should test prevPageOutput ', () => {
    vi.spyOn(component, 'loadBreweries');
    component.page.set(2);
    component.prevPageOutput();
    expect(component.page()).toBe(1);
    expect(component.loadBreweries).toHaveBeenCalledTimes(1);
  });


  it('should test showDetails',() => {
    component.showDetails('1');
    expect(component.selectedBrewery).toEqual(breweries[0]);
    expect(component.showResultsAndHistory()).toBe(false);
  });

  it('should test closeDetailsPage',() => {
    component.selectedBrewery = breweries[0];
    component.showResultsAndHistory.set(false);
    component.closeDetailsPage();
    expect(component.selectedBrewery).toBeNull();
    expect(component.showResultsAndHistory()).toBe(true);
  });

  it('should test reRunSearch',() => {
    vi.spyOn(component, 'search');
    component.reRunSearch('san');
    expect(component.form.get('query')?.value).toBe('san');
    expect(component.search).toHaveBeenCalled();
  });

  it('should  required validation  error message  in search html', () => {
    component.form.get('query')?.setValue('');
    component.search();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.errorMessage')?.textContent;
    expect(errorMessage).toContain("Please enter a search query");  
     });

     it('should minlength validation  error message  in search html', () => {
    component.form.get('query')?.setValue('mm');
    component.search();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.errorMessage')?.textContent;
    expect(errorMessage).toContain("Search query must be at least 3 characters long");  
     })

  it('should show each Data on successful search', () => {
    component.form.get('query')?.setValue('san');
    component.search();
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.searchResults tbody tr')[0].click();
    fixture.detectChanges();
    expect(component.selectedBrewery).toEqual(breweries[0]);
     expect(fixture.nativeElement.querySelector('.resultsContainer .title').textContent).toContain('Brewery 1');    
  });

  it("should rerun search on click of search history item", () => {
     component.form.get('query')?.setValue('san');
     vi.spyOn(component, 'reRunSearch');
    component.search();
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.history tbody tr')[0].click();
    expect(component.reRunSearch).toHaveBeenCalled();
  });
});
