import { Component, OnInit } from '@angular/core';

import { customTooltips } from "@coreui/chartjs";

import { LoanserviceService } from '../../Services/loanservice.service';
import { DashBoardServiceService } from '../../Services/dash-board-service.service';
import { AppSummary } from '../../Module/app-summary';
import { LoanSummary } from '../../Module/loan-summary';
import { FdSummary } from '../../Module/fd-summary';


@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    radioModel: string = 'Month';
    appSummary: AppSummary;
    loanSummary: LoanSummary;
    fdSummary: FdSummary;
    totalcredit: number;
    totalDebitBalSummary: number;
    totalCreditBalSummary: number;
    totaolDebit: number;
    totalClosingBal: number;
    pendingCollection: number;
    closingBalSummary: number;
    constructor(private loanservice: LoanserviceService, private dashboardService: DashBoardServiceService) {
        this.totalcredit = 0;
        this.totalDebitBalSummary = 0;
        this.totalCreditBalSummary = 0;
        this.totaolDebit = 0;
        this.totalClosingBal = 0;
        this.pendingCollection = 0;
        this.closingBalSummary = 0;

        this.appSummary = new AppSummary(null);
        this.loanSummary = new LoanSummary(null);
        this.fdSummary = new FdSummary(null);
    }
   

    ngOnInit(): void {
        this.dashboardService.getAllSummaryRepo('Opened', 'Active').subscribe(data => {
            this.totalcredit = 0;
            this.appSummary = data;
            this.loanSummary = this.appSummary?.loanSummary;
            this.fdSummary = this.appSummary?.fdSummary;
            this.totalcredit = this.loanSummary?.collections + this.loanSummary?.penalty + this.fdSummary?.fdAmount + this.appSummary?.firmLoan;
            this.totaolDebit = this.loanSummary?.disbursements + this.fdSummary?.paidInterest + this.appSummary?.expenses + this.appSummary?.shortTermLoan;
            this.totalClosingBal = this.totalcredit - this.totaolDebit;

            this.totalDebitBalSummary = this.fdSummary?.fdAmount + this.appSummary?.firmLoan + this.fdSummary?.pendingIntrest;
            this.totalCreditBalSummary = Math.floor(this.loanSummary?.disbursements + this.loanSummary?.loanIntrest + this.loanSummary?.processingFees);
            this.pendingCollection = this.totalCreditBalSummary - this.loanSummary?.collections;
            this.closingBalSummary = this.pendingCollection - this.totalDebitBalSummary;
        })
    }
}
