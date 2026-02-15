import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModal {
  showModal =model(false);
  title = input('Confirm');
  message = input('Are you sure?');

  confirm = output();
  cancel = output();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
    this.showModal.set(false);
  }
}
