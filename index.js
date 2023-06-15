const symbolInput = document.querySelector('#symbol');
const stockList = document.querySelector('#stock-list');

function fetchTopStocks(){
    fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=MD2YHTEXYJ8J65ZB').then(response => response.json())
    .then(data => { 
        const stocks = data['RankA: Real-Time Performance'];
        let html='';
        for(leti=0;i<10;i++){
            const symbol = object.keys(stocks)[i];
            const change = stocks[symbol];
            const changeColor = parseFloat(change) >=0 ?
            'green' : 'red';
            html += `
            <li>
                <span class="symbol">${symbol}</span>
                <span class="change" style="color: ${changeColor}">${change}</span>
            </li>   
            `; 
        }


        stockList.innerHTML = html;
        }).catch(error>=console.error(error));

}

function fetchStockData(symbol){
    if(!symbol){
        fetchTopStocks();
        return;

    }
    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=MD2YHTEXYJ8J65ZB').then(response>=response.json())
    .then(data=>{
        const quote = data['Global Quote'];
        if(quote && quote['10. change percent']){
            const changePercent = quote['10. change percent'].
            replace('%','');
            const changeColor = parseFloat(changePercent) >= 0 ?
            'green':'red';
            const html=` <li>
            <span class="symbol">${symbol}</span>
            <span class="change" style="color: ${changeColor}">${changePercent}</span>
        </li>   `;

        stockList.innerHTML = html;
        }else{
            stockList.innerHTML = <li class="error">Invalid
            Symbol</li>
            }
    }).catch(error=> console.error(error));


}

fetchTopStocks();
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get symbol entered by user and convert it to uppercase
    const symbol = symbolInput.value.toUpperCase();
    fetchStockData(symbol);
});xs