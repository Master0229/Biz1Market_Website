import { ɵSafeHtml } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'
import moment from 'moment'
import { getUser } from 'src/app/store/user/reducers'
export class OrderModule {
  Quantity: number
  Id: number
  Updated: boolean = false
  OrderNo: number
  InvoiceNo: string
  SourceId: number
  AggregatorOrderId: string
  UPOrderId: string
  StoreId: number
  changeditems: Array<string>
  createdtimestamp: number
  additionalchargearray: Array<AdditionalCharge> = []
  OrderTypeId: number
  isordersaved: boolean
  OrderStatusId: number
  PreviousStatusId: number
  BillAmount: number
  PaidAmount: number
  RefundAmount: number
  OrderId: number
  Source: string
  Tax1: number
  Tax2: number
  Tax3: number
  BillStatusId: number
  SplitTableId: number
  DiscPercent: number
  DiscAmount: number
  IsAdvanceOrder: boolean = false
  CustomerData: string
  events: Array<any>
  Transactions: Array<Transaction>
  UserId: number
  // DiningTableId: number;
  // WaiterId: number;
  OrderedDateTime: string
  OrderedDate: string
  DeliveryDateTime: string
  BillDateTime: string
  BillDate: string
  Note: string
  OrderStatusDetails: string
  RiderStatusDetails: string
  FoodReady: boolean = false
  Closed: boolean = false
  OrderJson: string
  StorePaymentTypeId: number
  ItemJson: string
  ChargeJson: string
  Charges: number
  OrderDiscount: number
  OrderTaxDisc: number
  OrderTotDisc: number
  AllItemDisc: number
  AllItemTaxDisc: number
  AllItemTotalDisc: number
  ModifiedDate: string
  // UserId: number;
  CompanyId: number
  OrderType: number
  // AutoOrderId: number;
  CreatedDate: string
  SuppliedById: number
  OrderedById: number
  OrderStatus: number
  DispatchStatus: number
  ReceiveStatus: number
  CancelStatus: number
  SpecialOrder: boolean = false
  WipStatus: string
  ProdStatus: string
  DifferentPercent: number
  Items: Array<OrderItemModule>
  Subtotal: number
  TaxAmount: number
  CustomerId: number
  CustomerDetails: CustomerModule
  constructor(ordertype) {
    this.Items = []
    this.Updated = false
    this.OrderNo = 0
    this.InvoiceNo = ''
    this.SourceId = 0
    this.Transactions = []
    this.AggregatorOrderId = ''
    this.UPOrderId = ''
    this.StoreId = 0
    this.changeditems = []
    this.StorePaymentTypeId = 0
    // this.CustomerId = 0;
    // this.CustomerAddressId = 0;
    this.OrderId = 0
    this.OrderStatusId = 0
    this.PreviousStatusId = 0
    this.BillAmount = 0
    this.PaidAmount = 0
    this.RefundAmount = 0
    this.Source = ''
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.BillStatusId = 0
    this.SplitTableId = 0
    this.DiscPercent = 0
    this.DiscAmount = 0
    this.IsAdvanceOrder = false
    this.CustomerData = ''
    this.isordersaved = false
    // this.DiningTableId = 0;
    // this.WaiterId = 0;
    this.OrderedDateTime = ''
    this.OrderedDate = ''
    this.DeliveryDateTime = ''
    this.BillDateTime = ''
    this.BillDate = ''
    this.Note = ''
    this.OrderStatusDetails = ''
    this.RiderStatusDetails = ''
    this.Closed = false
    // this.OrderJson = '';
    this.ItemJson = ''
    this.ChargeJson = ''
    this.Charges = 0
    this.OrderDiscount = 0
    this.OrderTaxDisc = 0
    this.OrderTotDisc = 0
    this.AllItemDisc = 0
    this.AllItemTaxDisc = 0
    this.AllItemTotalDisc = 0
    this.ModifiedDate = ''
    this.CompanyId = 0
    this.OrderType = ordertype
    this.CreatedDate = ''
    this.SuppliedById = 0
    this.OrderedById = 0
    this.OrderStatus = 0
    this.DispatchStatus = 0
    this.ReceiveStatus = 0
    this.CancelStatus = 0
    this.SpecialOrder = false
    this.WipStatus = ''
    this.ProdStatus = ''
    this.DifferentPercent = 0
    this.CustomerId = 0
    this.CustomerDetails = new CustomerModule()
    this.UserId = this.UserId
  }

