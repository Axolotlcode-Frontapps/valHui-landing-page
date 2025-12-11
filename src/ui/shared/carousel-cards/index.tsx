import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/ui/shared/carousel";
import { ExperienceCard } from "@/ui/shared/experience-card";

interface Props {
	data: {
		title: string;
		text: string;
		image?: any;
		icon?: any;
	}[];
}

export const Carouselexperiences = ({ data }: Props) => {
	return (
		<div className='relative'>
			<Carousel
				plugins={[
					Autoplay({
						delay: 4000,
					}),
				]}
				opts={{
					loop: true,
				}}
			>
				<CarouselContent className='w-full ml-0 py-5 overflow-x-visible'>
					{data.map((experience) => (
						<CarouselItem
							key={experience.title}
							className='basis-full sm:basis-1/2 lg:basis-2/5  xl:basis-1/3 pl-0 flex max-w-[300px] md:max-w-[405px]  '
						>
							<ExperienceCard
								title={experience.title}
								text={experience.text}
								image={experience.image}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className='flex items-center justify-center gap-4 py-3 '>
					<CarouselPrevious className='bg-transparent! border-0 shadow-none' />
					<CarouselDots className='mt-0' totalSlides={data.length} />
					<CarouselNext className='bg-transparent! border-0 shadow-none' />
				</div>
			</Carousel>
		</div>
	);
};
