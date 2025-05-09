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
                            key={circular.id}
                            className="mb-12 shadow-xl shadow-primary/25 border-8 border-primary rounded-xl"
                        >
                            <Image
                                src={circular.image}
                                alt=''
                                width={800}
                                height={1600}
                            ></Image>
                        </div>)
                }
            </div>
        </Section>
    );
};

export default Circulars;