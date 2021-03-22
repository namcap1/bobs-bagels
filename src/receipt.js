const Cost = require('./cost');
const stock = require('./sold');
//ed wants to format prices to right but apart from that it is good to go
//works out what should be printed on the receipt and prints it 

class Receipt{

    constructor(){
        this.totalPrices = 0;
    }

    print(basket){
        let temp = new Cost();
        let str = '\t~~~ Bob\'s Bagels ~~~ \n\n' ;
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
        let minutes = String(date.getUTCMinutes()).padStart(2, "0");
        let seconds = String(date.getUTCSeconds()).padStart(2, "0");
        return `\t${current_year}-${current_month}-${current_day} ${hour}:${minutes}:${seconds}\n ----------------------------\n`;
    }

    quantity(basket){
        let BGLO = 0;
        let BGLE = 0;
        let BGLP = 0;
        let COF = 0;
        for(let i = 0; i<basket.length;i++){
            if(basket[i] === 'BGLO'){
                BGLO++;
            }
            else if(basket[i] === 'BGLE'){
                BGLE++;
            }
            else if(basket[i] === 'BGLP'){
                BGLP++;
            }
            else{
                COF++;
            }
        }
        let result = this.basket(BGLO, BGLE, BGLP, COF);
        return result;
    }

    basket(bglo, bgle, bglp, cof){
        let str = '';
        let result = {};
        let quan = [bglo, bgle, bglp, cof];
        result['BGLO'] = this.getprice('BGLO', bglo);
        result['BGLE'] = this.getprice('BGLE', bgle);
        result['BGLP'] = this.getprice('BGLP', bglp);
        result['COF'] = this.getprice('COF', cof);
        let i = 0;
        for(var key in result){
            if(result[key] > parseFloat(0)){
                str += `${stock.items[i]}\t ${quan[i]}\t £${result[key]}\n`;
            }
            i++;
        }
        str += ' ----------------------------\n';
        return str;
    }

    getprice(item, num){
        this.totalPrices += stock.sell[item] * num;
        return stock.sell[item] * num;
    }
}

module.exports = Receipt;