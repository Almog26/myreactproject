export type LoginUser = {
    email: string;
    password: string;
};
// type for the object
export type RegisterUser = {
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    phone: string;
    email: string;
    password: string;
    image?: {
        url: string;
        alt?: string;
    };
    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
    isBusiness: boolean;
    isAdmin: boolean;
};


export type CardType = {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
        _id: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
        _id: string;
    };
    bizNumber: number;
    likes: string[];
    user_id: string;
    createdAt: string;
    __v: number;
};

export type JwtPayload = {
    iat: number;
    isAdmin: boolean;
    isBusiness: boolean;
    _id: string;
};

export type StarWar = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
};


export type ErrorType = {
    status: number;
    message: string;
    details: string;
};


// טיפוס לפונקציה שמקבלת ילדים ומחזירה אלמנט של ראקט


export type JwtDecodeType = {
    iat: number;
    isAdmin: boolean;
    isBusiness: boolean;
    _id: string;
}

export type CreateNewCard = {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
};

export type updateCard = {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };

}