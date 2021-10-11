/**
 * @author            : Vrushabh Uprikar
 * @last modified on  : 11-10-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log
 * Ver   Date         Author             Modification
 * 1.0   08-10-2021   Vrushabh Uprikar   Initial Version
**/
import { LightningElement } from 'lwc';
import JqueryResource from '@salesforce/resourceUrl/jQuery';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class HomeLoan extends LightningElement {

    loanAmount = 100000;
    tenure = 3;
    rateOfInterest = 5;
    tenureInMoths = 0;

    monthlyEMI = 0;
    totalInterest = 0;
    totalAmount = 0;


    async connectedCallback() {
        Promise.all([
            loadScript(this, JqueryResource),
        ]).then(() => {
            console.log('script loaded sucessfully');

        }).catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error',
                }),
            );
        });
    }

    onLoanAmountChange(event) {
        this.loanAmount = event.detail.value;
        console.log('this.loanAmount:', this.loanAmount);
    }
    onTenureChange(event) {
        this.tenure = event.detail.value;
        console.log('this.tenure:', this.tenure);
    }
    onRateOfInterestChange(event) {
        this.rateOfInterest = event.detail.value;
        console.log('this.rateOfInterest:', this.rateOfInterest);
    }
    gettenureInMonths() {
        this.tenureInMoths = this.tenure * 12;
    }

    onCalculateClick() {
        this.gettenureInMonths();
        var loanAmount = this.loanAmount;
        var numberOfMonths = this.tenureInMoths;

        var rateOfInterest = this.rateOfInterest;
        var monthlyInterestRatio = (rateOfInterest / 100) / 12;
        var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
        var bottom = top - 1;
        var sp = top / bottom;
        var emi = ((loanAmount * monthlyInterestRatio) * sp);
        var full = numberOfMonths * emi;
        var interest = full - loanAmount;
        var int_pge = (interest / full) * 100;
        var emi_str = emi.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var full_str = full.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var int_str = interest.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        console.log('int_pge: ', int_pge);
        console.log('EMI per month : ', emi_str);
        this.monthlyEMI = emi_str;
        console.log('loanAmount_str : ', loanAmount_str);
        console.log('Total pay _str : ', full_str);
        this.totalAmount = full_str;
        console.log('interenst _str : ', int_str);
        this.totalInterest = int_str;
    }

}
