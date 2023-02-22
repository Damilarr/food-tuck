import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  min:any = 0
  done:boolean = false
// isInViewPort = ()=>{
//  let countSection = document.getElementById('counts')
// let rect:any = countSection?.getBoundingClientRect();
// let viewPWidth = window.innerWidth || document.documentElement.clientWidth;
//  let viewPHeight = window.innerHeight || document.documentElement.clientHeight;
//  let chefNo =  document.getElementById('cheff')?.innerHTML
//  let customersNo = document.getElementById('customers')?.innerHTML
//  let itemsNo = document.getElementById('items')?.innerHTML

//  if (rect?.top >= 0 && rect?.left >=0 && rect.bottom <= viewPHeight && rect.right <= viewPWidth) {
//    if (!this.done) {
//      this.done = true;
//      this.iterateNo(Number(chefNo),'cheff')
//      this.iterateNo(Number(customersNo),'customers')
//      this.iterateNo(Number(itemsNo),'items')

//    }
//  }
// };

iterateNo(max: number,inner:string){
 let elem = document.getElementById(`${inner}`)
 if (elem) {
   elem.innerHTML = this.min
 }
 if (this.min <max) {
     this.min++
     setTimeout(() => {
       this.iterateNo(max,inner)
     }, 20);
 }
}

constructor() {

}
ngOnInit(): void {
 Aos.init();
//  document.addEventListener('scroll',this.isInViewPort)
}


}
