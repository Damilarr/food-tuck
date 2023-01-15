import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear:any = ''
  date:any = ''
  constructor() { }
  ngOnInit(): void {
    this.date = new Date()
    this.currentYear =  this.date.getFullYear();
  }

}
