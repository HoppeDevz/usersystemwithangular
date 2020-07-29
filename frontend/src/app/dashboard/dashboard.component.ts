import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private RouteParams : ActivatedRoute
  ) { }

  usernameFocus( element: HTMLElement ) : void {
    console.log("focused")
    element.setAttribute("class", "input-focus");
    element.focus();
  }

  ngOnInit(): void {
    // axios post get name by username

    this.RouteParams.params.subscribe( params => {
       console.log(params['username'])
    })
  }

}
