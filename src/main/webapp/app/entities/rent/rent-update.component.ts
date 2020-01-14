import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IRent, Rent } from 'app/shared/model/rent.model';
import { RentService } from './rent.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

type SelectableEntity = ICustomer | IBook;

@Component({
  selector: 'jhi-rent-update',
  templateUrl: './rent-update.component.html'
})
export class RentUpdateComponent implements OnInit {
  isSaving = false;

  customers: ICustomer[] = [];

  books: IBook[] = [];
  termDp: any;

  editForm = this.fb.group({
    id: [],
    term: [],
    customer: [],
    book: []
  });

  constructor(
    protected rentService: RentService,
    protected customerService: CustomerService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rent }) => {
      this.updateForm(rent);

      this.customerService
        .query()
        .pipe(
          map((res: HttpResponse<ICustomer[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICustomer[]) => (this.customers = resBody));

      this.bookService
        .query()
        .pipe(
          map((res: HttpResponse<IBook[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IBook[]) => (this.books = resBody));
    });
  }

  updateForm(rent: IRent): void {
    this.editForm.patchValue({
      id: rent.id,
      term: rent.term,
      customer: rent.customer,
      book: rent.book
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rent = this.createFromForm();
    if (rent.id !== undefined) {
      this.subscribeToSaveResponse(this.rentService.update(rent));
    } else {
      this.subscribeToSaveResponse(this.rentService.create(rent));
    }
  }

  private createFromForm(): IRent {
    return {
      ...new Rent(),
      id: this.editForm.get(['id'])!.value,
      term: this.editForm.get(['term'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      book: this.editForm.get(['book'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
