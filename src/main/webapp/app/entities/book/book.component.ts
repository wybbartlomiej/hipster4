import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBook } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { BookDeleteDialogComponent } from './book-delete-dialog.component';

@Component({
  selector: 'jhi-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit, OnDestroy {
  books?: IBook[];
  eventSubscriber?: Subscription;

  constructor(protected bookService: BookService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.bookService.query().subscribe((res: HttpResponse<IBook[]>) => {
      this.books = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBooks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBook): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBooks(): void {
    this.eventSubscriber = this.eventManager.subscribe('bookListModification', () => this.loadAll());
  }

  delete(book: IBook): void {
    const modalRef = this.modalService.open(BookDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.book = book;
  }
}
