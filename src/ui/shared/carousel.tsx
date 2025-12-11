import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils/shadcn";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

function Carousel({
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: React.ComponentProps<"div"> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},
		plugins,
	);
	const [canScrollPrev, setCanScrollPrev] = React.useState(false);
	const [canScrollNext, setCanScrollNext] = React.useState(false);

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	React.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	React.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);

		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn("relative", className)}
				role='region'
				aria-roledescription='carousel'
				data-slot='carousel'
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div
			ref={carouselRef}
			className='overflow-hidden'
			data-slot='carousel-content'
		>
			<div
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
	const { orientation } = useCarousel();

	return (
		<div
			role='group'
			aria-roledescription='slide'
			data-slot='carousel-item'
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "pl-4" : "pt-4",
				className,
			)}
			{...props}
		/>
	);
}

function CarouselPrevious({
	className,
	variant = "outline",
	size = "icon",
	...props
}: React.ComponentProps<typeof Button>) {
	const { scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			data-slot='carousel-previous'
			variant={variant}
			size={size}
			className={cn("group", className)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft className='transition-colors group-hover:text-primary text-[#999999]' />
			<span className='sr-only'>Previous slide</span>
		</Button>
	);
}

function CarouselNext({
	className,
	variant = "outline",
	size = "icon",
	...props
}: React.ComponentProps<typeof Button>) {
	const { scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			data-slot='carousel-next'
			variant={variant}
			size={size}
			className={cn("group", className)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight className='transition-colors group-hover:text-primary text-[#999999]' />
			<span className='sr-only'>Next slide</span>
		</Button>
	);
}

function CarouselDots({
	className,
	totalSlides,
	...props
}: React.ComponentProps<"div"> & {
	totalSlides: number;
}) {
	const { api } = useCarousel();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [visibleSlidesCount, setVisibleSlidesCount] = React.useState(1);

	React.useEffect(() => {
		if (!api) return;

		const updateState = () => {
			const currentIndex = api.selectedScrollSnap();

			// Calcular cuántos slides caben en el viewport
			const containerWidth = api.containerNode().offsetWidth;
			const slideNodes = api.slideNodes();

			if (slideNodes.length === 0) return;

			const slideWidth = slideNodes[0].offsetWidth;
			const slidesPerView = Math.floor(containerWidth / slideWidth);

			setSelectedIndex(currentIndex);
			setVisibleSlidesCount(slidesPerView);
		};

		updateState();

		api.on("select", updateState);
		api.on("reInit", updateState);
		api.on("resize", updateState);

		return () => {
			api.off("select", updateState);
			api.off("reInit", updateState);
			api.off("resize", updateState);
		};
	}, [api]);

	const scrollTo = React.useCallback(
		(index: number) => {
			api?.scrollTo(index);
		},
		[api],
	);

	const totalDotGroups = Math.ceil(totalSlides / visibleSlidesCount);
	const currentDotGroup = Math.floor(selectedIndex / visibleSlidesCount);
	const dotSize = 8;
	const gapSize = 8;
	const expandedWidth =
		dotSize * visibleSlidesCount + gapSize * (visibleSlidesCount - 1);

	return (
		<div
			className={cn("flex items-center justify-center gap-2", className)}
			data-slot='carousel-dots'
			{...props}
		>
			{Array.from({ length: totalDotGroups }).map((_, groupIndex) => {
				const isActive = groupIndex === currentDotGroup;
				const slideIndex = groupIndex * visibleSlidesCount;

				return (
					<button
						key={`dot-group-${groupIndex}`}
						type='button'
						className={cn(
							"h-2 rounded-full transition-all duration-300",
							isActive ? "bg-primary" : "bg-[#999999] hover:bg-[#999999]/50",
						)}
						style={{ width: isActive ? `${expandedWidth}px` : "8px" }}
						onClick={() => scrollTo(slideIndex)}
						aria-label={`Go to slides ${slideIndex + 1} to ${Math.min(slideIndex + visibleSlidesCount, totalSlides)}`}
					/>
				);
			})}
		</div>
	);
}

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselDots,
};
