const sell = require('./sold');


class Cost{

    constructor(){
        this._total = 0;
    }
    
    total(basket){
        for(let i = 0; i<basket.length; i++){
            this._total += parseFloat(sell[basket[i]]);
        }
        this.specialDiscounts(basket);
        return this._total.toFixed(2);
    }

    howMany(basket, item){
        let check = 0;
        for(let i = 0; i<basket.length; i++){
            if(basket[i] === item){
                check++;
            }  
        }
        return check;
    }

    specialDiscounts(basket){
        this.plainBagelDiscount(basket);
        this.onionBagelDiscount(basket);
        this.coffeeAndPlainBagelDiscount(basket);
        this.bagelEverythingDiscount(basket);
    }

    plainBagelDiscount(basket){
        if(basket.includes('BGLP')){
            let result = this.howMany(basket, 'BGLP');
            if(result >= 12){
                this._total -= parseFloat(0.69 * parseInt(result / 12));
            }
        }
    }

    onionBagelDiscount(basket){
        if(basket.includes('BGLO')){
            let result = this.howMany(basket, 'BGLO');
            if(result >= 6){
                this._total -= parseFloat(0.45 * parseInt(result /6));
            }
        }
    }

    coffeeAndPlainBagelDiscount(basket){
        if(basket.includes('COF') && basket.includes('BGLP')){
            let result1 = this.howMany(basket, 'COF');
            let result2 = this.howMany(basket, 'BGLP'); 
            if(result1 - result2 === 0){
                this._total -= parseFloat(0.13 * result1);
            }
            else if(result1 > 0 && result2 > 0){
                this._total -= parseFloat(0.13 * Math.min(result1, result2));
            }
        }
    }

    bagelEverythingDiscount(basket){
        if(basket.includes('BGLE')){
            let result = this.howMany(basket, 'BGLE');
            if(result >= 6){
                this._total -= parseFloat(0.45 * parseInt(result /6));
            }
        }
    }

}

module.exports = Cost;