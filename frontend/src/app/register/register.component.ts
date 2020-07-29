import { Component, OnInit } from '@angular/core';
import api from '../services/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alert = "";
  alert_sucess = "";

  constructor() { }

  ngOnInit(): void {
  }

  registerHandler(username : string, password : string) : void {
    if ( username.replace(/\s/g, '') == "" || password.replace(/\s/g, '') == "") {
      this.alert = "Campos Vazios";
      setTimeout(() => {
        this.alert = "";
      },7000);
      return
    } 
      
    let exist_upperCaseLetter = false
    for ( var i = 0; i <= password.length; i++ ) {
      if (password[i]) {
        if ( password[i] == password[i].toUpperCase() ) {
          exist_upperCaseLetter = true
        }
      }
    }

    if (!exist_upperCaseLetter) {
      this.alert = "Sua senha precisa ter pelo menos uma letra maiúscula!";
      setTimeout(() => {
        this.alert = "";
      },7000)
      return
      //return alert("Sua senha precisa ter pelo menos uma letra maiúscula!");
    }
    

    console.log(username, password)
    api.post("RegisterUser", { username, password })
    .then(response => {
      if (response.data.createdAccount) {
        this.alert_sucess = "Conta criada com sucesso!";
        setTimeout(() => {
          this.alert_sucess = "";
        },7000)
        return
      } else {
        this.alert = `
          Não possível criar a sua conta =>
          ${response.data.reason}
        `;
        
        setTimeout(() => {
          this.alert = "";
        },7000)
      }
    })
  }

}
