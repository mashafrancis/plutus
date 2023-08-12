import { clsx } from 'clsx';
import {
	AlertTriangle,
	ArrowRight,
	BarChart3,
	Bell,
	Check,
	ChevronLeft,
	ChevronRight,
	Circle,
	Cloudy,
	CreditCard,
	File,
	FileText,
	Globe,
	HelpCircle,
	Image as ImageIcon,
	LayoutGrid,
	Loader2,
	type LucideProps,
	MoreVertical,
	Pizza,
	Plus,
	PlusCircle,
	Radio,
	RotateCw,
	Settings,
	Trash,
	Twitter,
	Webhook,
	X,
	type XIcon as LucideIcon,
} from 'lucide-react';

export type XIcon = typeof LucideIcon;
type SafeNumber = number | `${number}`;

export interface ThemeSwitchProps extends LucideProps {
	resolvedTheme?: 'light' | 'dark';
}

const arrowRotationMap = {
	up: 'rotate-180',
	right: '-rotate-90',
	down: 'rotate-0',
	left: 'rotate-90',
	'top-right': '-rotate-135',
};

interface ArrowIconProps {
	direction: 'up' | 'right' | 'down' | 'left' | 'top-right';
	size?: number;
	className?: string;
}

export function ArrowIcon({
	direction,
	size = 32,
	className,
	...props
}: ArrowIconProps) {
	return (
		<svg
			className={clsx(className, 'transform', arrowRotationMap[direction])}
			width={size}
			height={size}
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M15.101 5.5V23.1094L9.40108 17.4095L8.14807 18.6619L15.9862 26.5L23.852 18.6342L22.5996 17.3817L16.8725 23.1094V5.5H15.101Z'
				fill='currentColor'
			/>
		</svg>
	);
}

