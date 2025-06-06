import WorkAbroad from "../../ui/work-abroad/workAbroad";
import Breadcrumbs from "../../ui/breadcrumbs";

export default function Page() {
    return (
        <div>
            <Breadcrumbs
                part2="work-abroad"
            ></Breadcrumbs>

            <WorkAbroad isMarginShort={true} isHome={false}></WorkAbroad>
        </div>
    )
}