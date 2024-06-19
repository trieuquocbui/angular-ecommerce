import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import BillModel from 'src/app/models/bill';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-bill-statistics',
  templateUrl: './bill-statistics.component.html',
  styleUrls: ['./bill-statistics.component.css']
})
export class BillStatisticsComponent implements OnInit {

  public chart: any;
  labels:String[] = [];
  totalPay:Number[] = [];
  totalQuantity:Number[] = [];

  bills!:BillModel[];
  
  paymentMap: Map<string, number> = new Map();
  quantityMap: Map<string, number> = new Map();


  constructor(private formBuilder: FormBuilder,private statisticsService:StatisticsService,private datePipe: DatePipe) {
    Chart.register(...registerables);
   }

  ngOnInit() {
    this.dateStatistics = this.formBuilder.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],
      });
  }

  createChart(labels:String[],totalPay:Number[],totalQuantity:Number[]) {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tổng số tiền",
            data: totalPay,
            backgroundColor: 'blue'
          },
          {
            label: "Tổng số đơn hàng",
            data: totalQuantity,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  dateStatistics: FormGroup = new FormGroup({
    toDate: new FormControl(null),
    fromDate: new FormControl(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.dateStatistics.controls;
  }

  convertISODate(isoDate: Date): String {
    return this.datePipe.transform(isoDate, 'dd-MM-yyyy')!; // Định dạng ngày tháng năm theo mong muốn
  }

  onSubmit() {
    let fromDate = this.dateStatistics.get('fromDate')?.value;
    let toDate =this.dateStatistics.get('toDate')?.value;
    this.statisticsService.getBillStatistics(fromDate,toDate).subscribe(result=>{
      this.bills = result;

      this.bills.forEach(item =>{
        let date = this.convertISODate(item.orderDay!);
        if(this.paymentMap.has(date.toString())){
          let editPayment = this.paymentMap.get(date.toString())! + item.totalAmount!;
          let editQuantity = this.quantityMap.get(date.toString());
          this.paymentMap.set(date.toString(),editPayment);
          this.quantityMap.set(date.toString(), ++editQuantity!);
        } else{
          this.paymentMap.set(date.toString(),item.totalAmount!);
          this.quantityMap.set(date.toString(), 1);
        }
      })

      this.paymentMap.forEach((value,key)=>{
        this.labels.push(key);
        this.totalPay.push(value)
      })

      this.quantityMap.forEach((value,key)=>{
        this.totalQuantity.push(value)
      })
      this.createChart(this.labels,this.totalPay,this.totalQuantity);
    })

    
  }
}
