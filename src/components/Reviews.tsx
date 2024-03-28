import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Reviews() {
    const ratingData = {
        RatingPageHeading: "Customer Reviews",
        RatingPageDescription: "Here's what people are saying about our service."
    };

    const reviewData = [
        {
            profilePic: "/images/reviews/animesh.png",
            link: "https://maps.app.goo.gl/Yqc7kxQRF1XNrx8Z8",
            name: "Animesh Ghosh",
            review: "We booked our room though Oyo..by completely making online payment.. it was a great experience over all.. and yes the food was provided at reasonable rates.. and the quantity and quality is decent 👍.. overall it was a good stay, we recommend couples to be there",
        },
        {
            profilePic: "/images/reviews/satyabrata.png",
            link: "https://maps.app.goo.gl/ynQhZJjQrQJhk547A",
            name: "Satyabrata Sarmah",
            review: "Good experience. Rooms are small but well furnished and designed. Food is good. Testy. Enough rice in one plate for two people. Great breakfast with juice, egg, puri, tea etc.",
        },
        {
            profilePic: "/images/reviews/ananya.png",
            link: "https://maps.app.goo.gl/Wzz1xWJew3635Dod7",
            name: "Ananya",
            review: "Nice rooms, a bit tiny, but good nonetheless. Spacious lobby and dining area. Good staff. Kitchen is available for use, with a bit of extra charge. The food is like what regular restaurants serve, quality-wise and price-wise. Overall, a good stay.",
        },
        {
            profilePic: "/images/reviews/vineeth.png",
            link: "https://maps.app.goo.gl/Kk8gFwfJ61hjS9Mp8",
            name: "Vineeth Mungath",
            review: "Very good hotel with premium looking interiors all the amenities are well placed with lot of common space in each floor. Water purifier in each floor is the noticable facility I need to mention. Parking with big vehicles may have some problems.",
        },
        {
            profilePic: "/images/reviews/dipankar.png",
            link: "https://maps.app.goo.gl/VfNDTqRyqd3oMguA9",
            name: "Dipankar Paul Raaj",
            review: "One of the best oyo room i have ever stayed..... staffs are very supportive and friendly in nature.... rooms are clean.... garden in hotel give you a pleasant moment to spend bit time here.... breakfast quality is good.... altogether nice budget hotel....",
        },
        {
            profilePic: "/images/reviews/jyoti.png",
            link: "https://maps.app.goo.gl/uS4qiLN8BF2RqXmL7",
            name: "Jyoti Kanwar",
            review: "Very friendly staff, clean rooms and clean environment, absolutely loved the stay here.",
        },
    ];

    return (
        <section className="bg-white" id="reviews">
            <div className="mx-auto max-w-screen-xl px-8 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                        {ratingData.RatingPageHeading}
                    </h2>
                    <p className="text-gring-offset-warm-gray-500 md:mt-8 mt-4 text-xs md:text-xl md:block hidden">
                        {ratingData.RatingPageDescription}
                    </p>
                    <p className="text-gring-offset-warm-gray-500 md:mt-8 mt-4 text-base md:text-xl md:hidden block">
                        See what our customers had to say about us
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
                       {reviewData.map((element, index) => {
                        return (
                            <div key={index}>
                                <img
                                alt="Review profile"
                                src={element.profilePic}
                                className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
                                />
                                <Link href={element.link}>
                                    <Image src="/images/misc/GoogleIcon.png" alt="Google Logo" height={30} width={30} className="mt-5 mx-auto"/>
                                </Link>
                                <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
                                    <p className="text-lg font-bold text-gray-700">{element.name}</p>
                                    <p className="mt-4 text-sm text-gray-500">
                                        {element.review}
                                    </p>
                                    <div className="mt-8 flex justify-center gap-0.5 text-green-500">
                                        {/* Add stars SVG or Icons here */}
                                    </div>
                                </blockquote>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Reviews;
