import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Customer } from 'src/shared/modals/customer';
import { ToastService } from 'src/shared/services/toast.service';

import { CustomerserviceService } from 'src/app/services/customerservice.service';

@Component({
    templateUrl: 'customer-new.component.html'
})
export class CustomerNewComponent implements OnInit {

    constructor(private toster: ToastService, private customerService: CustomerserviceService, private router: Router, private route: ActivatedRoute) { }
    customer: Customer = new Customer(null);
    isCollapsed: boolean = false;
    isCustValid: boolean = false;
    isWitnessValid: boolean = false;
    iconCollapse: string = 'icon-arrow-up';
    custId: any;
    conatactPersionList: Array<Customer> = [];

    collapsed(event: any): void {
        // console.log(event);
    }

    expanded(event: any): void {
        // console.log(event);
    }

    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
        this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
    }


    ngOnInit() {
    }
    saveCustomerPersionDetail(customer: any) {
        if (customer.fullName == "") {
            this.isCustValid = true;
        } else {
            this.isCustValid = false;
            this.customerService.saveCustomerDetail(customer).subscribe(data => {
                this.customer = data;

                this.custId = this.customer.custId;
                this.toster.success("New Customer Created Successfully")
            })
        }

    };
    saveCustContactPersionDetail(custContactPersion: any) {
        if (this.customer.custId == undefined) {
            this.toster.error("please submit customer detail")
        } else {
            if (custContactPersion.fullName == "") {
                this.isWitnessValid = true;
            } else {
                this.isWitnessValid = false;
                this.customer = custContactPersion;
                this.customer.custId = this.custId;
                this.customerService.saveCustContactPersionDetail(custContactPersion).subscribe(data => {
                    this.customer = data;
                    this.conatactPersionList.push(this.customer);
                    this.toster.success("Added Successfully")
                })
            };
        }
    }
}
