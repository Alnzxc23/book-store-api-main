import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../shared/model/Book";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../services/book/book.service";
import {Apiservice} from "../services/book/apiservice";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-feedbacktable',
  templateUrl: './feedbacktable.component.html',
  styleUrls: ['./feedbacktable.component.css']

})
export class FeedbacktableComponent implements OnInit {

  book!: Book;
  books: Book[] = [];

  displayedColumns: string[] = ['id', 'name', 'rating', 'feedback'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService, private api: Apiservice) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.book = bookService.getBookById(params['id']);
    })

  }
 getfeedbakAll(){
    this.api.getBook()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort
        }
      })
 }
  ngOnInit(): void {
    this.books = this.bookService.getAll();
    this.getfeedbakAll();
    }
}

