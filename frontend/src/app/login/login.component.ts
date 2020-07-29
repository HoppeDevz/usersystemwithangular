import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import api from '../services/api';
import Axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    document.onkeydown = function (t) {
      if(t.which == 9){
       return false;
      }
    }
  }

  alert = ""
  title = "Hoppe Angular";

  passwordFocus(element: HTMLElement) : void {
    element.setAttribute("class", "input-focus");
    element.focus();
  }

  usernameFocus(element : HTMLElement) : void {
    element.setAttribute("class", "input-focus");
    element.focus();
  }


  getVal(username : string, password : string) : void {
    console.log(username, password)

    if ( username.replace(/\s/g, '') == "" || password.replace(/\s/g, '') == "" ) {
      this.alert = "Campos Vazios";
      setTimeout(() => {
        this.alert = ""
      },7000)
      return
    }

    api.post("LoginUser", { username: username, password: password })
    .then(response => {
      if (response.data.loginAccount) {
        this.router.navigate(['/dashboard', { username }]);
      } else {
        this.alert = `<span class="alert-error">Credenciais Incorretas!</span>`
        setTimeout(() => {
          this.alert = ""
        },3000)
      }
    })
    .catch(err => {
      alert("Serviço indisponível, tente novamente mais tarde!")
    })
  }
}
