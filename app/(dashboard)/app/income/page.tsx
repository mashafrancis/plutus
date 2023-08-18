import { Metadata } from 'next';

import { Fragment } from 'react';

import IncomeSummary from '@/app/(dashboard)/app/income/summary';
import IncomeTable from '@/app/(dashboard)/app/income/table';
import AppLayoutHeader from '@/components/app-layout-header';
import { DataContextProvider } from '@/components/client-provider/data-provider';

export const metadata: Metadata = {
	title: 'Income',
	description: 'Plutus finance tracker.',
};

export default function Income() {
	return (
		<Fragment>
			<AppLayoutHeader
				heading='Income'
				buttonTitle='Add income'
				buttonLink='/task'
			/>
			<DataContextProvider name='income'>
				<IncomeSummary />
				<IncomeTable />
			</DataContextProvider>
		</Fragment>
	);
}
