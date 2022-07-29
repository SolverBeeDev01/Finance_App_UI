import { Component, OnInit } from '@angular/core';

import { CustomerserviceService } from 'src/app/services/customerservice.service';
import { FDAccount } from 'src/shared/modals/fdaccount';
import { FDServiceService } from 'src/app/services/fdservice.service';
import { ToastService } from 'src/shared/services/toast.service';

@Component({
    templateUrl: './new.component.html',

})
export class NewComponent implements OnInit {
    allCustomerList: any;
    fdAccount: FDAccount = new FDAccount(null);
    validationFlag: boolean = true;

    constructor(private toster: ToastService, private customerService: CustomerserviceService, private fdService: FDServiceService) { }
    ngOnInit() {
        this.customerService.getCustomerAllDetail().subscribe(data => {
            this.allCustomerList = data;
        })
    }

    calculateItersetAmt() {
        this.fdAccount.interestAmt = (this.fdAccount.amount / 100) * (this.fdAccount.interest);

    }

    createNewFD(): void {
        this.validationFlag = true;
        this.checkValidation();
        if (this.validationFlag) {
            this.fdService.createNewFD(this.fdAccount).subscribe(data => {
                this.fdAccount = data;
                this.toster.success("Successfully Created New FD");
            })
        }
    };

    checkValidation() {
        if (this.fdAccount.custId == undefined) {
            this.toster.error("Please Select Customer");
            this.validationFlag = false;
        }
        if (this.fdAccount.amount == undefined) {
            this.toster.error("Please Enter FD Amount");
            this.validationFlag = false;
        }
        if (this.fdAccount.interest == undefined) {
            this.toster.error("Please Enter  Interest ");
            this.validationFlag = false;
        }

        if (this.fdAccount.startDate == undefined) {
            this.toster.error("Please Enter Start Date");
            this.validationFlag = false;
        }
        if (this.fdAccount.endDate == undefined) {
            this.toster.error("Please Enter End Date");
            this.validationFlag = false;
        }
    }

}