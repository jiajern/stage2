import React from 'react';

import { userService, authenticationService, stockService } from '@/_services';

const Stock = (props) => {
    return(
    <div>
        <span>{props.symbol} - {props.share} Shares  </span>
        <span>${props.price}</span>    
    </div>
    )
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            user: null,
            fakeStock: [
                {symbol:'AAPL',share:12,price:227.10},
                {symbol:'MSFT',share:13,price:138.14},
                {symbol:'GOOG',share:11,price:1209.20}
            ],
            fakeSymbols: ['AAPL','MSFT','GOOG']
        };
    }

    componentDidMount() {
        userService.getUser().then(user => this.setState({ user }));
        stockService.getStocks(this.state.fakeSymbols).then(stocks => this.setState({stocks}));;
    }

    render() {
        const { currentUser, user, stocks } = this.state;
        console.log(stocks);
        return (
            <div>
                {user &&
                    <div>
                    <h1>Hi, {user.firstname}</h1>
                    <h3>Balance: ${user.balance}</h3>
                    <h3>Value: </h3>
                    </div>
                }
                {user &&
                    <div>
                    <div>portfolio</div>
                    {this.state.fakeStock.map((s) => {
                      return <Stock 
                                symbol={s.symbol}
                                price={s.price}
                                share={s.share}
                                key={s.symbol} />
                    })}
                    </div>
                }
            </div>
        );
    }
}

export { HomePage };