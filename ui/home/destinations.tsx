import { fakeCountries } from "../../lib/fakeData";
import Header from "../header";
import Section from "../Section";
import CountryCard from "../countryCard";

export default function Destinations() {
    return (
        <Section>
            <Header
                smallText="Choose Your"
                largeText="Next Destination"
                sequence="small, large"
            ></Header>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    fakeCountries.map(country => <CountryCard
                        key={country.id}
                        countryName={country.name}
                        image={country.image}
                        className="max-h-28"
                        actionBtn={true}
                        hoverEffect={true}
                    ></CountryCard>
                    )
                }

            </div>
        </Section>
    )
}