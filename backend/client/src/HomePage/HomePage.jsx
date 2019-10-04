import React from 'react';

import { userService, authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            user: null
        };
    }

    componentDidMount() {
        userService.getUser().then(user => this.setState({ user }));
    }

    render() {
        const { currentUser, user } = this.state;
        console.log(user);
        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {user &&
                    <h1>Hi, {user.firstname}</h1>
                }
                {/* {users &&
                    <ul>
                        <h1>Hi, {user.firstname}</h1>
                    </ul>
                } */}
            </div>
        );
    }
}

export { HomePage };