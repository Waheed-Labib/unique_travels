import { pkg } from "./definitions"

export const fakeCountries = [
    {
        id: 1,
        name: 'Indonesia',
        href: '/destinations/indonesia',
        image: 'https://images.unsplash.com/photo-1482784160316-6eb046863ece?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjAzOTh8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1507614498949-edbabc86a14f?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzEzNDV8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 2,
        name: 'Malaysia',
        href: '/destinations/malaysia',
        image: 'https://images.unsplash.com/photo-1510776632413-f3e527a8dc42?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjA0ODd8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1568214697537-ace27ffd6cf3?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzE0NTJ8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 3,
        name: 'Nepal',
        href: '/destinationsepal',
        image: 'https://images.unsplash.com/photo-1462290625486-c142817fb94d?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjA1NDB8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzE1NTN8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 4,
        name: 'Philippines',
        href: '/destinations/philippines',
        image: 'https://images.unsplash.com/photo-1461230185679-aad82a673415?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjA0NDh8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzE2MTJ8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 5,
        name: 'Thailand',
        href: '/destinations/thailand',
        image: 'https://images.unsplash.com/photo-1443527216320-7e744084f5a7?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjM4MDF8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1497290756760-23ac55edf36f?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzE2NzZ8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 6,
        name: 'Singapore',
        href: '/destinations/singapore',
        image: 'https://images.unsplash.com/photo-1601204483351-4c1fcbd496cb?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjA2MzZ8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1536692546400-ac0af3f293fd?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzEyMDN8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 7,
        name: 'Bhutan',
        href: '/destinations/bhutan',
        image: 'https://images.unsplash.com/photo-1504892612018-159ffa1d147f?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjA3NTR8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzE3Mzd8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 8,
        name: 'China',
        href: '/destinations/china',
        image: 'https://images.unsplash.com/photo-1536585806558-81c7ea4d393d?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNjA4MDN8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzE3ODV8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
    {
        id: 9,
        name: 'Srilanka',
        href: '/destinations/srilanka',
        image: 'https://images.unsplash.com/photo-1510279770292-4b34de9f5c23?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzM1MjR8&ixlib=rb-4.0.3',
        // portraitImage: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkxNzM0ODd8&ixlib=rb-4.0.3',
        visaRequirements: [
            'Valid passport - (minimum 6-month validity is required)',
            '2 copy color photographs (Singapore  size met paper)',
            'Visiting card + Pad',
            'Trade licenses English notary',
            'Last six month Bank statement + Solvency (2 lac per pax)/ Salary bank statement with solvency'
        ]
    },
]


// random-image-api
// https://api.unsplash.com/photos/random?client_id=Y-Zv6OTYaQQ8ZpINzFTxP60tCuSwUAkrAni5IMsSApk&query=singapore-nature&orientation=landscape

export const fakePackages: pkg[] = [
    {
        id: 1,
        countries: ['Malaysia', 'Indonesia'],
        details: {
            'Duration': '6 nights 7 days',
            'Expenditure': '45900 tk per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 2,
        countries: ['Thailand'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)',
            'Duration4': '6 nights 7 days',
            'Price4': '45900 per person',
            'Travel Date4': '2nd FEBRUARY 2025',
            'Hotel4': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation4': 'Return Airport Transfers by car + 🚤Speed boat (Combine)',
            'Duration2': '6 nights 7 days',
            'Price2': '45900 per person',
            'Travel Date2': '2nd FEBRUARY 2025',
            'Hotel2': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation2': 'Return Airport Transfers by car + 🚤Speed boat (Combine)',
            'Duration3': '6 nights 7 days',
            'Price3': '45900 per person',
            'Travel Date3': '2nd FEBRUARY 2025',
            'Hotel3': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation3': 'Return Airport Transfers by car + 🚤Speed boat (Combine)',
        },
        isFeatured: false,
    },
    {
        id: 3,
        countries: ['Srilanka', 'Nepal'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: true,
    },
    {
        id: 4,
        countries: ['Malaysia', 'Indonesia', 'Thailand'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: true,
    },
    {
        id: 5,
        countries: ['Srilanka', 'Nepal', 'Bhutan'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 6,
        countries: ['Nepal'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 7,
        countries: ['Srilanka', 'Nepal', 'Bhutan'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 8,
        countries: ['Philippines'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: true,
    },
    {
        id: 9,
        countries: ['Malaysia', 'Indonesia', 'Philippines'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 10,
        countries: ['Philippines', 'Indonesia'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 11,
        countries: ['China'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 12,
        countries: ['Malaysia', 'Indonesia'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 13,
        countries: ['Philippines'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 14,
        countries: ['Malaysia', 'Indonesia', 'Philippines'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 15,
        countries: ['Philippines', 'Indonesia'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 16,
        countries: ['China'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
    {
        id: 17,
        countries: ['Malaysia', 'Indonesia'],
        details: {
            'Duration': '6 nights 7 days',
            'Price': '45900 per person',
            'Travel Date': '2nd FEBRUARY 2025',
            'Hotel': '*02 nights stay in Kaani Grand Hotel –  Maafushi island Sea view room including Breakfast.*01 night stay in The White Harp Beach Hotel(Hulhumale) including Breakfast.*2 night stay in Kandy at Gangaaddara Hotel including Breakfast.*1 night stay in Colombo at Berjaya Hotel Colombo including Breakfast.',
            'Transportation': 'Return Airport Transfers by car + 🚤Speed boat (Combine)'
        },
        isFeatured: false,
    },
]

export const fakeRegions = [
    {
        id: 1,
        name: 'Middle East',
        href: '/work-abroad/middle-east',
        image: 'https://images.unsplash.com/photo-1553195028-eef77bb016cd?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkyNDA4Mjd8&ixlib=rb-4.0.3'
    },
    {
        id: 2,
        name: 'Europe',
        href: 'work-abroad/europe',
        image: 'https://images.unsplash.com/photo-1471874708433-acd480424946?ixid=M3w3MDc2Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkyNDA4NzV8&ixlib=rb-4.0.3'
    },
]

export const hotline = '+8801788458189'
export const whatsAppNumber = '8801788458189'
export const address = '4th floor, House No. 20, Central Road, Maijdee Court, Noakhali'

