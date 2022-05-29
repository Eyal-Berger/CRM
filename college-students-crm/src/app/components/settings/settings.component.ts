import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html', 
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements OnInit {

  settings: any = {
    deleteCustomerBtn: true
  };

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    } else {
      localStorage.setItem('settings', JSON.stringify(this.settings));
    }
  }

  onCheckDeleteBtn() {
    this.settings.deleteCustomerBtn = !this.settings.deleteCustomerBtn;
    localStorage.setItem('settings', JSON.stringify(this.settings));

  }

}
