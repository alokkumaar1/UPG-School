import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import image1 from '../../config/Photo/image1.png';
import image2 from '../../config/Photo/image2.png';
import image3 from '../../config/Photo/image3.png';

export default function ImageSlider() {
  const slides = [image1, image2, image3];

  return (
    <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <img
              src={slide}
              alt={`School Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #d4af37;
          background: rgba(0, 0, 0, 0.5);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        .swiper-pagination-bullet {
          background: #d4af37;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #d4af37;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
