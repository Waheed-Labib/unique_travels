export type pkg = {
    id: number,
    countries: string[],
    details: object,
    isFeatured: boolean
}

export type country = {
    id: number,
    href: string,
    image: string,
    visaRequirements: string[]
}

export type circular = {
    _id: string,
    region: string,
    image: string
}

export type statusCode = 100 | 200 | 300 | 400 | 500
