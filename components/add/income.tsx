'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { format } from 'date-fns';
import debounce from 'debounce';

import AutoCompleteList from '@/components/autocomplete-list';
import CircleLoader from '@/components/loader/circle';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

import { getCurrencySymbol } from '@/lib/formatter';

import { incomeCategory } from '@/constants/categories';
import { dateFormat, datePattern } from '@/constants/date';
import messages from '@/constants/messages';
import { useUser } from '@/components/client-provider/auth-provider';
import { addIncome, editIncome } from '@/app/(dashboard)/app/income/apis';
import { incrementUsage } from '@/app/(dashboard)/app/apis';

interface AddIncome {
	show: boolean;
	selected: any;
	onHide: () => void;
	mutate: () => void;
	lookup: (value: any) => void;
}

const todayDate = format(new Date(), dateFormat);

const initialState = {
	category: '',
	date: todayDate,
	name: '',
	notes: '',
	price: '',
	autocomplete: [],
};

export default function AddIncome({
	show,
	onHide,
	mutate,
	selected,
	lookup,
}: AddIncome) {
	const user = useUser();
	const [state, setState] = useState<any>(initialState);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const inputRef = useRef<any>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => setState(selected.id ? selected : initialState), [selected]);

	const onLookup = useMemo(() => {
		const callbackHandler = (value: string) => {
			setState((prev: any) => ({ ...prev, autocomplete: lookup(value) }));
		};
		return debounce(callbackHandler, 500);
	}, [lookup]);

	const onSubmit = async () => {
		try {
			setLoading(true);
			const isEditing = selected?.id;
			if (isEditing) {
				await editIncome(state);
			} else {
				await addIncome(state);
				await incrementUsage();
			}
			setLoading(false);
			toast({
				description: `${isEditing ? messages.updated : messages.success}`,
			});
			if (mutate) mutate();
			onHide();
			setState({ ...initialState });
		} catch {
			setLoading(false);
			toast({ description: messages.error, variant: 'destructive' });
		}
	};

	return (
		<Modal
			someRef={inputRef}
			show={show}
			title={`${selected.id ? 'Edit' : 'Add'} Income`}
			onHide={onHide}
		>
			<div className='sm:flex sm:items-start'>
				<form
					className='md:[420px] grid w-full grid-cols-1 items-center gap-3'
					onSubmit={(event) => {
						event.preventDefault();
						onSubmit();
						if (!selected.id) setState({ ...initialState });
					}}
				>
					<div className='relative'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							className='mt-1.5'
							placeholder='Salary'
							maxLength={30}
							required
							ref={inputRef}
							autoFocus
							autoComplete='off'
							onChange={({ target }) => {
								const { value } = target;
								if (value.length) {
									setState({ ...state, name: value, autocomplete: [] });
									if (value.length > 2) onLookup(value);
								} else {
									setState({
										...state,
										name: '',
										category: '',
										autocomplete: [],
									});
								}
							}}
							value={state.name}
						/>
						<AutoCompleteList
							onHide={() => {
								setState({ ...state, autocomplete: [] });
							}}
							data={state.autocomplete}
							searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
							onClick={({ name, category }) => {
								setState({ ...state, name, category, autocomplete: [] });
							}}
							show={Boolean(state.autocomplete?.length)}
						/>
					</div>
					<div className='grid grid-cols-[32%,38%,30%] gap-1'>
						<div className='mr-3'>
							<Label htmlFor='amount'>
								Amount
								<span className='ml-2 font-mono text-xs text-muted-foreground'>
									({getCurrencySymbol(user.currency, user.locale)})
								</span>
							</Label>
							<Input
								className='mt-1.5'
								id='amount'
								type='number'
								placeholder='10000'
								required
								min='0'
								step='any'
								onChange={(event) =>
									setState({
										...state,
										price: event.target.value,
									})
								}
								value={state.price}
							/>
						</div>
						<div className='mr-3'>
							<Label htmlFor='date'>Received Date</Label>
							<Input
								className='mt-1.5 appearance-none'
								id='date'
								type='date'
								required
								max={todayDate}
								pattern={datePattern}
								onChange={(event) => {
									setState({ ...state, date: event.target.value });
								}}
								value={state.date}
							/>
						</div>
						<div className='mr-3'>
							<Label htmlFor='category'>Category</Label>
							<select
								id='category'
								className='mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
								onChange={(event) => {
									setState({ ...state, category: event.target.value });
								}}
								value={state.category}
								required
							>
								{Object.keys(incomeCategory).map((categoryKey) => {
									return (
										<option key={categoryKey} value={categoryKey}>
											{incomeCategory[categoryKey]}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div>
						<Label className='block'>
							Notes{' '}
							<span className='text-center text-sm text-muted-foreground'>
								(optional)
							</span>
						</Label>
						<Textarea
							className='mt-2 h-20'
							onChange={(event) =>
								setState({
									...state,
									notes: event.target.value,
								})
							}
							value={state.notes}
							maxLength={60}
						/>
					</div>

					<Button disabled={loading} className='mt-1.5' type='submit'>
						{loading ? (
							<CircleLoader />
						) : (
							`${selected?.id ? 'Update' : 'Submit'}`
						)}
					</Button>
				</form>
			</div>
		</Modal>
	);
}