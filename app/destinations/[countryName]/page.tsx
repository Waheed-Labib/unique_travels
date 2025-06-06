import Packages from "../../../ui/packages/packages";
import Requirements from "./requirements";
import Breadcrumbs from "../../../ui/breadcrumbs";

export default async function Page({
    params,
}: {
    params: Promise<{ countryName: string }>;
}) {

    const { countryName } = await params;

    const res = await fetch(`http://localhost:3000/api/countries?country=${countryName}`);
    const data = await res.json();
    const country = data.data;

    return (
        <div className="">
            <Breadcrumbs
                image={country?.image}
                name={country?.name}
                part2='destinations'
                part3={countryName}
            ></Breadcrumbs>
            <div>
                <Requirements countryName={country?.name} requirements={country?.visaRequirements}></Requirements>
            </div>
            <div>
                <Packages countryName={country?.name} isMarginShort={true} isHome={false}></Packages>
            </div>
        </div >
    )
}

