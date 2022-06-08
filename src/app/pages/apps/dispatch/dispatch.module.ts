import { ɵSafeHtml } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'
import moment from 'moment'
export class OrderModule {
  Id: number
  Updated: boolean = false
  OrderNo: number
  AggregatorOrderId: string
  UPOrderId: string
  StoreId: number
  OrderStatusId: number
  PreviousStatusId: number
  BillAmount: number
  RefundAmount: number
  Source: string
  Tax1: number
  Tax2: number
  Tax3: number
  BillStatusId: number
  DiscPercent: number
  IsAdvanceOrder: boolean = false
  OrderedDateTime: string
  OrderedDate: string
  DeliveryDateTime: string
  BillDateTime: string
  BillDate: string
  Note: string
  OrderStatusDetails: OrderstatusDetails
  RiderStatusDetails: string
  FoodReady: boolean = false
  Closed: boolean = false
  OrderJson: string
  ItemJson: string
  ChargeJson: string
  ModifiedDate: string
  CompanyId: number
  OrderType: number
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
  Items: Array<OrderItemModule>
  OrderDetail: Array<OrderItemDetailModule>
  bill: Array<BillModule>
  dispatch: Array<DispatchModule>

  Subtotal: number
  TaxAmount: number
  BatchNum: number
  constructor(ordertype, Id) {
    this.Items = []
    this.OrderDetail = []
    this.bill = []
    this.Id = Id
    this.Updated = false
    this.OrderNo = 0
    this.AggregatorOrderId = ''
    this.UPOrderId = ''
    this.StoreId = 0
    this.OrderStatusId = 0
    this.PreviousStatusId = 0
    this.BillAmount = 0
    this.RefundAmount = 0
    this.Source = ''
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.BillStatusId = 0
    this.DiscPercent = 0
    this.IsAdvanceOrder = false
    this.OrderedDateTime = ''
    this.OrderedDate = ''
    this.DeliveryDateTime = ''
    this.BillDateTime = ''
    this.BillDate = ''
    this.OrderStatusDetails = new OrderstatusDetails()
    this.RiderStatusDetails = ''
    this.Closed = false
    this.OrderJson = ''
    this.ItemJson = ''
    this.ChargeJson = ''
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
    // this.DifferentPercent = 0;
  }
  addproduct(product, OrdId, storeId) {
    this.Items.push(new OrderItemModule(product, OrdId, storeId))
    this.OrderDetail.push(new OrderItemDetailModule(product, storeId))
    this.setbillamount()
  }
  add(prd) {
    this.setbillamount()
  }
  setbillamount() {
    this.BillAmount = 0
    this.Subtotal = 0
    this.TaxAmount = 0
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.Items.forEach(item => {
      item.Amount = item.Price * item.OrderQuantity
      if (item.IsInclusive) {
        item.Amount = item.Amount - (item.Amount * (item.Tax1 + item.Tax2 + item.Tax3)) / 100
      }
      item.TaxAmount1 = (item.Tax1 * item.Amount) / 100
      item.TaxAmount2 = (item.Tax2 * item.Amount) / 100
      item.TaxAmount3 = (item.Tax3 * item.Amount) / 100
      item.TaxAmount = item.TaxAmount1 + item.TaxAmount2 + item.TaxAmount3
      item.DispatchProductId = item.ProductId
      item.Dispatchprd = item.ProductName
      this.Subtotal += item.Amount
      this.Tax1 += item.TaxAmount1
      this.Tax2 += item.TaxAmount2
      this.Tax3 += item.TaxAmount3
      this.TaxAmount += item.TaxAmount
    })
    this.BillAmount = this.Subtotal + this.Tax1 + this.Tax2 + this.Tax3
    this.BillAmount = +this.BillAmount.toFixed(2)
  }
}

