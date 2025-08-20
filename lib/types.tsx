export type pkg = {
    _id: string,
    countries: string[],
    details: object,
    isFeatured: boolean,
    code: number
}

export type PackageDetails = { [key: string]: string };

export type country = {
    _id: string,
    name: string,
    image: string,
    visaRequirements: string[]
}

export type circular = {
    _id: string,
    region: string,
    image: string,
    fileId: string,
    createdAt: string,
    updatedAt: string
}

export type Region = {
    _id: string,
    name: string,
    image: string
}

export type statusCode = 100 | 200 | 300 | 400 | 500

export type Admin = {
    _id: string,
    email: string,
    exp: Date,
    iat: Date
}

export type Contact = {
    _id: string,
    hotline: string,
    whatsAppNumber: string,
    address: string,
    email: string
}

export type UnsplashImage = {
    id: string;
    alt_description: string;
    urls: {
        small: string;
        regular: string;
        full: string;
        thumb: string;
        raw: string;
    };
};