import { FaRegCheckSquare } from "react-icons/fa";
import Header from "../../header";
import Section from "../../Section";
import PrimaryBtn from "../../buttons/primaryBtn";

export default function Subscribe() {
    return (
        <Section>
            <Header
                largeText="Subscribe"
                smallText="for updates"
                sequence="large, small"
            ></Header>

            <div className="card items-center glass bg-neutral text-neutral w-full py-8 cursor-pointer">
                <div className="card-body w-full max-w-md">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg text-base-200">Your Email</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="email" placeholder="Email" className="input input-bordered w-full" />
                        <div className="label">
                            <div className="label-text-alt mt-1 text-sm w-full text-base-200 flex items-start gap-2">
                                <div className="text-lg pt-1">
                                    <FaRegCheckSquare />
                                </div>

                                <p>Update me with latest tour package and Job Circulars</p>
                            </div>
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <PrimaryBtn>
                        Subscribe
                    </PrimaryBtn>
                </div>
            </div>
        </Section>
    )
}