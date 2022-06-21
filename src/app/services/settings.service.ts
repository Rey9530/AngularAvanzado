import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  linkTheme = document.querySelector('#theme');
 
  constructor() { 
    console.log('Service...')

  
    const url = localStorage.getItem('theme') || `./assets/css/colors/default-dark.css`;
    this.linkTheme?.setAttribute('href',url)
  }

  
  changeTheme(thema:string){
    const url = `./assets/css/colors/${ thema }.css`
    this.linkTheme?.setAttribute('href',url)
    localStorage.setItem('theme', url); 
    this.checkCurerenThyeme();
  }


  checkCurerenThyeme(){

    const links = document.querySelectorAll('.selector');
    links.forEach(element  => {
      
      element.classList.remove('working');
      const url = `./assets/css/colors/${ element.getAttribute('data-theme') }.css`;

      const currentThemeUrl = this.linkTheme?.getAttribute('href'); 
      if(currentThemeUrl===url){
        element.classList.add('working');
      }

      document.querySelector('#theme')
    }); 
  }
}
