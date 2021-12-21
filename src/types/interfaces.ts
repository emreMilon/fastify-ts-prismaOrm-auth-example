export interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    password: string;
}

export interface IDecodedToken {
    id?: string;
    user?: IUser;
    iat: number;
    exp: number;
}


export interface ICustomer {
    id: string;
    customerName: string;
    address: string;
    telephone: string
    zip: number;
}


export interface IForecast {
    forecastId: number;
    userId: string;
    customerId: string;
    customerName: string;
    customerAddress: string;
    customerZip: number;
    price: number;
}