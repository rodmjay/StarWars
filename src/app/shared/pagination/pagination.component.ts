import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'sw-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input() page: number;
  @Input() size: number;
  @Input() totalPages: number;

  @Output() pageChanged = new EventEmitter<number>();

  handlePaging() {
    this.pageChanged.emit(this.page);
  }

  setPage(value: number) {
    this.page = value;
    this.handlePaging();
  }

  prev(): void {
    this.page--;
    this.handlePaging();
  }

  next(): void {
    this.page++;
    this.handlePaging();
  }
}
