import Circulars from "./circulars";
import Breadcrumbs from "../../../ui/breadcrumbs";

export default async function Page({
    params,
}: {
    params: Promise<{ regionName: string }>;
}) {

    const { regionName } = await params;

    // fetch region data
    const regionResponse = await fetch(`http://localhost:3000/api/regions?name=${regionName}`);
    const regionData = await regionResponse.json();
    const region = regionData.data;

    // fetch circulars
    const circularResponse = await fetch(`http://localhost:3000/api/circulars?region=${regionName}`);
    const circularData = await circularResponse.json();
    const circulars = circularData.data;

    return (
        <div className="">

            <Breadcrumbs
                image={region?.image}
                name={region?.name}
                part2='work-abroad'
                part3={regionName}
            ></Breadcrumbs>

            <Circulars regionName={regionName} circulars={circulars}></Circulars>
        </div >
    )
}