export class OrderItemModule {
  Id: number
  stockBatchId: number
  ProductName: string
  Updated: boolean = false
  DiscPercent: number
  DispatchQty: number
  StatusId: number
  Message: string
  Amount: number
  OptionJson: string
  OrderItemId: number
  OrderId: number
  ProductId: number
  OrderQuantity: number
  GrossQty: number
  DispatchedQuantity: number
  // ReceivedQuantity: number;
  // ReturnedQuantity: number;
  CancelledQuantity: number
  // ReceiveLaterQuantity: number;
  // DispatchLaterQuantity: number;
  Price: number
  TaxAmount: number
  Tax1: number
  Tax2: number
  Tax3: number
  CreatedDate: string
  DispatchProductId: number
  Dispatchprd: string
  Unit: string
  OpenQty: number
  // CreatedBy: number;
  // BillId: number;
  // PendingQty: number;
  // CurrentStock: number;
  // AutoOrderId: number;
  // OrderLevel: number;
  // StockUpdateId: number;
  OldStock: number
  CompanyId: number
  VarianceReasonStr: string
  VarianceReasonDesc: string
  BarcodeId: number
  TaxAmount1: number
  TaxAmount2: number
  TaxAmount3: number
  IsInclusive: boolean
  Action: string
  BatchNum: number
  ContainerCount: number
  ContainerId: number
  ContainerName: string
  StorageStoreId: number
  ordId: number
  RefId: string
  OrderedDateTime: string
  OrderedDate: string
  BillDateTime: string
  BillDate: string
  OrdItemType: number
  ActualProdId: number
  Quantity: number
  OrderItemRefId: string
  UnitPrice: number
  constructor(product, OrdId, storeId) {
    console.log('product', product, OrdId)
    this.Id = 0
    this.Updated = false
    this.stockBatchId = +product.stockBatchId
    this.DiscPercent = 0
    this.StatusId = 0
    this.Updated = false
    this.Message = ''
    this.Amount = 0
    this.OptionJson = ''
    this.OrderItemId = 0
    this.OrderId = OrdId
    this.ordId = OrdId
    this.DispatchedQuantity = 0
    // this.ReceivedQuantity = 0;
    // this.ReturnedQuantity = 0;
    this.CancelledQuantity = product.orderQuantity - product.DispatchQty
    // this.ReceiveLaterQuantity = 0;
    // this.DispatchLaterQuantity = 0;
    this.TaxAmount = 0
    this.Amount = 0
    // this.CreatedDate = '';
    // this.CreatedBy = 0;
    // this.BillId = 0;
    // this.PendingQty = 0;
    // this.CurrentStock = 0;
    // this.AutoOrderId = 0;
    // this.OrderLevel = 0;
    // this.StockUpdateId = 0;
    this.OldStock = 0
    this.CompanyId = 0
    this.Unit = product.unit
    this.BarcodeId = product.barcodeId
    this.ProductName = product.product
    this.ProductId = product.productId
    this.Dispatchprd = product.product
    this.DispatchProductId = product.productId
    this.OrderQuantity = product.DispatchQty
    this.DispatchQty = product.quantity
    this.GrossQty = product.DispatchQty
    this.OpenQty = product.DispatchQty
    this.Price = product.price
    this.Tax1 = product.tax1
    this.Tax2 = product.tax2
    this.Tax3 = product.tax3
    this.IsInclusive = product.isInclusive
    this.Action = 'Add'
    this.BatchNum = product.BatchNum
    this.ContainerCount = product.ContainerCount
    this.ContainerId = product.ContainerId
    this.ContainerName = product.ContainerName
    this.StorageStoreId = storeId
    this.RefId = product.productId + moment().format('YYYY-MM-DD HH:MM A')
    this.OrderedDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.OrderedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.BillDate = moment().format('YYYY-MM-DD HH:MM A')
    this.BillDateTime = moment().format('YYYY-MM-DD HH:MM A')
    this.OrdItemType = 2
    this.ActualProdId = product.productId
    this.OrderItemRefId = product.productId + moment().format('YYYY-MM-DD HH:MM A')
    this.Quantity = product.DispatchQty
    this.UnitPrice = product.price
  }
}
export class OrderItemDetailModule {
  OrderItemDetailId: number
  Id: number
  ActualProdId: number
  BatchId: number
  OrdItemType: number
  StorageStoreId: number
  ContatinerId: number
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
  Action: string
  DiscAmount: number
  DiscPercent: number
  DiscPerQty: number
  CompanyId: number
  OrderItemRefId: string
  constructor(product, storeId) {
    console.log('prodDetail', product)
    this.OrderItemDetailId = 0
    this.Id = 0
    this.ActualProdId = 0
    this.BatchId = 0
    this.Action = 'Add'
    this.OrdItemType = 2
    this.StorageStoreId = storeId
    this.Quantity = product.DispatchQty
    this.UnitPrice = product.price
    this.Tax1 = product.tax1
    this.Tax2 = product.tax2
    this.Amount = 0
    this.TaxAmount = 0
    this.Date = ''
    this.DateTime = ''
    this.RelatedOrderId = ''
    this.CreatedDate = ''
    this.BatchId = 0
    this.DiscAmount = 0
    this.DiscPercent = 0
    this.DiscPerQty = 0
    this.ActualProdId = product.productId
    this.CompanyId = 0
    this.OrderItemRefId = product.productId + moment().format('YYYY-MM-DD HH:MM A')
  }
}

