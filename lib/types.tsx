export type pkg = {
    _id: string,
    countries: string[],
    details: object,
    isFeatured: boolean,
    code: number
}

export type country = {
    _id: number,
    href: string,
    image: string,
    visaRequirements: string[]
}

export type circular = {
    _id: string,
    region: string,
    image: string
}

export type Region = {
    _id: string,
    name: string,
    href: string,
    image: string
}

export type statusCode = 100 | 200 | 300 | 400 | 500
