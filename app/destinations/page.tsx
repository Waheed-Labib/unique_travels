import Destinations from "../../ui/destinations/destinations";
import Breadcrumbs from "../../ui/breadcrumbs";

export default function Page() {
    return (
        <div className="">
            <Breadcrumbs
                part2="destinations"
            ></Breadcrumbs>

            <Destinations isMarginShort={true} isHome={false}></Destinations>

        </div >
    )
}
