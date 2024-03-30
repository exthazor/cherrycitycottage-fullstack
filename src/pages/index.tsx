
import Carousel from "../components/Carousel";
import LandingPageText from "../components/LandingPageText";
import Reviews from "../components/Reviews";
import dynamic from 'next/dynamic'


export default function Home(props: any) {

  const LandingPageNavbar = dynamic(async () => await import('../components/HomeNavbar'), {
    ssr: false,
  })

  const SearchBar = dynamic(async () => await import('../components/SearchBar'), {
    ssr: false,
  })

  const carouselImages = [
    { src: '/images/hotel/carousel/aerial-view.jpg', height: 600, width: 800, alt: 'Aerial View' },
    { src: '/images/hotel/carousel/flower-pot.jpg', height: 600, width: 800, alt: 'Flower Pot' },
    { src: '/images/hotel/carousel/garden.jpg', height: 600, width: 800, alt: 'Garden' },
    { src: '/images/hotel/carousel/reception.jpg', height: 600, width: 800, alt: 'Reception' },
    { src: '/images/hotel/carousel/restaurant.jpg', height: 600, width: 800, alt: 'Restaurant' },
    { src: '/images/hotel/carousel/terrace.jpg', height: 600, width: 800, alt: 'Terrace' }
  ];

  return (
    <>
      <div className="absolute w-full z-10">
        <LandingPageNavbar />
      </div>
      <div className="inline-grid justify-items-center">
        
        <div className="col-span-full row-span-full h-[100vh] w-[100v1]">
           <Carousel images={carouselImages}/>
        </div>
        <div className="-mb-70 mt-80 transform col-span-full row-span-full lg:mt-60 xl:mt-50 2xl:mt-40">
  <div className="flex flex-col items-center">
    <LandingPageText data={props.data} />
  </div>
  <div className="lg:mt-32 md:mt-24 hidden md:block">
    <SearchBar/>
  </div>
</div>




      </div>
      <div>
        <Reviews/>
      </div>
    </>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      data: {
        ago: "Ago",
        bgo: "Bgo",
      },
    },
  };
}