  addproduct(product) {
    this.Items.push(new OrderItemModule(product))
    this.setbillamount()
  }
  setbillamount() {
    if (!this.isordersaved) this.PaidAmount = 0
    var extracharge = 0
    this.BillAmount = 0
    this.DiscAmount = 0
    this.Subtotal = 0
    this.TaxAmount = 0
    this.StorePaymentTypeId = 0
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.Items.forEach(item => {
      console.log(item)
      item.TotalAmount = item.Price * item.OrderQuantity
      if (item.IsInclusive) {
        item.TotalAmount =
          item.TotalAmount - (item.TotalAmount * (item.Tax1 + item.Tax2 + item.Tax3)) / 100
      }
      item.TaxAmount1 = (item.Tax1 * item.TotalAmount) / 100
      item.TaxAmount2 = (item.Tax2 * item.TotalAmount) / 100
      item.TaxAmount3 = (item.Tax3 * item.TotalAmount) / 100
      item.TaxAmount = item.TaxAmount1 + item.TaxAmount2 + item.TaxAmount3
      console.log(item.DiscPercent, item.DiscAmount)
      if (item.DiscPercent > 0) item.DiscAmount = (item.TotalAmount * item.DiscPercent) / 100
      console.log(item.DiscPercent, item.DiscAmount)
      this.Subtotal += item.TotalAmount
      this.Tax1 += item.TaxAmount1
      this.Tax2 += item.TaxAmount2
      this.Tax3 += item.TaxAmount3
      this.TaxAmount += item.TaxAmount
      this.DiscAmount += item.DiscAmount
    })

    this.BillAmount = this.Subtotal + this.Tax1 + this.Tax2 + this.Tax3 - this.DiscAmount
    this.BillAmount = +this.BillAmount.toFixed(2)

    this.additionalchargearray.forEach(charge => {
      // console.log(charge.Description, charge.selected)
      if (charge.selected) {
        if (charge.ChargeType == 2) {
          charge.Amount = Number((this.BillAmount / 100) * charge.ChargeValue)
        } else {
          charge.Amount = Number(charge.ChargeValue)
        }
        extracharge += charge.Amount
        this.Charges += charge.Amount
      }
    })
  }
}

export class Transaction {
  // Id: number
  Amount: number
  OrderId: number
  CustomerId: number
  PaymentTypeId: number
  StorePaymentTypeId: number
  TranstypeId: number
  PaymentStatusId: number
  TransDateTime: string
  TransDate: string
  UserId: number
  CompanyId: number
  StoreId: number
  Notes: string
  Remaining: number
  InvoiceNo: string
  StorePaymentTypeName: string
  saved: boolean = false
  constructor(amount = 0, spt = 0) {
    this.Amount = amount
    this.OrderId = 0
    this.PaymentTypeId = 6
    this.StorePaymentTypeId = spt
    this.Notes = ''
    this.InvoiceNo = ''
    this.CompanyId = 0
    this.StoreId = 0
    this.StorePaymentTypeName = ''
    this.CustomerId = 0
    this.InvoiceNo = ''
    this.PaymentStatusId = 0
    this.TranstypeId = 0
  }
}

