import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IBook, Book } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author/author.service';

@Component({
  selector: 'jhi-book-update',
  templateUrl: './book-update.component.html'
})
export class BookUpdateComponent implements OnInit {
  isSaving = false;

  authors: IAuthor[] = [];
  writedAtDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    writedAt: [],
    author: []
  });

  constructor(
    protected bookService: BookService,
    protected authorService: AuthorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ book }) => {
      this.updateForm(book);

      this.authorService
        .query()
        .pipe(
          map((res: HttpResponse<IAuthor[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAuthor[]) => (this.authors = resBody));
    });
  }

  updateForm(book: IBook): void {
    this.editForm.patchValue({
      id: book.id,
      name: book.name,
      writedAt: book.writedAt,
      author: book.author
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const book = this.createFromForm();
    if (book.id !== undefined) {
      this.subscribeToSaveResponse(this.bookService.update(book));
    } else {
      this.subscribeToSaveResponse(this.bookService.create(book));
    }
  }

  private createFromForm(): IBook {
    return {
      ...new Book(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      writedAt: this.editForm.get(['writedAt'])!.value,
      author: this.editForm.get(['author'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>): void {
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

  trackById(index: number, item: IAuthor): any {
    return item.id;
  }
}
