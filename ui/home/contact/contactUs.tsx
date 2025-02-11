import { BsFillTelephoneFill } from "react-icons/bs";
import Header from "../../header";
import { address, hotline } from "../../../lib/fakeData";
import CopyNumberBtn from "./copyNumberBtn";
import { ImOffice } from "react-icons/im";

export default function ContactUs() {

    return (
        <div className="section">
            <Header
                smallText=""
                largeText="Contact Us"
                underlineColor="primary"
            ></Header>

            <div className="card bg-primary-content/95 text-base-100 w-full py-4">
                <div className="card-body w-full">
                    <div className="w-full flex justify-center items-center gap-4 md:gap-8 py-8 flex-col md:flex-row text-center">
                        <div className="flex items-center gap-2 text-accent">
                            <div className="text-2xl text-accent">
                                <BsFillTelephoneFill></BsFillTelephoneFill>
                            </div>
                            <p className="text-base-200">Hotline :</p>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4 flex-col md:flex-row">
                            <p className="text-lg text-base-200">{hotline}</p>
                            <CopyNumberBtn></CopyNumberBtn>
                        </div>

                    </div>

                    <hr className="border-accent" />

                    <div className="w-full flex justify-center items-center gap-4 md:gap-8 py-8 flex-col md:flex-row text-center">
                        <div className="flex items-center gap-2 md:gap-4 text-accent">
                            <div className="text-2xl text-accent">
                                <ImOffice />
                            </div>
                            <p className="text-base-200">Address :</p>
                        </div>

                        <div>
                            <p className="text-sm text-base-200">{address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}