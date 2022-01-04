import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  CompanyId:any;
  categories:any = [];
  term: string = '';
  constructor(private Auth: AuthService) { }

  ngOnInit(): void {
    this.getCategory();
  }
  getCategory(){
    this.Auth.getcategories(1, 'A').subscribe(data => {
      this.categories = data;
       this.filteredvalues = this.categories;
      console.log(this.categories)
    })
  }
  filteredvalues = [];
  filtersearch(): void {
    this.filteredvalues = this.term
      ? this.categories.filter(x => x.description.toLowerCase().includes(this.term.toLowerCase()))
      : this.categories;
    console.log(this.filteredvalues)
  }

}
