import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  STATUS:any =[];
  STATUS2:any = '';
  private paramSub:any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.STATUS2 = params.get('data');
      this.STATUS.push({data:this.STATUS2})
    })
  }
  ngOnDestroy(): void {
    this.paramSub.unsubscribe()
    
  }

}
