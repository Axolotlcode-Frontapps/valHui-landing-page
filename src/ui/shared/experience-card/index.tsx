import type { ImageMetadata } from "astro";
import { cn } from "@/lib/utils/shadcn";

interface Props {
	title: string;
	text: string;
	image?: ImageMetadata;
}

export const ExperienceCard = ({ title, text, image }: Props) => {
	return (
		<div className='flex justify-center max-w-[405px] mx-[9px] max-h-[534px]'>
			<div
				className={cn(
					"w-full flex flex-col rounded-2xl text-left sm:max-w-[405px] hover:scale-105 group transition-all duration-300 ease-in-out border border-[#DFDFDF] shadow bg-white",
				)}
			>
				{image && (
					<img
						src={image.src}
						alt={title}
						className='w-full h-full object-cover rounded-t-2xl relative'
					/>
				)}

				<div className='p-5 flex flex-col absolute inset-x-0 bottom-0'>
					<h3 className='text-xl text-[#FFFFFF] lg:text-[32px] font-bold mb-3 justify-between'>
						{title}
					</h3>

					<p className='text-base mb-6 text-[#FFFFFF]'>{text}</p>

					<button
						type='button'
						className='bg-[#FFFFFF] text-[#7148EC] px-4 py-2 rounded-lg w-fit text-sm font-semibold top-[632px] left-[684px]  p-2 gap-2 opacity-100 justify-end self-end'
					>
						Ver más
					</button>
				</div>
			</div>
		</div>
	);
};
