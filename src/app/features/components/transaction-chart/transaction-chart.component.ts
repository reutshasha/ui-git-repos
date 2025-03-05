import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { SnackBarUtil } from '../../../shared/utilities/snack-bar.util';
import { AngularMaterialModule } from '../../../angular-material.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { GroceryTransaction } from '../../../shared/models/GroceryTransaction';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HeaderComponent } from "../../../shared/layout/header/header.component";
import { FooterComponent } from "../../../shared/layout/footer/footer.component";
import 'url-polyfill';


@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrl: './transaction-chart.component.scss',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, RouterModule, CommonModule, HttpClientModule, NgChartsModule, HeaderComponent, FooterComponent],

  // imports: [AngularMaterialModule, FormsModule, RouterModule, CommonModule,HttpClientModule, NgChartsModule, HeaderComponent, FooterComponent],
  providers: [ApiService, SnackBarUtil,Router],
})

export class TransactionChartComponent implements OnInit {

  private apiService = inject(ApiService);
  private snackBar = inject(SnackBarUtil);
  private router = inject(Router);

  transactions$: Observable<GroceryTransaction[]> = of([]);
  filteredTransactions: GroceryTransaction[] = [];

  startDate: string = this.formatDateToInput(new Date('2021-06-01'));
  endDate: string = this.formatDateToInput(new Date('2021-12-31'));

  headerStartDate: string = this.formatDateToInput(new Date('2021-06-01'));
  headerEndDate : string = this.formatDateToInput(new Date('2021-12-31'));
  
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: 'Income', data: [], borderColor: 'red', fill: false },
      { label: 'Outcome', data: [], borderColor: 'blue', fill: false },
      { label: 'Revenue', data: [], borderColor: 'green', fill: false },
    ],
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  formatDateToInput(date: Date): string {
    return date.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    const formattedStartDate = this.formatDate(this.startDate);
    const formattedEndDate = this.formatDate(this.endDate);

    this.transactions$ = this.apiService
      .getTransactionsByDateRange(formattedStartDate, formattedEndDate)
      .pipe(
        map((transactions) => this.filterTransactions(transactions)),
        tap({
          next: (data) => {
            this.filteredTransactions = data;
            this.updateChart(data);
            this.snackBar.show('Transactions loaded successfully!');
            this.headerStartDate = this.startDate;
            this.headerEndDate = this.endDate;
          },
          error: (error) => {
            this.snackBar.show('Error fetching transactions', SnackBarUtil.Duration.LONG);
            console.error('Error fetching transactions', error);
          },
        }),
        catchError((error) => {
          console.error('Error in API call', error);
          return of([]);
        })
      );
  }


  filterTransactions(transactions: GroceryTransaction[]): GroceryTransaction[] {
    const start = new Date(this.startDate).getTime();
    const end = new Date(this.endDate).getTime();

    return transactions.filter((t) => {
      const transactionTime = new Date(t.transactionDate).getTime();
      return transactionTime >= start && transactionTime <= end;
    });
  }
  

  updateChart(filtered: GroceryTransaction[]): void {
    this.chartData.labels = filtered.map((t) => new Date(t.transactionDate).toLocaleDateString());
    this.chartData.datasets[0].data = filtered.map((t) => t.income);
    this.chartData.datasets[1].data = filtered.map((t) => t.outcome);
    this.chartData.datasets[2].data = filtered.map((t) => t.revenue);
  }


  formatDate(date: Date | string): string {
    let dateObj: Date;

    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }
  updateStartDate(value: string): void {
    this.startDate = value;
  }
  
  updateEndDate(value: string): void {
    this.endDate = value;
  }
}












//   // fromDate: Date = new Date;
//   // fromDate: Date = new Date('2021-06-01T00:00:00Z');  // פורמט ISO

//   // toDate: Date = new Date('2021-12-30T00:00:00Z');
//   // transactions: GroceryTransaction[] = [];
//   transactions$: Observable<GroceryTransaction[]> = new Observable();

//   filteredTransactions: GroceryTransaction[] = [];

//   startDate: Date = new Date('2021-06-01');
//   endDate: Date = new Date('2021-12-31');

//   chartData: ChartData<'line'> = {
//     labels: [],
//     datasets: [
//       { label: 'Income', data: [], borderColor: 'red', fill: false },
//       { label: 'Outcome', data: [], borderColor: 'blue', fill: false },
//       { label: 'Revenue', data: [], borderColor: 'green', fill: false }
//     ]
//   };

//   chartOptions: ChartOptions<'line'> = {
//     responsive: true,
//     maintainAspectRatio: false
//   };








//   ngOnInit() {
//     // fetchTransctions(); //TO DO: OUT TO FUNCTION
//     // debugger
//     // console.log('StartDate:', this.startDate);
//     // console.log('EndDate:', this.endDate);
//     debugger
//     if (this.startDate && this.endDate) {
//       const formattedStartDate = this.startDate.toISOString().split('Z')[0];
//       const formattedEndDate = this.endDate.toISOString().split('Z')[0];
//       this.transactions$ = this.fetchTransactions(formattedStartDate, formattedEndDate);

//       // this.fetchTransctions(formattedStartDate, formattedEndDate)


//     }
//   }

//   fetchTransactions(formattedStartDate: string, formattedEndDate: string): void {
//     this.apiService.getTransactionsByDateRange(formattedStartDate, formattedEndDate).subscribe({
//       next: (data) => {
//         console.log('Response from API:', data);
//         this.transactions = data;
//         this.snackBar.show('Transactions loaded successfully!');
//         console.log('Transactions Response from API:', this.transactions);
//       },
//       error: (error) => {
//         this.snackBar.show('Error fetching transactions', SnackBarUtil.Duration.LONG);
//         console.error('Error fetching transactions', error);
//       }
//     });
//   }


//   filterTransactions(): void {
//     debugger
//     const start = new Date(this.startDate).getTime();
//     const end = new Date(this.endDate).getTime();

//     this.filteredTransactions = this.transactions.filter(t => {
//       debugger
//       const transactionTime = new Date(t.transactionDate).getTime();
//       return transactionTime >= start && transactionTime <= end;
//     });

//     this.updateChart();
//   }

//   updateChart(): void {
//     this.chartData.labels = this.filteredTransactions.map(t => new Date(t.transactionDate).toLocaleDateString());
//     this.chartData.datasets[0].data = this.filteredTransactions.map(t => t.income);
//     this.chartData.datasets[1].data = this.filteredTransactions.map(t => t.outcome);
//     this.chartData.datasets[2].data = this.filteredTransactions.map(t => t.revenue);
//   }

// }





// Handle the filter button click

//    fetchTransctions(){
//     this.apiService.getTransactionsByDateRange(formattedStartDate, formattedEndDate).subscribe(
//       next: (data) => {
//     this.dataSource.data = data;

//     this.snackBar.show('Favorites loaded successfully!');
//   },

//   error: (error) => {
//     this.snackBar.show('Error fetching favorites', SnackBarUtil.Duration.LONG);
//     console.error('Error fetching favorites', err)
//   },
// });







