import { NgTemplateOutlet } from '@angular/common';
import { Component, input,  output } from '@angular/core';
import { TableInput } from '@shared/models/table-input.model';
import { TableColumn } from '@shared/models/table.column.model';

@Component({
  selector: 'app-table',
  imports: [NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table  {
  data =  input.required<TableInput>();
  columns = input.required<TableColumn[]>();
  selId = output<string>();
  page = input.required<number>();
  disableNext = input.required<boolean>();
  prevPageOutput = output<void>();
  nextPageOutput = output<void>();
  hidePagination = input<boolean>(false);
  hideColumn=input<boolean>(false);
  enableDeleteRow = input<boolean>(false);
  deleteKey = input<string>('id');
  deleteRowOutput = output<string>();
  onRowClick(id: unknown) {
    this.selId.emit(id as string);
  }
 
  prevPage() {
    if (this.page && this.page() > 1) {
      this.prevPageOutput.emit();
    }
  }

   nextPage() {
    if (this.page() > 0 ) {
      this.nextPageOutput.emit();
    }
  }

  deleteRow(id:unknown, $event: Event) {
    $event.stopPropagation(); // Prevent the row click event from firing
    this.deleteRowOutput.emit(id as string);
  }

  

}
