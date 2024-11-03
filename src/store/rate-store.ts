import { observable, action, autorun } from "mobx";
import CurrencyCode from "@/constants/CurrencyCode";

type RatesType = {
    [currencyCode: string]: number
};

const rateStore = observable({
    rates: {} as RatesType,
    date: '',
    base: 'CNY',

    setRates(rates: RatesType) {
        const resultRate: RatesType = {};
        Object.keys(CurrencyCode).forEach(item => {
            resultRate[item] = rates[item];
        });
        this.rates = resultRate;
    },
    setDate(date: string) {
        this.date = date;
    },
    setBase(base: string = 'CNY') {
        this.base = base;
    }
}, {
    setRates: action,
    setDate: action,
    setBase: action
});

// autorun(() => {
//     console.log(Object.keys(rateStore.rates).length);
// });

export default rateStore;