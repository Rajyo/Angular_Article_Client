import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  token: string | null = localStorage.getItem("token") 


  logout() {
    localStorage.clear()
    window.location.href = "/login"
  }

}
