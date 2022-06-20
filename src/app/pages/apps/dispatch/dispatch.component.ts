import { Component, OnInit, TemplateRef, ViewChild, ElementRef, HostListener } from '@angular/core'
import * as moment from 'moment'

import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { merge, Observable, Subject } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { OrderModule, DispatchModule, BillModule, OrderItemModule } from './dispatch.module'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { Location } from '@angular/common'

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styles: [
    `
      button {
        margin-bottom: 16px;
      }

      .editable-cell {
        position: relative;
      }

      .editable-cell-value-wrap {
        padding: 5px 12px;
        cursor: pointer;
      }

      .editable-row:hover .editable-cell-value-wrap {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
      }
    `,
  ],
})
export class DispatchComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead
  @ViewChild('quantityel', { static: false }) public quantityel: TemplateRef<any> //productinput
  @ViewChild('discper', { static: false }) public discperel: TemplateRef<any>
  @ViewChild('disc', { static: false }) public discel: TemplateRef<any>
  // @ViewChild('instance2', { static: true }) instance2: NgbTypeahead
  @ViewChild('productautocomplete', { static: false }) public productinput: TemplateRef<any>
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef

  model: any = 'QWERTY'
  order: OrderModule
  Disp: DispatchModule
  orderItem: OrderItemModule
  Bill: BillModule
  inputValue: string = ''
  focus$ = new Subject<string>()
  click$ = new Subject<string>()

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.products
              .filter(
                v =>
                  v.product.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                  v.barCode?.toLowerCase().indexOf(term.toLowerCase()) > -1,
              )
              .slice(0, 10),
      ),
    )

  formatter = (x: { product: string }) => x.product

  searchdispatch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.cusList
              .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    )

  formatterdispatch = (x: { name: string }) => x.name

  searchStock = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.Stocks.filter(
              v => v.stockContainerName.toLowerCase().indexOf(term.toLowerCase()) > -1,
            ).slice(0, 10),
      ),
    )

  formatterStock = (x: { stockContainerName: string }) => x.stockContainerName

  // @ViewChild('cardnumber', { static: false }) cardnumber: ElementRef;
  buffer = ''
  paymenttypeid = 1
  isuppercase: boolean = false
  WaiterId = null
  prd: any
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let data = this.buffer || ''
    if (event.key !== 'Enter' && event.key !== 'Shift') {
      // barcode ends with enter -key
      if (this.isuppercase) {
        data += event.key.toUpperCase()
        this.isuppercase = false
      } else {
        data += event.key
      }
      this.buffer = data
    } else if (event.key === 'Shift') {
      this.isuppercase = true
    } else {
      this.buffer = ''
      this.setproductbybarcode(data)
    }
    // console.log(event)
  }
  // OrderedByName:'';
  // OrderedById:null;
  // SuppliedById:null;
  // SupplierName:'';
  scrollContainer: any
  finalarray: any = []
  products: any = []
  Stocks: any = []
  OrdData: any = []
  popupData: any = []
  stores: any = []
  filteredvalues = []
  barcValue: string = ''
  cartitems: any = []
  ordDetails: any = []
  ordPrdDetails: any = []
  subtotal = 0
  OrdItemId = 0
  searchTerm = ''
  tax = 0
  DispatchById = 0
  discount = 0
  isVisible = false
  batchno = 5
  isShown = true
  isTable = false
  isTab = true
  ordNo = 0
  storeId = 0
  orderDate = ''
  CustomerAddressId = null
  CompanyId: any
  CustomerId = null
  InvoiceNo = 0
  sourceId = 0
  DiningTableId = null
  Price = 0
  refamt = 0
  Tax1 = 0
  Tax2 = 0
  Tax3 = 0
  CancelStatus = 0
  ProdStatus = ''
  DispatchStatus = 0
  ReceiveStatus = 0
  OrderStatusId = 0
  OrderedById = 0
  SuppliedById = 0
  SuppliedBy = ''
  OrderedBy = ''
  FoodReady = true
  OrderType = 2
  UserId = null
  SpecialOrder = false
  Charges
  OrderDiscount = 0
  OrderTaxDisc = 0
  OrderTotDisc = 0
  AllItemDisc = 0
  AllItemTaxDisc = 0
  AllItemTotalDisc = 0
  DiscAmount = 0
  DiscPercent = 0
  SplitTableId = 0
  PreviousStatusId = 0
  AutoOrderId = 0
  isRxve = true
  isNRxve = false
  closeResult = ''
  ordId = null
  TotalProductSale = 0
  TotalPrdQty = 0
  streId = 0
  OrdId = 0
  dispatchTypeId = 1
  StkContainerName = ''
  StoreId: any
  // ContainerName ='';
  act = 'Chk'
  users = []
  orderType = 'Receiver'
  orderStatus = null
  numRecordsStr = 50
  dispatchStatus = 1
  Ordprd: any = []
  loginfo
  tableData = [
    {
      key: '1',
      actionName: 'New Users',
      progress: { value: 60, color: 'bg-success' },
      value: '+3,125',
    },
    {
      key: '2',
      actionName: 'New Reports',
      progress: { value: 15, color: 'bg-orange' },
      value: '+643',
    },
    {
      key: '3',
      actionName: 'Quote Submits',
      progress: { value: 25, color: 'bg-primary' },
      value: '+982',
    },
  ]
  submitted: boolean = false
  temporaryItem: any = {
    DiscAmount: 0,
    DispatchQty: null,
    StorageStoreId: null,
    StorageStoreName: '',
    BatchNum: null,
    ContainerCount: null,
    ContainerId: null,
    ContainerName: '',
  }
  barcodeItem = {
    quantity: null,
    tax: 0,
    amount: 0,
    price: null,
    Tax1: 0,
    Tax2: 0,
    StorageStoreId: null,
    StorageStoreName: '',
    BatchNum: null,
    ContainerCount: null,
    ContainerId: null,
    ContainerName: '',
  }
  barcodemode: boolean = false
  customerdetails = { data_state: '', name: '', PhoneNo: '', email: '', address: '', companyId: 0 }
  customers: any = []
  ContainWgt: null
  StockContainerId: null
  createby: ''
  billId: 0
  array: any = []
  // quantityfc = new FormControl('', [Validators.required, Validators.min(1)]);

  constructor(
    private modalService: NgbModal,
    private Auth: AuthService,
    private notification: NzNotificationService,
    // private router: Router ,
    private _avRoute: ActivatedRoute,
    public location: Location,
  ) {
    this.OrdId = this._avRoute.snapshot.params['id']
    this.users = JSON.parse(localStorage.getItem('users'))
  }

  selectedsupplieritem(item) {
    console.log('item', item)
    this.SuppliedById = item.id
  }
  searchsupplier = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.cusList
              .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    )

  formattersupplier = (x: { name: string }) => x.name

  selectedreceiveritem(item) {
    console.log('item', item)
    this.OrderedById = item.id
  }
  searchreceiver = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ''
          ? []
          : this.stores.cusList
              .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    )

  formatterreceiver = (x: { name: string }) => x.name

  isEditting: boolean = false

  getorderPrd(orderId) {
    this.isEditting = true
    this.OrdId = orderId
    if (this.OrdId != 0) {
      this.Auth.getorderPrd(this.CompanyId, this.OrdId).subscribe(data => {
        this.ordPrdDetails = data
        console.log('hhhhhhhhhhrtughggg', this.ordPrdDetails)
        this.ordPrdDetails.orderProd.forEach(element => {
          element.Action = 'Chk'
          ;(element['Action'] = 'Chk'), (element['ordItemType'] = 2)
          this.array.push({
            CompanyId: element['companyId'],
            ContainerId: element['containerId'],
            ContainerWeight: element['containerWeight'],
            OpenQty: element['orderQuantity'],
            GrossQty: element['orderQuantity'],
            DispatchQty: element['orderQuantity'],
            OrderQuantity: element['orderQuantity'],
            DispatchProductId: element['productId'],
            ProductId: element['productId'],
            Dispatchprd: element['description'],
            ProductName: element['description'],
            Price: element['unitPrice'],
            Tax1: element['tax1'],
            Tax2: element['tax2'],
            Action: element['Action'],
            OrderItemId: element['orderItemId'],
            OrderId: element['orderId'],
            Updated: element['updated'],
            OrderItemDetailId: element['id'],
            barcodeId: element['barcodeId'],
            OrderItemType: element['ordItemType'],
            OrdItemDetailId: element['orderItemDetailId'],
            OrderItemRefId: element['orderItemRefId'],
            RefId: element['refId'],
          })
        })
        this.SuppliedById = this.ordPrdDetails.order[0].suppliedById
        this.OrderedById = this.ordPrdDetails.order[0].orderedById
        this.SuppliedBy = this.ordPrdDetails.order[0].suppliedBy
        this.OrderedBy = this.ordPrdDetails.order[0].orderedBy
        this.StoreId = this.ordPrdDetails.order[0].storeId
        console.log('array', this.array)
        // console.log('ordPrdDetails', this.ordPrdDetails)
      })
    }
  }
  getorderedList: any
  NewArr: any = []
  deleteOrder(Id) {
    console.log('delete', Id)
    console.log(this.NewArr)
    this.Auth.deleteItem({ companyId: this.CompanyId, orderId: Id }).subscribe(data => {
      this.getorderedList = data
      console.log('delete', data)
      this.GetDispatchList()
    })
  }

  getBarcodeProduct() {
    this.Auth.getBarcodeProduct(this.CompanyId, this.StoreId).subscribe(data => {
      console.log(data)
      this.products = data['products']
      this.batchno = data['lastbatchno'] + 1
    })
  }
  getStockContainer() {
    this.Auth.getStockContainer(this.CompanyId, this.StoreId).subscribe(data => {
      console.log('Stocks', data)
      this.Stocks = data
    })
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    this.order = new OrderModule(2, this.OrdId)
    this.products = []
    this.getBarcodeProduct()
    this.getStockContainer()
    this.getStoreList()
    this.GetDispatchList()

    // this.Auth.getdbdata(['loginfo']).subscribe(data => {
    //   this.loginfo = data['loginfo'][0]
    //   this.StoreId = this.StoreId
    //   this.CompanyId = this.CompanyId
    //   console.log(this.loginfo)
    //   this.order = new OrderModule(2, this.OrdId)
    //   this.products = []
    //   this.getBarcodeProduct()
    //   this.getStockContainer()
    //   this.getStoreList()
    //   this.GetDispatchList()
    // })

    // this.getord();
    // this.getorderPrd()
    // this.products = JSON.parse(localStorage.getItem("Product"));
    this.products.forEach(product => {
      product.quantity = null
      product.tax = 0
      product.amount = 0
    })
  }
  // getOrderList() {
  //   this.Auth.getorder(this.Ordprd).subscribe(data => {
  //     this.OrdData = data
  //     console.log('OrdData', this.OrdData)
  //   })
  // }

  setproductbybarcode(data) {}
  barcodereaded(event) {
    console.log(event)
    console.log(event.element.nativeElement.id)
    var product = this.products.filter(x => x.Id == +event.element.nativeElement.id)[0]
    this.inputValue = product.Product
    this.barcodeItem = product
    this.barcodeItem.quantity = 1
    if (this.cartitems.some(x => x.Id == this.barcodeItem['Id'])) {
      this.cartitems.filter(
        x => x.Id == this.barcodeItem['Id'],
      )[0].quantity += this.barcodeItem.quantity
    } else {
      this.cartitems.push(Object.assign({}, this.barcodeItem))
    }
    this.calculate()
    this.barcodeItem = {
      quantity: null,
      tax: 0,
      amount: 0,
      price: null,
      Tax1: 0,
      Tax2: 0,
      StorageStoreId: null,
      StorageStoreName: '',
      BatchNum: null,
      ContainerCount: this.ContainWgt,
      ContainerId: this.StockContainerId,
      ContainerName: '',
    }
    this.barcValue = ''
  }
  delete(index) {
    this.order.Items.splice(index, 1)
    this.order.setbillamount()
  }
  settotalprice(i, qty) {
    this.cartitems[i].amount = this.cartitems[i].Price * this.cartitems[i].orderQuantity
    this.cartitems[i].tax =
      (this.cartitems[i].amount * (this.cartitems[i].Tax1 + this.cartitems[i].Tax2)) / 100
    console.log(
      i,
      this.cartitems[i].Price,
      this.cartitems[i].orderQuantity,
      this.cartitems[i].amount,
      qty,
    )
    this.cartitems[i].amount = +this.cartitems[i].amount.toFixed(2)
    this.calculate()
  }

  calculate() {
    this.subtotal = 0
    this.tax = 0
    this.discount = 0
    this.cartitems.forEach(item => {
      console.log(item)
      item.amount = item.price * item.quantity
      item.tax = (item.taxpercent * item.amount) / 100
      item.amount = +item.amount.toFixed(2) - item.disc
      this.subtotal += item.price * item.quantity
      this.tax += item.tax
      this.discount += item.disc
      // item.dispatchPrd =item.Product
    })
    this.subtotal = +this.subtotal.toFixed(2)
    this.tax = +this.tax.toFixed(2)
    this.discount = +this.discount.toFixed(2)
    // console.log(this.tax)
  }
  date = new Date()
  onChange(e) {
    console.log('date', e)
    this.orderDate = moment().format('YYYY-MM-DD HH:MM A')
  }
  showModal(): void {
    this.isVisible = true
  }
  dispatch() {}
  validation() {
    var isvalid = true
    if (!this.temporaryItem.productId) isvalid = false
    if (this.temporaryItem.DispatchQty <= 0) isvalid = false
    // if (this.temporaryItem.Price <= 0) isvalid = false;
    return isvalid
  }

  selectedItem(item) {
    console.log(item, Object.assign({}, this.temporaryItem))
    Object.keys(item).forEach(key => {
      this.temporaryItem[key] = item[key]
    })
    console.log(this.temporaryItem)
    this.quantityel['nativeElement'].focus()
  }
  // selectItem(item) {
  //   console.log(item)
  //   // console.log(item,Object.assign({},this.temporaryItem))
  //   // Object.keys(item).forEach(key => {
  //   //   this.temporaryItem[key] = item[key]
  //   // })
  //   // console.log(this.temporaryItem)
  //   this.ContainWgt = item.containerWight
  //   this.StockContainerId = item.stockContainerId
  //   this.StkContainerName = item.stockContainerName
  //   this.createby = item.createdBy
  //   this.addItem()
  // }
  selecteddispatchitem(item) {
    console.log('item', item)
    this.DispatchById = item.id
    // this.order.push({OrdNo:item.id})
  }
  productbybarcode = []
  barcode = ''
  searchbybarcode() {
    this.productbybarcode = this.products.filter(x => x.barCode == this.barcode)[0]
    console.log(this.barcode, this.productbybarcode, this.products)
    this.model = this.productbybarcode['product']
  }
  addItem() {
    console.log('temporaryItem', this.temporaryItem)
    this.temporaryItem.ContainerCount = this.ContainWgt
    this.temporaryItem.ContainerId = this.StockContainerId
    this.temporaryItem.ContainerName = this.StkContainerName
    this.temporaryItem.StorageStoreId = this.StoreId
    this.submitted = true
    if (this.validation()) {
      if (this.order.Items.some(x => x.BarcodeId == this.temporaryItem['barcodeId'])) {
        this.order.Items.filter(
          x => x.BarcodeId == this.temporaryItem['barcodeId'],
        )[0].OrderQuantity += this.temporaryItem.Quantity
        this.order.Items.filter(
          x => x.BarcodeId == this.temporaryItem['barcodeId'],
        )[0].OrderQuantity += this.temporaryItem.Quantity
        this.order.setbillamount()
      } else {
        this.order.OrderType = this.OrderType
        this.order.SpecialOrder = this.SpecialOrder
        this.order.DiscPercent = this.DiscPercent
        this.order.PreviousStatusId = this.PreviousStatusId
        this.order.ProdStatus = '1'
        this.order.WipStatus = '1'
        this.order.Id = this.ordId
        this.order.SuppliedById = this.SuppliedById
        this.order.OrderedById = this.OrderedById
        this.order.StoreId = this.StoreId
        this.order.OrderedDateTime = moment().format('YYYY-MM-DD HH:MM A')
        this.order.OrderedDate = moment().format('YYYY-MM-DD HH:MM A')
        this.order.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
        this.order.BillDate = moment().format('YYYY-MM-DD HH:MM A')
        this.order.BillDateTime = moment().format('YYYY-MM-DD HH:MM A')
        this.order.addproduct(this.temporaryItem, this.OrdId, this.StoreId)
        // this.order.addprod(this.temporaryItem)
        console.log('order', this.order.OrderDetail)
      }
      this.products.forEach(prod => {
        if (prod.barcodeId == this.temporaryItem['barcodeId']) {
          prod.quantity -= this.temporaryItem.DispatchQty
          prod.ContainerCount = this.ContainWgt
          prod.ContainerId = this.StockContainerId
          prod.ContainerName = this.StkContainerName
        }
        // prod.product =this.temporaryItem.dispatchPrd;
        // prod.productId =this.temporaryItem.dispatchPrdId;
      })
      this.temporaryItem = { DiscAmount: 0, DispatchQty: null, DiscPercent: 0 }
      this.productinput['nativeElement'].focus()
      this.model = ''
      this.filteredvalues = []
      this.submitted = false
      // console.log(this.order)
      return
    }
  }

  getStoreList() {
    this.Auth.getstores(this.CompanyId).subscribe(data => {
      this.stores = data
      console.log(this.stores)
    })
  }
  receiveStk(id) {
    console.log(id)
    this.Auth.editInternalord(id).subscribe(data => {
      console.log(data)
      this.GetDispatchList()
    })
  }
  deleteItem(item) {
    console.log('delete', item)
    this.Auth.deletedata(item).subscribe(data => {
      console.log('delete', data)
    })
  }

  OrdDispatch() {
    this.order.BillDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.BillDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.order.OrderedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.OrderedDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.order.DeliveryDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.order.ModifiedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.order.setbillamount()
    var finalarray = [...this.array, ...this.order.Items]
    this.Disp = new DispatchModule(
      this.OrdId,
      this.OrderedById,
      this.SuppliedById,
      (this.DispatchById = null),
      this.dispatchTypeId,
      finalarray,
      this.orderDate,
      this.users,
      this.createby,
      this.order.OrderDetail,
      this.OrdItemId,
      this.CompanyId,
      this.billId,
    )
    console.log('finalarray', finalarray)
    console.log('final5555array', this.Disp)
    // this.Auth.corsTest(this.Disp).subscribe(data => {
    //   console.log(data)
    // })
    this.Auth.dispatch(this.Disp).subscribe(data => {
      console.log('temporry', data)
      this.notification.success('Dispatch Updated', 'Dispatch Updated Successfully')
      this.GetDispatchList()
    })
    this.order.setbillamount()
    // this.order.add(this.prd)

    this.isEditting = false
  }

  openDetailpopup(contentdetail, id) {
    this.Ordprd.push({
      companyId: this.CompanyId,
      searchId: id,
      UserID: this.users[0].id,
      orderType: this.orderType,
      orderStatus: this.orderStatus,
      numRecordsStr: this.numRecordsStr,
      dispatchStatus: this.dispatchStatus,
    })
    // this.Auth.getorder(this.Ordprd).subscribe(data => {
    //   this.popupData = data
    //   console.log('popupData', this.popupData)
    // })
    this.TotalProductSale = 0
    this.TotalPrdQty = 0

    for (let i = 0; i < this.popupData.order.length; i++) {
      this.TotalProductSale = this.TotalProductSale + this.popupData.order[i].totalsales
      this.TotalPrdQty = this.TotalPrdQty + this.popupData.order[i].qty
      this.TotalProductSale = +this.TotalProductSale.toFixed(2)
      this.TotalPrdQty = +this.TotalPrdQty.toFixed(2)
    }
    const modalRef = this.modalService
      .open(contentdetail, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      })
      .result.then(
        result => {},
        reason => {},
      )
  }

  Tabledata: []
  getdispatchList: any = []
  GetDispatchList() {
    this.Auth.GetDispatch(this.CompanyId, this.StoreId).subscribe(data => {
      this.getdispatchList = data['order']
      this.Tabledata = this.getdispatchList
      console.log(this.getdispatchList)
      // this.StoreByidInternal(0)
    })
  }

  term: string = ''
  filtersearch(): void {
    this.Tabledata = this.term
      ? this.getdispatchList.filter(x =>
          x.description.toLowerCase().includes(this.term.toLowerCase()),
        )
      : this.getdispatchList
    console.log(this.Tabledata)
  }

  StoreByidInternal(storeId) {
    this.Auth.getstoreIdInternal(this.CompanyId, storeId).subscribe(data => {
      const stores = data['storeList']
      this.getdispatchList.forEach(order => {
        order.supplier = stores.filter(x => x.id == order.SuppliedById)[0]?.name
        order.receiver = stores.filter(x => x.id == order.OrderedById)[0]?.name
      })
    })
  }

  quantitychange(Items: OrderItemModule, event) {
    console.log(Items, this.validation())
    console.log(this.products)
    // if (this.validation()) {
    var prod = this.products.filter(x => x.stockBatchId == Items.stockBatchId)[0]
    // console.log(Items.OrderQuantity, prod.maxqty)
    // console.log(this.products)
    if (Items.OrderQuantity && Items.OrderQuantity <= prod.maxqty) {
      // console.log('%c GOOD! ', 'color: #bada55')
      this.products.filter(x => x.stockBatchId == Items.stockBatchId)[0].quantity =
        prod.maxqty - Items.OrderQuantity
      this.order.setbillamount()
    } else if (Items.OrderQuantity == 0 || Items.OrderQuantity == null) {
      event.preventDefault()
      // console.log('%c VERY LOW! ', 'color: orange')
      Items.OrderQuantity = 1
      this.products.filter(x => x.stockBatchId == Items.stockBatchId)[0].quantity = prod.maxqty - 1
      this.order.setbillamount()
    } else {
      event.preventDefault()
      // console.log('%c EXCEED! ', 'color: red')
      Items.OrderQuantity = 1
      this.products.filter(x => x.stockBatchId == Items.stockBatchId)[0].quantity = prod.maxqty - 1
      this.order.setbillamount()
    }
    // }
    // console.log(Items.OrderQuantity)
    // this.calculate()
    this.buffer = ''
  }
}

