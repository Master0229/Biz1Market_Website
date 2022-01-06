import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-taxgroup',
  templateUrl: './taxgroup.component.html',
  styleUrls: ['./taxgroup.component.scss'],
})
export class TaxgroupComponent implements OnInit {
  constructor(private Auth: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.gettaxgrp()
  }
  tabledata: []
  TaxGrpList: any
  term: string = ''
  gettaxgrp() {
    this.Auth.GetTaxGrp().subscribe(data => {
      this.TaxGrpList = data
      this.tabledata = this.TaxGrpList
      console.log(this.TaxGrpList)
    })
  }

  // Filter table Value Master
  filtersearch(): void {
    this.tabledata = this.term
      ? this.TaxGrpList.filter(x => x.description.toLowerCase().includes(this.term.toLowerCase()))
      : this.TaxGrpList
    console.log(this.tabledata)
  }

  //Master
  // Model For Add and Update Tax Grp
  addtaxgrp(addtaxgrpmodel) {
    this.modalService.open(addtaxgrpmodel)
  }
  viewtaxgrp(modelviewtax) {
    this.modalService.open(modelviewtax)
  }
}
