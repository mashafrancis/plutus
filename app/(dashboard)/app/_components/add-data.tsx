'use client';

import { useCallback } from 'react';

import Add from '@/components/add-button';

import { lookup } from '@/lib/lookup';
import { useOverview } from '@/components/client-provider/overview-provider';

const AddData = () => {
	const { data } = useOverview();
	const { mutateExpenses } = data.mutate;
	const onLookupExpenses = useCallback(
		(name: string) => lookup({ data: data.expenses, name }),
		[data]
	);
	return (
		<Add type='expenses' mutate={mutateExpenses} onLookup={onLookupExpenses} />
	);
};

export default AddData;