// getErrorMessage() {
//   if (this.quantityfc.hasError('required')) {
//     return "Quantity can't be Empty";
//   }

//   return this.quantityfc.hasError('min') ? 'Quantity should be greater than 0' : '';
// }

// addRow(): void {
//   this.listOfData = [
//     ...this.listOfData,
//     {
//       id: `${this.i}`,
//       name: ` ${this.i}`,
//       age: '',
//       address: ` ${this.i}`,
//     },
//   ]
//   this.i++
// }
// getBatchProduct() {
//   this.Auth.getBarcodeProduct(this.CompanyId,this.streId).subscribe(data => {
//     this.products = data["products"];
//     console.log(this.products);
//     this.batchno = data["lastbatchno"] + 1;
//   })
// }

// onInputAutocomplete() {
//   this.filterproduct = this.products.filter(x => x.name.toLowerCase().includes(this.inputValue));
// }

// pushintobatch()
// {
//   console.log("hjhjh",this.listOfData)
//   this.submitted = true;
//   if (this.validation()) {
//      this.newarray.batchno = this.batchno;
//      this.newarray.entrydatetime = moment(this.batchdate).format('YYYY-MM-DD HH:MM A');
//     this.dispatch.push(this.newarray);
//     this.newarray = { productId: null, quantity: null, price: null,tax1:null,tax2:null,amount:null,taxamt:null,dispatchproductId:null, dispatchproduct:'',storagestoreId:null, companyid: 1, storeid: 8, product: null, batchno: 0, entrydatetime: "" }
//     this.inputValue = '';
//     this.submitted = false;
//     console.log("hjhjh",this.dispatch)
//   }

// }
// validation() {
//   var isvalid = true;
//   if (this.newarray.productId <= 0) isvalid = false;
//   if (this.newarray.quantity <= 0) isvalid = false;
//   if (this.newarray.price <= 0) isvalid = false;
//  if (this.batchno == 0) isvalid = false;
//   if (this.batchdate == null) isvalid = false;
//   return isvalid;
// }

// deleteRow(id: string): void {
//   this.listOfData = this.listOfData.filter(d => d.id !== id)
// }

// delete(index) {
//   this.dispatch.splice(index, 1);
// }

// startEdit(id: string, event: MouseEvent): void {
//   event.preventDefault()
//   event.stopPropagation()
//   this.editId = id
// }
