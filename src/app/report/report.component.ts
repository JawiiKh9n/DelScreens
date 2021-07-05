import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ServiceService  } from '../service.service'
import { ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import "jspdf-autotable"
import * as chart from 'chart.js';
import { Chart, ChartDataSets } from 'chart.js';


import html2pdf from 'html2pdf.js'
import  jspdf  from 'jspdf';
import * as autoTable from 'jspdf-autotable';

@Component(
  {
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit 
{
  form: FormGroup;
  prodcategories: any;
  s_picker: any;
  e_picker: any;
  ProductName = []; 
  AverageQuantityOrdered = []; 
  data2 = [];
  htmlData = [];
  temp: any;

  count : any;
  total : any;
  GrandAverage : any;


  constructor(private service: ServiceService, private formBuilder : FormBuilder) 
  {   
  }


  ngOnInit(): void {
    this.service.GetCategories().subscribe((data) => 
    {
    this.prodcategories = data;
    })

    this.form = this.formBuilder.group(
    {
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      productCategoryID: ['', Validators.required],
    });
  }

  generate(data)
  {

    this.service.GetReportData(data).subscribe((results: any) => 
    {
      console.log(results)

      results.reportData.forEach(x => 
      {
        this.ProductName.push(x.ProductName); 
        this.AverageQuantityOrdered.push(x.AverageQuantityOrdered);  
        this.count = this.count + this.AverageQuantityOrdered;
      });

      this.total = this.ProductName.length;

      this.GrandAverage = this.AverageQuantityOrdered.reduce((accum,item) => accum + item, 0)

      this.data2 = results.reportData;

      this.htmlData.push(new Chart('canvas', 
      {
        type: 'bar',
        data: 
        {
          labels: this.ProductName,
          datasets: [
            {
              data: this.AverageQuantityOrdered,
              borderColor: '#3cb371',
              backgroundColor: "#FF6384",
            }
          ],
        },
         
        options: 
        {
          legend: 
          {
            display: false
          },
          scales: 
          {
            xAxes: [
              {
              display: true
            }],
            yAxes: [
              {
              display: true
            }],
          }
        }
      }));
    });
  }

  @ViewChild('print') print: ElementRef;
  
  download(data)
  {
    const doc = new jspdf();
    this.service.GetReportData(data).subscribe(response => 
      {
    var doc =  new jspdf();
    var pageLength = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    let length = 5

    var FinalV = 160;
    var newCanvas  =<HTMLCanvasElement>document.getElementById("canvas");

    var newCanvasImg =  newCanvas.toDataURL("image/png",1.0);
    doc.setFontSize(30)
    let Size = Math.round((pageLength/2)-15);


    doc.text("Category Report", Size , 15)


    doc.addImage(newCanvasImg,"PNG",25,25,160,150);
    doc.addPage();
    doc.setFontSize(14)
    let k=160;
    for(let i=0 ; i < length; i++)
    {
      doc.text(this.ProductName[i] + " " + this.AverageQuantityOrdered[i] ,(300/2)-25,k+23);
      FinalV=k;
   doc.autoTable({startV: FinalV+25,html: "#table", useCss:true, head:[ [ "Category of product"]]})
   FinalV = doc.autoTable.previous.FinalV;
    }

    doc.save("Generated Report.pdf");

  });
}
}
