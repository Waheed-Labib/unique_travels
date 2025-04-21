'use client'

const ContactBtn = () => {

    const handleContactUsClick = () => {
        const contactSection = document.getElementById('contact-us');

        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div>
            <a onClick={handleContactUsClick} className="btn btn-sm text-base-100 btn-neutral bg-neutral/90 font-medium">Contact Us</a>
        </div>
    );
};

export default ContactBtn;