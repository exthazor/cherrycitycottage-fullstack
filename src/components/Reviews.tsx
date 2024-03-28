import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Reviews() {
    const ratingData = {
        RatingPageHeading: "What Our Guests Say",
        RatingPageDescription: "Dive into the experiences of those who've stayed with us."
    };

    const cardVariants = {
        offscreen: {
            y: 50,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
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
        <section className="bg-gray-100 text-gray-900 py-20">
            <div className="container mx-auto px-5">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                        {ratingData.RatingPageHeading}
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-700">
                        {ratingData.RatingPageDescription}
                    </p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {reviewData.map((review, index) => (
                        <motion.div
                        key={index}
                        className="p-4 md:w-1/2 w-full"
                        variants={cardVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                    >
                            <div className="h-full bg-white p-8 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                                <div className="inline-flex items-center">
                                    <img alt="Review profile" src={review.profilePic} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                                    <span className="flex-grow flex flex-col pl-4">
                                        <span className="title-font font-medium">{review.name}</span>
                                        <Link href={review.link} className="text-indigo-500 inline-flex items-center mt-2">
                                            View on Google
                                                <Image src="/images/misc/GoogleIcon.png" alt="Google Logo" height={20} width={20} className="w-4 h-4 ml-2"/>
                                        </Link>
                                    </span>
                                </div>
                                <p className="leading-relaxed mt-5 text-gray-600">{review.review}</p>
                                <div className="mt-8 flex justify-center gap-0.5 text-green-500">
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                            </svg>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                            </svg>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                            </svg>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                            </svg>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                            </svg>
                                </div>
                            </div>
                            
                    </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );

}

export default Reviews;
