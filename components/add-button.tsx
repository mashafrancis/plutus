'use client';

import { useEffect, useState } from 'react';

import AddButtonContent from '@/components/add-button-content';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import shortcuts from '@/constants/shortcuts';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Drawer } from 'vaul';

const openShortcutKey = Object.values(shortcuts.modal.open.shortcut);

type TypeProps = 'expenses' | 'income' | 'investments' | 'subscriptions';

type AddProps = {
	mutate?: any;
	type?: TypeProps;
	selected?: any;
	onHide?: () => void;
	onLookup?: (name: string) => void;
};

export default function Add({
	mutate,
	type,
	selected = {},
	onHide,
	onLookup,
}: AddProps) {
	const [show, setShow] = useState(false);
	const [hideButton, setHideButton] = useState(false);
	useHotkeys(openShortcutKey, () => setShow(true));

	const onButtonHide = () => setHideButton((prevState) => !prevState);

	useEffect(() => {
		if (selected?.id) {
			setShow(true);
		}
	}, [selected.id]);

	return window.innerWidth <= 768 ? (
		<Drawer.Root shouldScaleBackground onOpenChange={onButtonHide}>
			<Drawer.Trigger asChild>
				<Button
					size='icon'
					className={cn(
						hideButton ? 'hidden' : 'flex',
						'fixed bottom-[72px] right-[20px] z-40 h-[56px] w-[56px] items-center justify-between rounded-lg p-[12px] text-sm font-medium uppercase text-white shadow-lg sm:h-[48px] sm:w-[48px]'
					)}
					onClick={() => {
						setShow(!show);
					}}
				>
					<PlusIcon className='h-12 w-12' />
				</Button>
			</Drawer.Trigger>
			<Drawer.Overlay className='fixed inset-0 bg-black/40' />
			<Drawer.Portal>
				<Drawer.Content className='bg-background flex flex-col rounded-t-[10px] mt-24 h-[82vh] fixed bottom-0 left-0 right-0'>
					<div className='p-4 bg-white rounded-t-[10px] flex-1'>
						<div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8' />
						<AddButtonContent
							selected={selected}
							setShow={setShow}
							show={show}
							mutate={mutate}
							type={type}
							onHide={onHide}
							onLookup={onLookup}
						/>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	) : (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					// size='icon'
					className='fixed bottom-[72px] right-[20px] z-40 flex h-[56px] items-center justify-between rounded-lg p-[12px] text-white shadow-lg sm:h-[48px]'
					onClick={() => {
						setShow(!show);
					}}
				>
					<PlusIcon className='h-6 w-6 mr-2' />
					<span className='font-semibold uppercase'>{type}</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<AddButtonContent
					selected={selected}
					setShow={setShow}
					show={show}
					mutate={mutate}
					type={type}
					onHide={onHide}
					onLookup={onLookup}
				/>
			</DialogContent>
		</Dialog>
	);
}
