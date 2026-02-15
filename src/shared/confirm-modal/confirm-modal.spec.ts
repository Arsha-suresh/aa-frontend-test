import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModal } from './confirm-modal';

describe('ConfirmModal', () => {
  let component: ConfirmModal;
  let fixture: ComponentFixture<ConfirmModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmModal);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('showModal', true);
    
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test onConfirm',()=>{
    vi.spyOn(component.confirm,'emit');
    fixture.nativeElement.querySelector('.confirm').click();
    expect(component.confirm.emit).toHaveBeenCalled();
  });
   it('should test cancel',()=>{
    vi.spyOn(component.cancel,'emit');
    fixture.nativeElement.querySelector('.cancel').click();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

});