export class DispatchModule {
  OrderedById: number
  SuppliedById: number
  DispatchById: number
  ReceiverId: number
  Bill: BillModule
  ProviderId: number
  OrderId: number
  dispatchType: number
  Items: []
  DispatchedDate: string
  googlemapurl: string
  companyId: number
  userId: number
  CreatedBy: number
  ItemDetail: []
  orderJson: []
  billId: number
  Id: number
  ordItemId: number
  DispatchStatus: number
  constructor(
    OrdId,
    OrderedById,
    SuppliedById,
    DispatchById,
    dispatchTypeId,
    finalarray,
    DispatchedDate,
    userId,
    createby,
    OrdDetail,
    ordItemId,
    CompanyId,
    billId,
  ) {
    console.log('UserId', userId)
    this.OrderedById = OrderedById
    this.ReceiverId = OrderedById
    this.SuppliedById = SuppliedById
    this.ProviderId = SuppliedById
    this.DispatchById = DispatchById
    this.OrderId = OrdId
    this.dispatchType = dispatchTypeId
    this.Items = finalarray
    this.DispatchedDate = DispatchedDate
    this.companyId = CompanyId
    this.userId = userId[0].id
    this.CreatedBy = createby
    this.ItemDetail = OrdDetail
    this.orderJson = OrdDetail
    this.Id = OrdId
    this.ordItemId = ordItemId
    this.billId = billId
    this.Bill = new BillModule()
    this.DispatchStatus = 1
  }
}

export class OrderstatusDetails {
  previousstatusid: number
  orderstatusid: number
  constructor() {
    this.previousstatusid = 1
    this.orderstatusid = 2
  }
}

export class BillModule {
  BillId: number
  InVoiceNum: string
  BillType: number
  DispathchType: number
  BillAmount: number
  BillAmountNoTax: number
  TaxAmount: number
  PaidAmount: number
  Quantity: number
  ProviderId: number
  ReceiverId: number
  DispatchById: number
  ReceivedById: number
  CreatedDate: string
  CreatedBy: number
  BillDate: string
  DispatchedDate: string
  // ReceivedDate: string
  // ReceiveStatus: number
  // DispatchLater: boolean
  // ReceiveLater: boolean
  // IsReturn: boolean
  DiscPercent: number
  DiscAmount: number
  TotalDiscount: number
  IsPaid: boolean
  CreditTypeStr: string
  TotalAmount: number
  CompanyId: number
  OrderId: number
  // ShowallProd: boolean
  ResponsibleById: number
  constructor() {
    this.BillId = 0
    this.InVoiceNum = ''
    this.BillAmountNoTax = 0
    this.BillType = 0
    this.DispathchType = 0
    this.BillAmount = 0
    this.TaxAmount = 0
    this.PaidAmount = 0
    this.Quantity = 0
    this.ProviderId = 0
    this.ReceiverId = 0
    this.DispatchById = null
    this.ReceivedById = 0
    this.BillDate = moment().format('YYYY-MM-DD HH:MM A')
    this.CreatedDate = moment().format('YYYY-MM-DD HH:MM A')
    this.CreatedBy = 0
    this.DispatchedDate = moment().format('YYYY-MM-DD HH:MM A')
    // this.ReceivedDate = moment().format('YYYY-MM-DD HH:MM A');
    // this.ReceiveStatus = 0
    // this.DispatchLater = false
    // this.ReceiveLater = false
    // this.IsReturn = false
    this.DiscPercent = 0
    this.DiscAmount = 0
    this.TotalDiscount = 0
    this.IsPaid = false
    this.CreditTypeStr = ''
    this.TotalAmount = 0
    this.CompanyId = 0
    this.OrderId = 0
    // this.ShowallProd = false
    this.ResponsibleById = 0
  }
}
