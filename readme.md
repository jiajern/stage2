# Stage 2
- using MERN stack
- using API from [here](https://www.worldtradingdata.com/documentation#stock-and-index-real-time)
- [Reference](https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example)

## Routes:
### Public
- (post) /api/user/signup
name, email, password
- (post) /api/user/signin
email, password
### Protected
- (get)  /api/user/:userId
- (put)  /api/user/:userId
user's attribute
- (get)  /api/stock?symbol=
query param
- (post) /api/stock/buy/:userId
symbol quantity price
- (post) /api/stock/sell/:userId
symbol quantity price
- (post) /api/user/ultimate/:userId