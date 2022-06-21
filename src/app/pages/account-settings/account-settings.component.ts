import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [

    `
      #themecolors .selector{
        cursor:pointer;
      }
    `
  ]
})
export class AccountSettingsComponent implements OnInit {
  linkTheme = document.querySelector('#theme');
  public links!:NodeListOf<Element>;

  constructor( private settingSer: SettingsService ) { }

  ngOnInit(): void {
    
    this.links = document.querySelectorAll('.selector');
    this.settingSer.checkCurerenThyeme();
  }

  changeTheme(thema:string){ 
    this.settingSer.changeTheme(thema);
  }
 
}
