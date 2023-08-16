'use client';

import { useEffect, useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import shortcuts from '@/constants/shortcuts';

import AddExpense from './add/expenses';
import AddIncome from './add/income';
import AddInvestments from './add/investments';
import AddSubscriptions from './add/subscriptions';
import { Button } from '@/components/ui/button';

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
	useHotkeys(openShortcutKey, () => setShow(true));

	useEffect(() => {
		if (selected?.id) {
			setShow(true);
		}
	}, [selected.id]);

	return (
		<>
			<Button
				size='icon'
				className='fixed bottom-[72px] right-[20px] z-40 flex h-[56px] w-[56px] items-center justify-between rounded-lg p-[12px] text-sm font-medium uppercase text-white shadow-lg sm:h-[48px] sm:w-[48px]'
				onClick={() => {
					setShow(!show);
				}}
			>
				<PlusIcon className='h-12 w-12' />
			</Button>
			{type === 'expenses' ? (
				<AddExpense
					lookup={(value: string) => {
						if (onLookup) return onLookup(value);
					}}
					show={show}
					selected={selected}
					mutate={mutate}
					onHide={() => {
						if (onHide) onHide();
						setShow(false);
					}}
				/>
			) : null}
			{type === 'income' ? (
				<AddIncome
					lookup={(value: string) => {
						if (onLookup) return onLookup(value);
					}}
					show={show}
					selected={selected}
					mutate={mutate}
					onHide={() => {
						if (onHide) onHide();
						setShow(false);
					}}
				/>
			) : null}
			{type === 'investments' ? (
				<AddInvestments
					lookup={(value: string) => {
						if (onLookup) return onLookup(value);
					}}
					show={show}
					selected={selected}
					mutate={mutate}
					onHide={() => {
						if (onHide) onHide();
						setShow(false);
					}}
				/>
			) : null}
			{type === 'subscriptions' ? (
				<AddSubscriptions
					lookup={(value: string) => {
						if (onLookup) return onLookup(value);
					}}
					show={show}
					selected={selected}
					mutate={mutate}
					onHide={() => {
						if (onHide) onHide();
						setShow(false);
					}}
				/>
			) : null}
		</>
	);
}