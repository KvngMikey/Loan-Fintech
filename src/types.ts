export interface User {
    id: string;
    name: string;
    email: string;
    balance: string;
    image: string;
}

export interface Transactions {
    id: string;
    amount: string;
    date: string;
    name: string;
    type: string;
    refNumber: string;
}