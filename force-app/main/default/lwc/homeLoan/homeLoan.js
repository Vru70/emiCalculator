/**
 * @author            : Vrushabh Uprikar
 * @last modified on  : 08-10-2021
 * @last modified by  : Vrushabh Uprikar
 * Modifications Log
 * Ver   Date         Author             Modification
 * 1.0   08-10-2021   Vrushabh Uprikar   Initial Version
**/
import { LightningElement } from 'lwc';
import JqueryResource from '@salesforce/resourceUrl/jQuery';
import { loadScript} from 'lightning/platformResourceLoader';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class HomeLoan extends LightningElement {

    slideValue = 20; //initial value
    sliderChange(event) 
    {
        this.slideValue = event.detail.value;
        console.log('this.slideValue:', this.slideValue);
    }
    async connectedCallback()
    {
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

}
