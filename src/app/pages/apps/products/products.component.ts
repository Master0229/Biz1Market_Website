import { Component, OnInit } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  CompanyId: any
  id: any
  taxgroups: any
  taxGroupId: number
  producttypes: any
  units: any
  kotgroups: any
  categories: any
  masterproduct: any = []
  product = { id: 0, name: '', description: '', category: '', tax: 0, price: 0 }
  isvisible: boolean
  visible = false
  checked: Boolean = true
  listOfSearchName: string[] = []
  listOfSearchAddress: string[] = []
  // term: string = '';
  term: ''
  https = 0
  prod: any
  products: any
  // listOfData = orders
  // listOfDisplayData = [...this.listOfData]
  mapOfSort: { [key: string]: any } = {
    id: null,
    name: null,
    description: null,
    category: null,
    tax: null,
    price: null,
    quantity: null,
    status: null,
  }
  sortName: string | null = null
  sortValue: string | null = null
  loginfo: any
  constructor(private modalService: NgbModal, private Auth: AuthService) {
    // var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    // this.CompanyId = logInfo.CompanyId;
  }
  // listOfPosition: NzPlacementType[] = [
  //   'bottomLeft'
  // ]
  // contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
  //   this.nzContextMenuService.create($event, menu)
  // }

  // closeMenu(): void {
  //   this.nzContextMenuService.close()
  // }
  ngOnInit() {
    this.getMasterproduct()
    // this.getproducts();
    // this.gettax();
    // this.getproducttype();
    // this.getUnits();
    // this.getKotGroups();
    // this.getCategories();
  }
  open(): void {
    this.visible = true
  }

  close(): void {
    this.visible = false
  }
  arrayBuffer: any
  file: File
  incomingfile(event) {
    this.file = event.target.files[0]
    console.log(this.file)
  }
  sort(sortName: string, value: string): void {
    this.sortName = sortName
    this.sortValue = value
    for (const key in this.mapOfSort) {
      if (this.mapOfSort.hasOwnProperty(key)) {
        this.mapOfSort[key] = key === sortName ? value : null
      }
    }
  }

  active(id, act) {
    console.log(id, act)
    this.Auth.prdactive(id, act).subscribe(data => {
      this.getMasterproduct()
    })
  }

  changefilter(bool) {
    console.log(bool)
    if (bool) {
      this.prod = this.masterproduct.products
    } else {
      this.prod = this.masterproduct.products.filter(x => x.isactive)
    }
    console.log(this.prod.length)
  }

  getMasterproduct() {
    this.Auth.getProduct(this.id, (this.CompanyId = 1)).subscribe(data => {
      this.masterproduct = data
      this.prod = this.masterproduct.products.filter(x => x.isactive)
      console.log(this.prod)
      // this.filteredvalues = this.masterproduct;
      // console.log(this.masterproduct)
      // this.https++;
      // if (this.https == 6)
      //   this.setproducts();
    })
  }
  gettax() {
    this.Auth.getTax(this.loginfo.companyId).subscribe(data => {
      this.taxgroups = data
      console.log(this.taxgroups)
    })
  }
  getproducttype() {
    this.Auth.getProductType().subscribe(data => {
      this.producttypes = data
      console.log(data)
    })
  }
  getUnits() {
    this.Auth.getUnits().subscribe(data => {
      this.units = data
      console.log(data)
    })
  }
  getKotGroups() {
    this.Auth.getKotgroups().subscribe(data => {
      this.kotgroups = data
      console.log(data)
    })
  }
  // getCategories() {
  //   this.Auth.getCategory(this.loginfo.CompanyId).subscribe(data => {
  //     this.categories = data;
  //     console.log(this.categories);

  //   });
  // }
  // setproducts() {
  //   // this.masterproduct.forEach(prod => {
  //   //   prod.category = this.categories.filter(x => x.id == prod.categoryId)[0];
  //   //   prod.taxGroup = this.taxgroups.filter(x => x.id == prod.taxGroupId)[0];
  //   // });
  //   this.filteredvalues = this.masterproduct;
  //   console.log(this.masterproduct)
  // }

  // filteredvalues = [];
  // filtersearch(): void {
  //   this.filteredvalues = this.term
  //     ? this.masterproduct.filter(x => x.name.toLowerCase().includes(this.term.toLowerCase()))
  //     : this.masterproduct;
  //   console.log(this.filteredvalues)
  // }
}
