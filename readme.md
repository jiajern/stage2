# Stage 2
- using MERN stack
- using API from [here](https://www.worldtradingdata.com/documentation#stock-and-index-real-time)
- [Reference](https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example)

## Routes:
### Public
- (post) /api/user/signup </br>
name, email, password
- (post) /api/user/signin </br>
email, password
### Protected
- (get)  /api/user/:userId </br>
- (put)  /api/user/:userId </br>
user's attribute
- (get)  /api/stock?symbol= </br>
query param
- (post) /api/stock/buy/:userId </br>
symbol quantity price
- (post) /api/stock/sell/:userId </br>
symbol quantity price
- (post) /api/user/ultimate/:userId </br>