export const Icons = {
	logo: ({ ...props }) => (
		<svg
			width='61'
			height='40'
			viewBox='0 0 61 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g id='Group 15'>
				<circle id='Ellipse 3' cx='20' cy='20' r='20' fill='#FFAC30' />
				<path
					id='Ellipse 4'
					d='M60.6453 20C60.6453 25.3043 58.5381 30.3914 54.7874 34.1421C51.0367 37.8929 45.9496 40 40.6453 40C35.3409 40 30.2539 37.8929 26.5031 34.1421C22.7524 30.3914 20.6453 25.3043 20.6453 20L40.6453 20H60.6453Z'
					fill='#3A4276'
				/>
			</g>
		</svg>
	),
	bell: Bell,
	close: X,
	spinner: Loader2,
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	trash: Trash,
	post: FileText,
	webhook: Webhook,
	page: File,
	media: ImageIcon,
	settings: Settings,
	billing: CreditCard,
	ellipsis: MoreVertical,
	add: Plus,
	addCircle: PlusCircle,
	warning: AlertTriangle,
	arrowRight: ArrowRight,
	help: HelpCircle,
	pizza: Pizza,
	cloudy: Cloudy,
	circle: Circle,
	home: LayoutGrid,
	reports: BarChart3,
	monitor: Globe,
	radio: Radio,
	reload: RotateCw,
	arrowNext: ({ ...props }: LucideProps) => (
		<svg
			width='16'
			height='8'
			viewBox='0 0 16 8'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				id='Vector 1'
				d='M0 4H14M14 4L11.5 1M14 4L11.5 7'
				stroke='#212330'
				strokeWidth='2'
			/>
		</svg>
	),
	user: ({ ...props }: LucideProps) => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='532'
			height='532'
			viewBox='0 0 532 532'
			{...props}
		>
			<g>
				<g>
					<circle cx='270.759' cy='260.92941' r='86.34897' fill='#a0616a' />
					<polygon
						points='199.2879 366.61365 217.2879 320.61365 310.2879 306.61365 320.28003 408.44043 226.28003 410.44043 199.2879 366.61365'
						fill='#a0616a'
					/>
				</g>
				<path
					d='M357.94449,276.8613c-1.12067,4.48965-3.38602,15.17972-6.9238,15.23233-2.89023,.04208-5.65668-46.33466-2.76953-54.00568,3.31638-8.81271-5.39886-19.96062-11.96411-25.6832-11.80423-10.2894-38.00696,11.80466-64.65118,1.79587-.70633-.26482-.56558-.23502-8.97934-3.59174-25.88966-10.32974-27.2506-10.62788-28.73386-10.77521-12.55046-1.24167-27.86705,9.02844-34.12146,21.55038-6.50168,13.01653-1.06937,24.18106-7.18346,55.67184-.71246,3.67065-1.83138,8.90216-3.59174,8.97934-3.21819,.14029-6.3605-17.04846-7.18346-21.55038-3.44792-18.86186-6.7722-37.04675,0-57.46771,.73878-2.22729,5.29158-10.49458,14.36693-26.93799,13.0744-23.68825,19.65018-35.57709,21.55038-37.7132,13.62859-15.32624,38.43575-29.30734,59.26357-23.34626,10.52704,3.01299,8.63953,7.85691,21.55038,12.57105,23.00821,8.40057,43.00476-1.87303,46.69254,5.3876,1.9537,3.84602-3.51236,7.01686-3.59174,14.36693-.13593,12.6114,15.81424,16.25575,25.14212,28.73386,5.01447,6.70819,13.59753,6.78012-8.87228,96.78212l.00003,.00003Z'
					fill='#2f2e41'
				/>
			</g>
			<path
				d='M464.92017,442.61035c-3.48022,3.91016-7.09009,7.74023-10.83008,11.48047-50.23999,50.23926-117.04004,77.90918-188.09009,77.90918-61.40991,0-119.63989-20.66992-166.75-58.71973-.03003-.01953-.05005-.04004-.07983-.07031-6.25-5.03906-12.30005-10.39941-18.14014-16.05957,.10986-.87988,.22998-1.75,.35986-2.61035,.82007-5.7998,1.73022-11.33008,2.75-16.41992,8.3501-41.71973,118.22021-85.51953,121.08008-86.66016,.04004-.00977,.06006-.01953,.06006-.01953,0,0,14.14014,52.12012,74.72998,51.4502,41.27002-.4502,33.27002-51.4502,33.27002-51.4502,0,0,.5,.09961,1.43994,.2998,11.91992,2.53027,94.68018,20.70996,127.33008,45.52051,9.94995,7.55957,17.08984,23.66016,22.21997,42.85938,.21997,.82031,.42993,1.66016,.65015,2.49023Z'
				fill='#a0a0a0'
			/>
			<path
				d='M454.09009,77.91016C403.8501,27.6709,337.05005,0,266,0S128.15015,27.6709,77.90991,77.91016C27.67017,128.15039,0,194.9502,0,266c0,64.85059,23.05005,126.16016,65.29004,174.57031,4.03003,4.62988,8.23999,9.13965,12.61987,13.52051,1.03003,1.0293,2.07007,2.05957,3.12012,3.05957,5.84009,5.66016,11.89014,11.02051,18.14014,16.05957,.02979,.03027,.0498,.05078,.07983,.07031,47.11012,38.0498,105.3401,58.71973,166.75001,58.71973,71.05005,0,137.8501-27.66992,188.09009-77.90918,3.73999-3.74023,7.34985-7.57031,10.83008-11.48047,43.36987-48.71973,67.07983-110.83984,67.07983-176.61035,0-71.0498-27.66992-137.84961-77.90991-188.08984Zm10.17993,362.20996c-7.86987,8.9502-16.33008,17.37012-25.33008,25.18066-17.06982,14.84961-36.06982,27.5293-56.55981,37.62988-7.19019,3.5498-14.56006,6.7793-22.1001,9.66992-29.29004,11.24023-61.08008,17.39941-94.28003,17.39941-32.04004,0-62.76001-5.73926-91.18994-16.23926-11.67017-4.30078-22.94995-9.41016-33.78003-15.26074-1.59009-.85938-3.16992-1.72949-4.73999-2.61914-8.26001-4.68066-16.25-9.79004-23.91992-15.31055-10.98999-7.87988-21.3501-16.58984-30.98022-26.03027-5.3999-5.29004-10.55981-10.7998-15.48975-16.5293C26.09009,391.77051,2,331.65039,2,266,2,120.43066,120.42993,2,266,2s264,118.43066,264,264c0,66.66016-24.82983,127.62012-65.72998,174.12012Z'
				fill='#3f3d56'
			/>
		</svg>
	),
	gitHub: ({ ...props }: LucideProps) => (
		<svg
			aria-hidden='true'
			focusable='false'
			data-prefix='fab'
			data-icon='github'
			role='img'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 496 512'
			{...props}
		>
			<path
				fill='currentColor'
				d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
			></path>
		</svg>
	),
	google: ({ ...props }: LucideProps) => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 186.69 190.5'
			{...props}
		>
			<g transform='translate(1184.583 765.171)'>
				<path
					clipPath='none'
					mask='none'
					d='M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z'
					fill='#4285f4'
				/>
				<path
					clipPath='none'
					mask='none'
					d='M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z'
					fill='#34a853'
				/>
				<path
					clipPath='none'
					mask='none'
					d='M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z'
					fill='#fbbc05'
				/>
				<path
					d='M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z'
					fill='#ea4335'
					clipPath='none'
					mask='none'
				/>
			</g>
		</svg>
	),
	themeSwitch: ({ resolvedTheme, ...props }: ThemeSwitchProps) => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			className='h-5 w-5 text-gray-800 dark:text-gray-200'
			{...props}
		>
			{resolvedTheme === 'dark' ? (
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
				/>
			) : (
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
				/>
			)}
		</svg>
	),
	twitter: Twitter,
	check: Check,
	frequency: ({ ...props }: LucideProps) => (
		<svg
			id='root'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<circle cx='8.00039' cy='8.00039' r='1.6' fill='#646E87' />
			<circle cx='8' cy='8' r='7.5' stroke='#D5D9E3' />
			<circle cx='8.0002' cy='8.0002' r='4.3' stroke='#939DB8' />
		</svg>
	),
};
