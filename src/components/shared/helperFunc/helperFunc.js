import { getAllTransactions } from "../../../api/transaction"

export const getQtyInPortfolio = (user, symbol) => {
    return new Promise((resolve, reject) => {
        getAllTransactions()
            .then(res => {
                    const transactions = res.data.transactions.filter(transaction => transaction.owner._id === user._id && transaction.symbol === symbol)
                    console.log('these are all the transactions',transactions)
                    const countStocks = transactions.reduce((count,obj)=>{
                        if (obj.buy === true) {
                            count.buy++;
                        } else {
                            count.sell++;
                        }
                        return count;
                    },{ buy: 0, sell: 0 })
                    console.log('this is countstocks',countStocks)
                    const qty = countStocks.buy - countStocks.sell
                    console.log('this is the qty',qty)
                    
                    resolve(qty); // Resolve the promise with the data
                })
                .catch((error) => {
                    reject(error); // Reject the promise if there's an error
                });
    });
};