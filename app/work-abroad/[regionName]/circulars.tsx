import Image from "next/image";
import { circular } from "../../../lib/types";
import Header from "../../../ui/header";
import Section from "../../../ui/Section";

const Circulars = ({ regionName, circulars }: {
    regionName: string,
    circulars: circular[]
}) => {

    return (
        <Section isMarginShort={true}>
            <Header
                largeText="Recent Circulars"
                smallText={`from ${regionName}`}
                sequence="large, small"
                isHome={false}
            />

            <div>
                {
                    circulars.map(circular =>
                        <div
                            key={circular._id}
                            className="mb-12"
                        >
                            <div className="mb-2 shadow-xl shadow-primary/25 border-8 border-primary rounded-xl">
                                <Image
                                    src={circular.image}
                                    alt=''
                                    width={600}
                                    height={1200}
                                ></Image>
                            </div>

                            <p className="text-neutral text-xs text-end mr-2">Added On: <span className="font-semibold text-sm">{circular.createdAt.split('T')[0]}</span></p>
                        </div>)
                }
            </div>
        </Section>
    );
};

export default Circulars;