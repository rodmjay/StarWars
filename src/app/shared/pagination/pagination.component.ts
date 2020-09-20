import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'pm-pagination',
  templateUrl: './pagniation.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input() page: number;
  @Input() size: number;
  @Output() pageChanged = new EventEmitter();

  handlePaging() {
    this.pageChanged.emit(this.page.toString());
  }

}
