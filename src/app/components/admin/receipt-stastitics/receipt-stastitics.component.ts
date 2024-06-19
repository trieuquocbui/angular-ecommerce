import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { ReceiptModel } from 'src/app/models/receipt';
import { ReceiptDetailsModel } from 'src/app/models/receiptDetails';
import { StastiticsModel } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-receipt-stastitics',
  templateUrl: './receipt-stastitics.component.html',
  styleUrls: ['./receipt-stastitics.component.css']
})
export class ReceiptStastiticsComponent implements OnInit {
  public chart: any;
  labels:String[] = [];
  totalPay:Number[] = [];
  totalQuantity:Number[] = [];

  receiptList!:ReceiptModel[];


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
            label: "Tổng số lượng sản phẩm",
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
    this.statisticsService.getReceiptStatistics(fromDate,toDate).subscribe(result=>{
      this.receiptList = result;
      this.receiptList.forEach(item =>{
      this.labels.push(this.convertISODate(item.date!)!); 
      let totalPay = item.listReceiptDetails?.reduce((accumulator, currentValue) => {
        return {
          sum: accumulator.sum + (currentValue.price || 0),
          product: accumulator.product + (currentValue.quantity || 0),
        };
      }, { sum: 0, product: 0 });
       this.totalPay.push(totalPay?.sum!);
       this.totalQuantity.push(totalPay?.product!);
      })
      this.createChart(this.labels,this.totalPay,this.totalQuantity)
    })
  }

}
