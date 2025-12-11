import { cn } from "@/lib/utils/shadcn";
import { Button, buttonVariants } from "../button";

interface Props {
	title: string;
	text: string;
	image?: string;
	href?: string;
}

export const ExperienceCard = ({ title, text, image, href }: Props) => {
	return (
		<article
			className={cn(
				"w-full max-w-[400px] flex flex-col rounded-2xl text-left hover:scale-100 group transition-all duration-300 ease-in-out border border-[#DFDFDF] shadow bg-white relative font-Nova",
			)}
		>
			{image && (
				<img
					src={image}
					alt={title}
					className='w-full h-full object-cover rounded-t-2xl relative'
				/>
			)}

			<div className='flex items-center gap-4 absolute inset-x-0 bottom-0 px-2 pb-3'>
				<div className='text-white'>
					<h3 className='text-xl font-bold leading-6.5 tracking-[0.37px] mb-2'>
						{title}
					</h3>
					<p className='font-normal tracking-[-0.44px] leading-5'>{text}</p>
				</div>

				<a
					href={href}
					className={buttonVariants({
						variant: "outline",
						className:
							"bg-[#FFFFFF] text-[#7148EC] hover:text-white rounded-lg mt-auto max-w-[70px]",
					})}
				>
					Ver más
				</a>
			</div>
		</article>
	);
};
