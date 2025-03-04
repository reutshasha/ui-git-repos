import { Component, inject, ViewChild } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { SnackBarUtil } from '../../../shared/utilities/snack-bar.util';
import { AngularMaterialModule } from '../../../angular-material.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { GroceryTransaction } from '../../../shared/models/GroceryTransaction';


@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrl: './transaction-chart.component.scss',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, RouterModule, CommonModule, HttpClientModule],

})

export class TransactionChartComponent {
  private apiService = inject(ApiService);
  private snackBar = inject(SnackBarUtil);
  private router = inject(Router);
  private http = inject(HttpClient);


  // fromDate: Date = new Date;
  // fromDate: Date = new Date('2021-06-01T00:00:00Z');  // פורמט ISO

  // toDate: Date = new Date('2021-12-30T00:00:00Z');
  transactions: GroceryTransaction[] = [];
  startDate: Date = new Date('2021-09-01');
  endDate: Date = new Date('2021-09-30');

  data = [];
  chartData = [];
  fromDate = '2021-06-01';
  toDate = '2021-12-31';
  filteredData = [];








  ngOnInit() {
    // fetchTransctions(); //TO DO: OUT TO FUNCTION
    // debugger
    // console.log('StartDate:', this.startDate);
    // console.log('EndDate:', this.endDate);
    debugger
    if (this.startDate && this.endDate) {
      const formattedStartDate = this.startDate.toISOString().split('Z')[0];
      const formattedEndDate = this.endDate.toISOString().split('Z')[0];
      this.fetchTransctions(formattedStartDate, formattedEndDate);

      console.log('formattedStartDate' + formattedStartDate)
      console.log('formattedEndDate' + formattedEndDate)

      debugger




    }
  }

  fetchTransctions(formattedStartDate: string, formattedEndDate: string,) {
    this.apiService.getTransactionsByDateRange(formattedStartDate, formattedEndDate).subscribe(
      data => {
        console.log('Response from API:', data);
        this.transactions = data;
        console.log('transactions Response from API:', this.transactions);

      },
      error => console.error('Error fetching transactions:', error)
    );


  }


}

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


// applyFilter(): void {
//   const from = new Date(this.form.value.fromDate);
//   const to = new Date(this.form.value.toDate);

//   this.filteredTransactions = this.transactions.filter(t => {
//     const date = new Date(t.transactionDate);
//     return date >= from && date <= to;
//   });

//   this.dateRangeText = `${this.form.value.fromDate} - ${this.form.value.toDate}`;
//   this.generateChartData();
// }





