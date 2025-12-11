import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useRef } from "react";

interface data {
	images: {
		image: ImageMetadata;
		href?: string;
	}[];
	spaces: {
		title: string;
		locals: {
			name: string;
			space: string;
		}[];
	}[];
	info: {
		title: string;
		text: string[];
	}[];
}

interface Props {
	data: {
		label: string;
		data: data;
	}[];
}

export const TabsSection = ({ data }: Props) => {
	const listRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const tabDataRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const tabsList = listRef.current?.querySelectorAll(":scope > *") || [];
		const text = textRef.current;
		const tabData = tabDataRefs.current;

		if (!tabData || !text) return;

		tabData.forEach((item) => {
			(item as HTMLElement).style.opacity = "0";
		});

		text.style.opacity = "0";

		tabsList.forEach((item) => {
			(item as HTMLElement).style.opacity = "0";
		});

		tabData.forEach((item, index) => {
			const itemObserver = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							item.classList.add("fadeInFromBottom");
						}, index * 180);
						itemObserver.unobserve(item);
					}
				},
				{ threshold: 0 },
			);
			itemObserver.observe(item);
		});

		const textObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					text.classList.add("fadeInFromBottom");
				}
			},
			{ threshold: 0 },
		);
		textObserver.observe(text);

		tabsList.forEach((item, index) => {
			const itemObserver = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							item.classList.add("fadeInFromBottom");
						}, index * 180);
						itemObserver.unobserve(item);
					}
				},
				{ threshold: 0 },
			);
			itemObserver.observe(item);
		});
	}, []);

	return (
		<Tabs
			defaultValue={data[0].label}
			className='w-full flex flex-col items-center '
		>
			<div className='w-full bg-white px-4 xs:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14'>
				<TabsList
					ref={listRef}
					className='tab-list w-full grid grid-cols-3 gap-3 md:gap-8 max-w-[1100px] items-center justify-items-center mx-auto'
				>
					{data.map((item) => (
						<TabsTrigger
							key={item.label}
							value={item.label}
							className='text-[14px] md:text-4xl leading-[100%] font-bold text-[#BDBDBD] data-[state=active]:text-black hover:scale-105 transition-all duration-200 ease-in-out'
						>
							{item.label}
						</TabsTrigger>
					))}
				</TabsList>
				<h2
					ref={textRef}
					className='w-full max-w-[809px] text-sm md:text-lg leading-[100%] md:leading-7 tracking-[-0.44px] text-[#717182] text-center mt-4 mb-12 mx-auto'
				>
					Renta de locales comerciales pensados para que tu negocio luzca bien y
					sea cómodo. Espacios modernos, bien ubicados y listos para que inicies
					operaciones sin complicaciones, con una imagen que te ayude a vender
					desde el primer día.
				</h2>
			</div>

			{data.map((item, index) => (
				<TabsContent
					ref={(item) => {
						if (item) tabDataRefs.current[index] = item;
					}}
					key={index}
					value={item.label}
					className='tab-data relative w-full max-w-[1082px] grid grid-cols-1 md:grid-cols-[5fr_4fr] items-center justify-items-center gap-[71px] bg-white pt-8 pb-[68px] px-8 rounded-[10px] my-16 md:my-20'
				>
					<div className='w-fit flex flex-col md:flex-row gap-10 md:gap-0 order-2 md:order-1'>
						{item.data.images.map((item, index) => (
							<article key={index} className='w-full max-w-[280px]'>
								<img src={item.image.src} alt='drawing' />
								<a
									href={item.href ? item.href : "/"}
									target='_blank'
									download
									className='block w-full max-w-[168px] text-sm text-white leading-5 tracking-[-0.15px] font-bold font-Nova text-center bg-[#7148EC] rounded-xl py-2.5 mt-[9px] mx-auto hover:scale-105 transition-all duration-200 ease-in-out active:scale-95'
								>
									Descargar plano
								</a>
							</article>
						))}
					</div>

					<div className='w-full flex flex-col max-w-[335px] gap-6 order-1 md:order-2'>
						{item.data.spaces.map((item, index) => (
							<article key={index} className='w-full flex flex-col gap-2.5'>
								<h5 className='text-base md:text-2xl font-bold leading-[100%]'>
									{item.title}
								</h5>
								{item.locals.map((local, idx) => (
									<div
										key={idx}
										className='w-full flex justify-between text-sm md:text-2xl leading-[100%]'
									>
										<p className='w-fit'>{local.name}</p>
										<p className='w-fit'>{local.space}</p>
									</div>
								))}
							</article>
						))}
					</div>

					<section className='w-full bg-white py-16 md:py-20 section order-3 md:order-3 md:col-span-2 '>
						<div className='w-full flex flex-col items-center section__container'>
							{item.data.info.map((infoItem, infoIndex) => (
								<div
									key={infoIndex}
									className={`w-full flex flex-col items-center ${infoIndex === 0 && item.data.info.length > 1 ? "mb-10" : ""}`}
								>
									<h3 className='text-2xl md:text-4xl font-bold font-Nova tracking-[-0.15px] leading-[100%] mb-10 text-center'>
										{infoItem.title}
									</h3>
									<ul className='w-full max-w-[1121px] flex flex-wrap gap-x-3 gap-y-6 items-center justify-center'>
										{infoItem.text.map((text, idx) => (
											<li
												key={idx}
												className='text-sm text-[#717182] text-center tracking-[-0.51px] leading-[150%]'
											>
												{text}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>
				</TabsContent>
			))}
		</Tabs>
	);
};
