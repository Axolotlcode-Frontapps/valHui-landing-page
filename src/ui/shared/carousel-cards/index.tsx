import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
} from "@/ui/shared/carousel";
import { ExperienceCard } from "@/ui/shared/experience-card";

interface Props {
	data: {
		title: string;
		text: string;
		image?: string;
		href?: string;
	}[];
}

export const Carouselexperiences = ({ data }: Props) => {
	return (
		<div className='relative'>
			<Carousel
				// plugins={[
				// 	Autoplay({
				// 		delay: 4000,
				// 	}),
				// ]}
				opts={{
					loop: true,
				}}
			>
				<CarouselContent className='w-full -ml-7'>
					{data.map((experience) => (
						<CarouselItem
							key={experience.title}
							className='sm:basis-1/2 md:basis-1/2 lg:basis-1/3 pl-7'
						>
							<ExperienceCard
								title={experience.title}
								text={experience.text}
								image={experience.image}
								href={experience.href}
							/>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className='w-fit mx-auto bg-white mt-10 flex items-center justify-center rounded-full shadow-md p-2'>
					<CarouselDots totalSlides={data.length} />
				</div>
			</Carousel>
		</div>
	);
};
