const { buildSchema } = require('graphql');

module.exports =  buildSchema(`
type Booking {
    _id: ID!
    username: String!
    phone: String!
    Locationa: String!
    Locationb: String!
    datecreated: String!
    status: String!
    creator: User!
}
type User {
    _id: ID!
    email: String!
    password: String
    createdBookings:[Booking!]

}
type Driverloc{
    _id: ID!
    driver_ID: String!
    latitude: Float!
    longitude: Float!
}
type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
type DriversNearby{
    _id: ID!
    first_name :String!
    last_name: String!
    email: String!
    gender: String!
    dob: String!
    national_ID: String!
    profile_Pic: String!
    rating: String!
    address: String!
    vehicle: String!
}
input InputUser {
    email: String!
    password: String
}
input DriverInput{
    first_name :String!
    last_name: String!
    email: String!
    gender: String!
    dob: String!
    national_ID: String!
    profile_Pic: String!
    rating: String!
    address: String!
    vehicle: String!
}
input LocationInput{
    latitude:Float!
    longitude:Float!
}
input BookingInput {
    username: String!
    phone: String!
    Locationa: String!
    Locationb: String!
    datecreated: String!
    status: String!
}

input DriverlocInput{
    driver_ID: String!
    latitude: Float!
    longitude: Float!
}
type RootQuery {
    bookings: [Booking!]!
    pastBookings: [Booking!]!
    requestCabNearBy:[DriversNearby!]!
    login(email: String!, password: String!): AuthData!
}
type RootMutation {
    createBooking(BookingInput: BookingInput): Booking
    createUser(InputUser: InputUser): User
    createDrivers(DriverInput: DriverInput): DriversNearby
    createDriverLocation(DriverlocInput: DriverlocInput ): Driverloc 
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);