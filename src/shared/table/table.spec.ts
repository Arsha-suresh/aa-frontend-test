import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table } from './table';

describe('Table', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {data:[
      { name: 'John', age: 30 , id:'20'}
    ]});
    fixture.componentRef.setInput('columns', [
      { label: 'Name', key: 'name' },
      { label: 'Age', key: 'age' }
    ]);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('disableNext', false);
    fixture.componentRef.setInput('deleteKey', 'name');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selId on row click', () => {
    vi.spyOn(component.selId, 'emit');
    const row = fixture.nativeElement.querySelector('tbody tr');
    row.click();
    expect(component.selId.emit).toHaveBeenCalledWith('20');
  });

  it('should emit prevPageOutput on prevPage', () => {
    vi.spyOn(component.prevPageOutput, 'emit');
    fixture.componentRef.setInput('page', 2);
    fixture.detectChanges();
    component.prevPage();
    expect(component.prevPageOutput.emit).toHaveBeenCalled();
  }); 

  it('should emit nextPageOutput on nextPage', () => {
    vi.spyOn(component.nextPageOutput, 'emit');
    component.nextPage();
    expect(component.nextPageOutput.emit).toHaveBeenCalled();
  });

  it('should emit deleteRowOutput on deleteRow', () => {
    vi.spyOn(component.deleteRowOutput, 'emit');
    fixture.componentRef.setInput('enableDeleteRow', true);
    fixture.detectChanges();
    const deleteButton = fixture.nativeElement.querySelector('.deleteButton');
    deleteButton.click();
    expect(component.deleteRowOutput.emit).toHaveBeenCalledWith('John');
  }); 
  it('should hide pagination if hidePagination is true', () => {
    fixture.componentRef.setInput('hidePagination', true);
    fixture.detectChanges();
    const pagination = fixture.nativeElement.querySelector('.pagination');
    expect(pagination).toBeNull();
  });

  it('should hide columns if hideColumn is true', () => {
    fixture.componentRef.setInput('hideColumn', true);
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(0);
  });
  it('should hide columns if empty template is shown', () => {
    fixture.componentRef.setInput('data', {data:[]});
    fixture.detectChanges();
    const emptyText = fixture.nativeElement.querySelector('.empty span').textContent;
    expect(emptyText).toContain("No Results found");
  });
});
