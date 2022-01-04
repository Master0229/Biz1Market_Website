import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-taxgroup',
  templateUrl: './taxgroup.component.html',
  styleUrls: ['./taxgroup.component.scss']
})
export class TaxgroupComponent implements OnInit {
  loginfo: any;
  taxgroups: any = [];
  show = true;
  submitted :boolean = false;
  taxgroup: any = { id: 0, description: "", tax1: 0, tax2: 0, tax3: 0, companyId: 0, isInclusive: false }
  constructor(private Auth: AuthService) {

  } 

  ngOnInit(): void {
    this.Auth.getloginfo().subscribe(data => {
      this.loginfo = data
      this.gettax();
      this.taxgroup = { id: 0, description: "", tax1: 0, tax2: 0, tax3: 0, companyId: this.loginfo.companyId, isInclusive: false }
    })

  }
  gettax() {
    this.Auth.getTax_l(this.loginfo.companyId).subscribe(data => {
      this.taxgroups = data;
      console.log(this.taxgroups);
      this.show = true;
    });
  }
  addTax() {
    console.log(this.taxgroup)
    var obj = {}
    Object.keys(this.taxgroup).forEach(key => {
      obj[key.charAt(0).toUpperCase() + key.slice(1)] = this.taxgroup[key]
    });
    if(this.taxgroup.id == 0){
      this.Auth.addtaxgroup(obj).subscribe(data => {
        console.log(data)
        this.Auth.updatetaxgroupdb(data["taxgroup"]).subscribe(data => {
          this.taxgroup = { id: 0, description: "", tax1: 0, tax2: 0, tax3: 0, companyId: this.loginfo.companyId, isInclusive: "" }
        this.gettax();
         })
      })
    } else {
      this.Auth.updatetaxgroup(obj).subscribe(data1 => {
        this.Auth.updatetaxgroupdb(data1["taxgroup"]).subscribe(data => {
          this.taxgroup = { id: 0, description: "", tax1: 0, tax2: 0, tax3: 0, companyId: this.loginfo.companyId, isInclusive: "" }
        this.gettax();
         })
      })    
    }
 
  }
  editTaxgroup(taxgroup) {
    this.taxgroup = taxgroup
    this.show = !this.show;
  }
  back() {
    console.log("15415")
    this.show = !this.show;
    this.taxgroup = { id: 0, description: "", tax1: 0, tax2: 0, tax3: 0, companyId: this.loginfo.companyId, isInclusive: false }
  }


}
