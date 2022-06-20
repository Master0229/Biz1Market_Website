import { Component, OnInit, TemplateRef, ViewChild, ElementRef, HostListener } from '@angular/core'
import * as moment from 'moment'
import { FormControl, Validators } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd/modal'
import { NgbModal, ModalDismissReasons, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { merge, Observable, Subject } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { OrderItemModule, OrderModule, ReceiveModule } from './receive-ord.module'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { Location } from '@angular/common'

@Component({
  selector: 'app-receive-ord',
  templateUrl: './receive-ord.component.html',
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
export class ReceiveOrdComponent implements OnInit {
  @ViewChild('quantityel', { static: false }) public quantityel: TemplateRef<any> //productinput
  @ViewChild('discper', { static: false }) public discperel: TemplateRef<any>
  @ViewChild('disc', { static: false }) public discel: TemplateRef<any>
  // @ViewChild('instance2', { static: true }) instance2: NgbTypeahead
  @ViewChild('productautocomplete', { static: false }) public productinput: TemplateRef<any>
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef

  model: any = 'QWERTY'
  order: OrderModule
  RecData: ReceiveModule
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
  @HostListener('window:keyup', ['$event'])
  Idorder = 0
  radioValue = 'A'
  recUpdId = ''
  billAmountNoTax = null
  bill = 0
  OrdDispData: any
  scrollContainer: any
  dispList: any = []
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
  searchTerm = ''
  tax = 0
  receiveById = null
  discount = 0
  isVisible = false
  batchno = 5
  isDisp = false
  isShown = true
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
  FoodReady = true
  OrderType = 1
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
  StoreId = null
  // ContainerName ='';
  act = 'Chk'
  users = []
  displayprd: any = []
  Ordprd: any = []
  dispatchType = ''
  orderType = 'Receiver'
  orderStatus = null
  numRecordsStr = 50
  dispatchStatus = 1

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
  ResponsibleBy: null
  array: any = []
  billId = 0
  dispDetails: any = []
  billAmount = 0
  taxAmount = 0
  orderId = 0
  billStatus = 3
  // quantityfc = new FormControl('', [Validators.required, Validators.min(1)]);

  constructor(
    private modalService: NgbModal,
    private Auth: AuthService,
    private notification: NzNotificationService,
    private router: Router,
    private _avRoute: ActivatedRoute,
    public location: Location,
  ) {
    // this.OrdId = this._avRoute.snapshot.params["id"];
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

  dropdownnew(Value) {
    console.log('Value', Value)
    this.ResponsibleBy = Value
  }

  getord() {
    this.Ordprd.push({
      companyId: this.CompanyId,
      searchId: this.ordId,
      UserID: this.users[0].id,
      orderType: this.orderType,
      orderStatus: this.orderStatus,
      NumRecords: this.numRecordsStr,
      dispatchStatus: this.dispatchStatus,
    })
    // this.Auth.getorder(this.Ordprd).subscribe(data => {
    //   this.ordDetails = data;
    //   if (this.billStatus == 3) {

    //   }
    // })
  }
  recStatus(Value) {
    console.log('recStatus', Value)
    this.billStatus = Value
    this.getOrderList()
  }
  rec(id) {
    this.isShown = !this.isShown
    this.isDisp = !this.isDisp
    this.getDispatchList(id)
  }

  getStockContainer() {
    this.Auth.getStockContainer(this.CompanyId, this.StoreId).subscribe(data => {
      console.log('Stocks', data)
      this.Stocks = data
    })
  }

  recUpd(Id) {
    this.recUpdId = Id
    this.router.navigate(['/apps/editreceive', Id])
  }
  radio(value1) {
    console.log('value', value1)
    this.dispatchType = value1
    this.getOrderList()
  }
  getOrderList() {
    console.log('dispatchType', this.dispatchType)
    console.log('dispatchType', this.billStatus)
    this.Ordprd.push({
      companyId: this.CompanyId,
      orderId: this.ordId,
      UserId: this.users[0].id,
      dispatchType: this.dispatchType,
      billStatus: this.billStatus,
      NumRecords: this.numRecordsStr,
    })
  }

  getDispatchList(bill) {
    this.bill = bill
    this.displayprd.push({
      companyId: this.CompanyId,
      billId: this.bill,
    })
    // console.log("data",this.displayprd)
    this.Auth.getDispatchList(this.displayprd).subscribe(data => {
      console.log('dispLiffffffdddst', data)
      this.dispList = data
      this.dispList.orderProductDetList.forEach(element => {
        element.receiveProduct = this.dispList.receiveProductList.filter(
          x => x.receiveProductId == element.actualProdId,
        )[0].receiveProduct
        element.receiveStorageId = this.dispList.storageStrList.filter(
          x => x.orderProductId == element.orderItemId,
        )[0].storeId
        // element.OrderId = this.dispList.bill.filter(x => x.billId == element.billId)[0].billId
        element.OrdId = this.dispList.bill.orderId
      })

      this.dispList.ordItem.forEach(element => {
        element.Action = 'Chk'
        element.updated = false
        element['Action'] = 'Chk'
        element['updated'] = false
        element['ordItemType'] = 3
        this.array.push({
          CompanyId: element['companyId'],
          OrderItemType: element['ordItemType'],
          ContainerId: element['containerId'],
          ContainerWeight: element['containerWeight'],
          OpenQty: element['quantity'],
          GrossQty: element['quantity'],
          DispatchQty: element['quantity'],
          OrderQuantity: element['quantity'],
          Quantity: element['quantity'],
          DispatchProductId: element['productId'],
          ProductId: element['productId'],
          Dispatchprd: element['receiveProduct'],
          ProductName: element['receiveProduct'],
          Price: element['unitPrice'],
          Tax1: element['tax1'],
          Tax2: element['tax2'],
          Tax3: element['tax2'],
          Amount: element['amount'],
          Action: element['Action'],
          OrderItemId: element['orderItemId'],
          OrderItemDetailId: element['id'],
          // StorageStoreId: element["receiveStorageId"],
          Updated: element['updated'],
          OrderItemRefId: element['orderItemRefId'],
          RefId: element['refId'],
          OrdItemDetailId: element['orderItemDetailId'],
        })
      })
      this.SuppliedById = this.dispList.bill.providerId
      this.OrderedById = this.dispList.bill.receiverId
      this.billId = this.dispList.bill.billId
      this.billAmountNoTax = this.dispList.bill.billAmountNoTax
      this.billAmount = this.dispList.bill.billAmount
      this.taxAmount = this.dispList.bill.taxAmount
      this.Idorder = this.dispList.bill.orderId
      console.log('SuppliedById', this.SuppliedById)
      console.log('OrderedById', this.OrderedById)
    })
    // console.log("SuppliedById", this.SuppliedById)
    // console.log("OrderedById", this.OrderedById)
    console.log('array2', this.array)
  }

  loginfo

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    const store = JSON.parse(localStorage.getItem('store'))
    this.CompanyId = user.companyId
    this.StoreId = user.storeid
    this.order = new OrderModule(2, this.OrdId)
    this.products = []

    this.getStockContainer()
    this.getdispatch()

    // this.Auth.getdbdata(['loginfo']).subscribe(data => {
    //   this.loginfo = data['loginfo'][0]
    //   this.StoreId = this.loginfo.storeId
    //   this.CompanyId = this.loginfo.companyId
    //   console.log(this.loginfo)
    //   this.order = new OrderModule(2, this.OrdId)
    //   this.products = [];

    //   this.getStockContainer();
    //   this.getdispatch()
    // })
  }
  supplier: any
  receiver: any
  tabledata: []
  getdispatch() {
    this.Auth.getOrdDisp(this.StoreId, this.CompanyId).subscribe(data => {
      this.OrdDispData = data['order']
      this.tabledata = this.OrdDispData
      console.log(this.OrdDispData)
      this.StoreByidInternal(0)
    })
  }

  StoreByidInternal(storeId) {
    this.Auth.getstoreIdInternal(this.CompanyId, storeId).subscribe(data => {
      const stores = data['storeList']
      console.log(stores)
      this.OrdDispData.forEach(order => {
        order.supplier = stores.filter(x => x.id == order.suppliedById)[0]?.name
        order.receiver = stores.filter(x => x.id == order.orderedById)[0]?.name
      })
      console.log(this.OrdDispData)
    })
  }

  getStoreList() {
    this.Auth.getstores(this.CompanyId).subscribe(data => {
      this.stores = data
      console.log(this.stores)
    })
  }

  receive() {
    console.log('array', this.array)
    console.log('supplier', this.SuppliedById)
    var finalarray = [...this.array, ...this.order.Items]
    this.RecData = new ReceiveModule(
      this.Idorder,
      this.billId,
      this.OrderedById,
      this.SuppliedById,
      this.receiveById,
      this.dispatchTypeId,
      finalarray,
      this.orderDate,
      this.users,
      this.createby,
      this.billAmountNoTax,
      this.billAmount,
      this.taxAmount,
      this.order.OrderDetail,
    )
    console.log('finalarray', finalarray)
    console.log('receive', this.RecData)
    console.log('finalarray', finalarray)

    this.Auth.Ordrecve(this.RecData).subscribe(data => {
      console.log('temporry', data)
    })
    this.router.navigate(['/apps/internaltransfer'])
  }

  orders: any = null

  parseOrder(json_string, modalRef) {
    this.orders = JSON.parse(json_string)
    console.log(this.orders)
    this.openDetailpopup(modalRef)
  }

  openDetailpopup(contentdetail) {
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

  OredId: number = 0
  OrderDetail: any = null
  getorderid(OredId, modalRef) {
    this.Auth.getreceivebyid(OredId).subscribe(data => {
      this.popupData = data
      this.popupData.receipts.forEach(rec => {
        rec.itemDetails = JSON.parse(rec.orderJson)
        console.log(JSON.parse(rec.orderJson))
      })
      this.OrderDetail = this.popupData.receipts[0]
      console.log(this.popupData)
      this.openDetailpopup(modalRef)
    })
  }
}
