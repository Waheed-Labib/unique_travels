import Header from "../../header";
import Section from "../Section";

export default function Subscribe() {
    return (
        <Section>
            <Header
                largeText="Subscribe"
                smallText="for updates"
                sequence="large, small"
            ></Header>

            <div className="card items-center glass bg-neutral text-base-100 w-full py-8">
                <div className="card-body w-full max-w-md">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg text-base-200">Your Email</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="email" placeholder="Email" className="input input-bordered w-full" />
                        <div className="label">
                            <span className="label-text-alt text-sm w-full text-base-200">Keep updated with latest tour package, Job Circulars, etc</span>
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    <button className="btn btn-accent">Subscribe</button>
                </div>
            </div>
        </Section>
    )
}