export class OrderItemModule {
  Id: number
  ProductName: string
  Updated: boolean = false
  DiscPercent: number
  DiscAmount: number
  ItemDiscount: number
  TaxItemDiscount: number
  OrderDiscount: number
  TaxOrderDiscount: number
  StatusId: number
  Note: string
  Message: string
  TotalAmount: number
  Extra: number
  // CategoryId: number;
  OptionJson: string
  ComplementryQty: number
  OrderItemId: number
  OrderId: number
  ProductId: number
  OrderQuantity: number
  DispatchedQuantity: number
  ReceivedQuantity: number
  ReturnedQuantity: number
  CancelledQuantity: number
  ReceiveLaterQuantity: number
  DispatchLaterQuantity: number
  Price: number
  TaxAmount: number
  Tax1: number
  Tax2: number
  Tax3: number
  Tax4: number
  Amount: number
  CreatedDate: string
  // CreatedBy: number;
  BillId: number
  PendingQty: number
  CurrentStock: number
  // AutoOrderId: number;
  OrderLevel: number
  // StockUpdateId: number;
  OldStock: number
  CompanyId: number = 1
  VarianceReasonStr: string
  VarianceReasonDesc: string
  BarcodeId: number
  TaxAmount1: number
  TaxAmount2: number
  TaxAmount3: number
  IsInclusive: boolean
  stockBatchId: number
  _id: string
  Quantity: number
  constructor(product) {
    console.log(product)
    this.Id = 0
    this._id = product._id
    this.Updated = false
    this.DiscPercent = product.DiscPercent
    this.ItemDiscount = 0
    this.TaxItemDiscount = 0
    this.OrderDiscount = 0
    this.TaxOrderDiscount = 0
    this.StatusId = 0
    this.Note = ''
    this.Message = ''
    this.TotalAmount = 0
    this.Extra = 0
    // this.CategoryId = 0;
    this.OptionJson = ''
    this.ComplementryQty = 0
    this.OrderItemId = 0
    this.OrderId = 0
    this.DispatchedQuantity = 0
    this.ReceivedQuantity = 0
    this.ReturnedQuantity = 0
    this.CancelledQuantity = 0
    this.ReceiveLaterQuantity = 0
    this.DispatchLaterQuantity = 0
    this.TaxAmount = 0
    this.Amount = 0
    this.CreatedDate = ''
    // this.CreatedBy = 0;
    this.BillId = 0
    this.PendingQty = 0
    this.CurrentStock = 0
    // this.AutoOrderId = 0;
    this.OrderLevel = 0
    // this.StockUpdateId = 0;
    this.OldStock = 0
    this.CompanyId = 1
    this.VarianceReasonStr = '1'
    this.VarianceReasonDesc = ''
    this.BarcodeId = product.barcodeId
    this.DiscAmount = product.DiscAmount
    this.ProductName = product.product
    this.ProductId = product.productId
    this.OrderQuantity = product.Quantity
    this.Price = +product.price
    this.Tax1 = +product.tax1
    this.Tax2 = +product.tax2
    this.Tax3 = +product.tax3
    this.stockBatchId = +product.stockBatchId
    this.Tax4 = 0
    this.IsInclusive = product.isInclusive == 'true' || product.isInclusive == true
  }
}
export class OrderItemDetailModule {
  OrderItemDetailId: number
  Id: number
  ActualProdId: number
  BatchId: number
  BillId: number
  OrdProdType: number
  StorageStoreId: number
  ContatinerId: number
  ContainerCount: number
  Quantity: number
  UnitPrice: number
  Tax1: number
  Tax2: number
  Amount: number
  TaxAmount: number
  Date: string
  DateTime: string
  RelatedOrderId: string
  CreatedDate: string
  CreatedBy: number
  DiscAmount: number
  DiscPercent: number
  DiscPerQty: number
  AutoOrderId: number
  CompanyId: number
  VarianceReasonStr: string
  VarianceReasonDesc: string
  constructor(product, options, showname) {
    this.OrderItemDetailId = 0
    this.Id = 0
    this.ActualProdId = 0
    this.BatchId = 0
    this.BillId = 0
    this.OrdProdType = 0
    this.StorageStoreId = 0
    this.ContatinerId = 0
    this.ContainerCount = 0
    this.Quantity = 0
    this.UnitPrice = 0
    this.Tax1 = 0
    this.Tax2 = 0
    this.Amount = 0
    this.TaxAmount = 0
    this.Date = ''
    this.DateTime = ''
    this.RelatedOrderId = ''
    this.CreatedDate = ''
    this.CreatedBy = 0
    this.DiscAmount = 0
    this.DiscPercent = 0
    this.DiscPerQty = 0
    this.AutoOrderId = 0
    this.CompanyId = 1
    this.VarianceReasonStr = ''
    this.VarianceReasonDesc = ''
  }
}
export class CustomerModule {
  Id: number
  Name: string
  Email: string
  PhoneNo: string
  Address: string
  City: string
  PostalCode: number
  CompanyId: number
  StoreId: number
  val: number
  datastatus: string
  constructor() {
    this.Id = null
    this.Name = ''
    this.Email = ''
    this.PhoneNo = ''
    this.Address = ''
    this.City = ''
    this.PostalCode = null
    this.CompanyId = 0
    this.StoreId = 0
  }
}

export class AdditionalCharge {
  Id: number
  Amount: number
  ChargeType: number
  ChargeValue: number
  Description: string
  TaxGroupId: number
  selected: boolean
  constructor(charge) {
    this.Id = charge.Id
    this.Amount = 0
    this.ChargeType = charge.ChargeType
    this.ChargeValue = charge.ChargeValue
    this.Description = charge.Description
    this.TaxGroupId = charge.TaxGroupId
    this.selected = charge.selected
  }
}
