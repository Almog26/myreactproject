// File: @types/types.ts

export interface CardData {
    _id: string;
    title: string; // required, min length 2, max length 256
    subtitle: string; // required, min length 2, max length 256
    description: string; // required, min length 2, max length 1024
    phone: string; // required, min length 9, max length 11
    email: string; // required, min length 5
    web: string; // optional, min length 14
    image: { // required
        url: string; // min length 14
        alt: string; // min length 2, max length 256
    };
    address: { // required
        state: string; // optional
        country: string; // required
        city: string; // required
        street: string; // required
        houseNumber: number; // required
        zip: number; // optional
    };
}

export interface Card {
    _id: string;
    title: string;
    subtitle: string;
    image: {
        url: string;
        alt: string;
    };
} 