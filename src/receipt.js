const Cost = require('./cost');
const sell = require('./sold');


//works out what should be printed on the receipt and prints it 

class Receipt{

    constructor(){
        this.totalPrices = 0;
    }

    print(basket){
        let temp = new Cost();
        let str = '~~~ Bob\'s Bagels ~~~ \n\n' ;
        let date = this.getdate();
        let middle = this.quantity(basket);
        let total = `Total: \t\t${temp.total(basket)}\n\t Thank you`;
        let dis = `Discount \t${this.discount(total)}\n`;
        let complete = str + date + middle + dis + total;
        return complete;
    }

    discount(realtotal){
        if(this.totalPrices - realtotal > 0){
            return this.totalPrices - realtotal;
        }
        return 0;
    }

    getdate(){
        let date = new Date();
        let current_day = date.getUTCDate();
        let current_month = date.getUTCMonth();
        let current_year = date.getUTCFullYear();
        let hour = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();
        return `${Date.now()} ${date.getTime()}\n ----------------------------\n`;
    }

    quantity(basket){
        let BGLO = this.quantityOfBGLO(basket);
        let BGLE = this.quantityOfBGLE(basket);
        let BGLP = this.quantityOfBGLP(basket);
        let COF = this.quantityOfCOF(basket);
        let result = this.basket( BGLO, BGLE, BGLP, COF);
        return result;
    }

    basket(blgo, bgle, bglp, cof){
        let str = '';
        if(blgo > 0){
            let result = this.getprice('BGLO', bglo);
            str += `Onion Bagel\t ${bglo}\t £${result}\n`;
        }
        if(bgle > 0){
            let result = this.getprice('BGLE', bgle);
            str += `Everything Bagel\t ${bgle}\t £${result}\n`;
        }
        if(bglp > 0){
            let result = this.getprice('BGLP', bglp);
            str += `Plain Bagel\t ${bglp}\t £${result}\n`;
        }
        if(cof > 0){
            let result = this.getprice('COF', cof);
            str += `Coffee \t ${cof}\t £${result}\n`;
        }
        str += '----------------------------\n';
        return str;
    }

    getprice(item, num){
        this.totalPrices += sell[item] * num;
        return sell[item] * num;
    }

    quantityOfBGLO(basket){
        let total = 0;
        for(let i = 0; i<basket.length; i++){
            if(basket[i] === 'BGLO'){
                total++;
            }
        }
        return total;
    }

    quantityOfBGLE(basket){
        let total = 0;
        for(let i = 0; i<basket.length; i++){
            if(basket[i] === 'BGLE'){
                total++;
            }
        }
        return total;
    }

    quantityOfBGLP(basket){
        let total = 0;
        for(let i = 0; i<basket.length; i++){
            if(basket[i] === 'BGLP'){
                total++;
            }
        }
        return total;
    }

    quantityOfCOF(basket){
        let total = 0;
        for(let i = 0; i<basket.length; i++){
            if(basket[i] === 'COF'){
                total++;
            }
        }
        return total;
    }

}

module.exports = Receipt;