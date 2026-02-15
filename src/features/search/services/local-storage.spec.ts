import { TestBed } from '@angular/core/testing';

import { LocalStorage } from './local-storage';
import { BehaviorSubject } from 'rxjs';
import { TableData } from '@shared/models/table-data.model';

describe('LocalStorage', () => {
  let service: LocalStorage;
   const subject = new BehaviorSubject<TableData[]>([{ 'label': 'Query', 'key': 'label' ,'id':'query'  }]);
  

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set and get item correctly', () => {
    const key = 'testKey';
    const value = [{ label: 'Test Query', key: 'label', id: 'test' }];
    service.setItem(key, value);
    const retrieved = service.getItem<TableData[]>(key);
    expect(retrieved).toEqual(value);
  });
  it('should update item correctly', () => {
    const key = 'testKey';
    const initialValue = [{ label: 'Test Query', key: 'label', id: 'test' }];
    service.setItem(key, initialValue);
    const newValue = { label: 'New Query', key: 'label', id: 'new' };
    service.updateItem(key, newValue);
    const retrieved = service.getItem<TableData[]>(key);
    expect(retrieved).toEqual([...initialValue, newValue]);
  }); 
  it('should delete item correctly', () => {
    const key = 'testKey';
    const initialValue = [{ label: 'Test Query', key: 'label', id: 'test' }];
    service.setItem(key, initialValue);
    service.deleteItem(key,'Test Query');
    const retrieved = service.getItem<TableData[]>(key);
    expect(retrieved).toEqual([]);
  }); 
});
