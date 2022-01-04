import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-taxgroup',
  templateUrl: './taxgroup.component.html',
  styleUrls: ['./taxgroup.component.scss'],
})
export class TaxgroupComponent implements OnInit {
  constructor(private Auth: AuthService) {}

  ngOnInit(): void {}
}
