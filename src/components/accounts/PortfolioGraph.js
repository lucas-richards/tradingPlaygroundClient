import {useEffect, useState} from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS} from "chart.js/auto"
const graphStyle = {
    width: '300px', 
    height: '300px',
}

const PortfolioGraph = () => {

    const [transactions,setTransactions] = useState([])

    // useEffect(()=>{
    //     getAllTransactions()
    //         .then(res => {
    //             const tran = res.data.transactions.filter(transaction => transaction.owner._id === user._id && transaction.symbol === symbol)
    //             setTransactions(tran)
    //             console.log('this is transactions',transactions)
    //             return tran
    //         })
    //         .then(transactions => {
    //             console.log('this is transactions',transactions)
    //             const countStocks = transactions.reduce((count,obj)=>{
    //                 if (obj.buy === true) {
    //                     count.buy = count.buy + obj.quantity ;
    //                 } else {
    //                     count.sell = count.sell + obj.quantity;
    //                 }
    //                 return count;
    //             },{ buy: 0, sell: 0 })
    //             console.log('this is countstocks',countStocks)
    //             setStockQty(countStocks.buy - countStocks.sell)
    //             console.log('stockQty',stockQty)
    //         })
    //         .catch(err => {
    //             console.log('error getting transactions')
                
    //         })
    // },[])

    const data = [
        {symbol:'GOOGL',qty:2},
        {symbol:'IBM',qty:2},
        {symbol:'NKE',qty:3},
    ]
    
    const chartData = {
        labels: data.map((item) => item.symbol),
        datasets: [
          {
            label: 'Stock Price',
            data: data.map((item) => parseFloat(item.qty)),
            backgroundColor: [
              'red',
              'blue',
              'green',
              // Add more colors as needed for your data points
            ],
            borderWidth: 2,
          },
        ],
      };

    const chartOptions = {
        plugins: {
            legend: {
            display: true,
            position: 'right', // Adjust the position as needed
            },
        },
    };

  return (
    <div style={graphStyle}>
        <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PortfolioGraph;

