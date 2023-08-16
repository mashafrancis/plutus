'use client';

import { For } from 'million/react';
import OverviewCard from '@/app/(dashboard)/app/_components/overview-card';

export default function OverviewCardLayout({ items }: { items: any[] }) {
	return (
		<div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
			<For each={items}>
				{({ title, icon, subTitle, caption }) => {
					return (
						<OverviewCard
							heading={title}
							icon={icon}
							value={subTitle}
							caption={caption}
						/>
					);
				}}
			</For>
		</div>
	);
}
