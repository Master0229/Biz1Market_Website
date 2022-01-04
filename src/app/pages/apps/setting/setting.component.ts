import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { AuthService } from 'src/app/auth.service';
// import { NzNotificationService } from 'ng-zorro-antd'
const data: any = require('./data.json')

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  activeIndex = 0
  loadspin: boolean = false;
  dialogs = data;
  name = this.dialogs[this.activeIndex].name
  position = this.dialogs[this.activeIndex].position
  dialog = this.dialogs[this.activeIndex].dialog
  avatar = this.dialogs[this.activeIndex].avatar
  dialogid = 1;
  activeKey = 0;
  printers = [];
  isloading: boolean = false;
  printersettings: any;
  count = 0;
  total_devices = 0;
  checked_devices = 0;
  available_servers = [];
  create_server = 0;
  system_type = 0;
  clients = [];
  action;
  radioValue = 'A'
  isconnectedtoserver: boolean = false;
  device_type: string = '';
  datasavetype = "1";
  constructor(public electronService: ElectronService, private auth: AuthService,) {
    this.count = 1;
    this.device_type = localStorage.getItem('device_type');
    console.log(this.device_type)
    this.datasavetype = localStorage.getItem("datasavetype");
  }


  ngOnInit(): void {
    if (this.electronService.isElectronApp && this.device_type == "server") {
      console.log(this.device_type)
      var server = this.electronService.remote.getGlobal("database")();
      server.on('appstarted', (data) => {
        console.log(data);
        this.server = data;
        localStorage.setItem('serverip', this.server.address)
        localStorage.setItem("device_type", "server")
        this.device_type = "server";
        this.getclients();
        this.system_type = 2;
      })
      server.emit('getserverip')
    }
    var serverip = localStorage.getItem("serverip");
    if (serverip && this.device_type == "client") {
      this.checkifserver(serverip);
    }
    if (this.electronService.isElectronApp) {
      console.log(this.electronService.remote.getGlobal("GetPrinters")())
      this.printers = this.electronService.remote.getGlobal("GetPrinters")();
    } else {
      this.printers = [
        { name: "hp printer" },
        { name: "epson printer" }
      ]
    }

  }

  changeDialog(index) {
    this.activeIndex = index
    this.name = this.dialogs[index].name
    this.position = this.dialogs[index].position
    this.dialogid = index + 1
  }

  getPrintersettings() {
    this.printersettings = JSON.parse(localStorage.getItem("printersettings"));
    console.log(this.printersettings);
  }

  print(printer) {
    this.electronService.remote.getGlobal("Print")('this is a test printer', printer);
  }

  changeKey(key) {
    this.activeKey = key
  }

  scan() {
    this.isloading = true;
    if (this.electronService.isElectronApp) {
      var scanner = this.electronService.remote.getGlobal("scanlan")();
      console.log(scanner)
      scanner.then(devices => {
        console.log(devices)
        this.total_devices = devices.length;
        this.checked_devices = 0;
        this.available_servers = [];
        this.findserver(devices);
      })
    }
  }

  checkifserver(ip) {
    this.auth.checkifserver(ip).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error)
    }, () => {
      this.available_servers.push({ ip: ip })
      this.joinserver(ip)
    })
  }

  findserver(devices) {
    devices.forEach(device => {
      this.auth.checkifserver(device.ip).subscribe(data => {
        console.log(data);
        this.checked_devices++
      }, error => {
        console.log(error)
        this.checked_devices++
      }, () => {
        console.log(device.ip)
        this.available_servers.push(device)
      })
    });
  }
  server;
  startserver() {
    this.loadspin = true;
    var server = this.electronService.remote.getGlobal("database")();
    server.on('appstarted', (data) => {
      console.log(data);
      this.server = data;
      localStorage.setItem('serverip', this.server.address)
      localStorage.setItem("device_type", "server")
      this.device_type = "server";
      this.getclients();
    })
    server.on('new_client', (data) => {
      console.log(data);
      this.getclients();
    })
    this.electronService.remote.getGlobal("startserver")();
  }
  getclients() {
    this.auth.getclientlist(this.server.address).subscribe(data => {
      console.log(data);
      this.clients = data['clients'];
    })
  }
  joinserver(ip) {
    this.auth.joinserver(ip).subscribe(data => {
      console.log(data);
      localStorage.setItem("serverip", ip)
      localStorage.setItem("device_type", "client")
      this.device_type = "client";
      this.isconnectedtoserver = true;
      this.available_servers.filter(x => x.ip == ip)[0].connected = true;
    })
  }
  removeclient(id) {
    this.electronService.remote.getGlobal("removeclient")(id);
    this.getclients();
  }
  stopserver(msg) {
    this.electronService.remote.getGlobal("stopserver")();
    // this.getclients();
  }

  syncstorage() {

    localStorage.setItem("datasavetype", this.datasavetype)
    console.log(this.datasavetype)
  }
}
