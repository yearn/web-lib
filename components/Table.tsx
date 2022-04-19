import	React, {ReactElement, ReactNode}		from	'react';
import	{useTable, usePagination, useSortBy}	from	'react-table';
import	dummyData								from	'utils/dummyData';
// import	IconChevron							from	'../icons/IconChevron';
import	{Chevron, ArrowDown}					from	'@yearn/web-lib/icons';

type		TCell = {
	getCellProp: any, render: (arg0: string) => ReactNode;

}
type		TRow = {
	getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: TCell[];
}

type		TTableHeadCell = {
	label: ReactNode,
	canSort?: boolean,
	isSorted: boolean,
	isSortedDesc: boolean,
	className: string
};
function	TableHeadCell({label, className, canSort, isSorted, isSortedDesc}: TTableHeadCell): ReactElement {
	return (
		<div className={`flex-row-center tabular-nums ${className}`}>
			<p className={'pr-1 text-typo-secondary'}>{label}</p>
			{canSort ? <div
				className={`p-1 -m-1 cursor-pointer transition-all transform ${isSorted && isSortedDesc ? 'text-icons-variant' : isSorted ? 'text-icons-variant rotate-180' : 'text-icons-primary hover:text-icons-variant'}`}>
				<ArrowDown />
			</div> : null}
		</div>
	);
}

// type		TTable = {children: ReactNode}
function	TableBase(): ReactElement {
	const data = React.useMemo((): any => dummyData.map((dummy): any => ({
		'timestamp': dummy.timestamp,
		'yfi-amount': dummy.yfiAmount,
		'usd-value': dummy.usdValue,
		'token-amount': dummy.tokenAmount,
		'token': dummy.token,
		'hash': dummy.hash
	})), []);

	const columns = React.useMemo((): any => [
		{Header: 'Timestamp', sortDescFirst: true, accessor: 'timestamp'},
		{Header: 'YFI Amount', sortDescFirst: true, accessor: 'yfi-amount', className: 'cell-end', sortType: 'basic'},
		{Header: 'USD Value', sortDescFirst: true, accessor: 'usd-value', className: 'cell-end'},
		{Header: 'Token Amount', sortDescFirst: true, accessor: 'token-amount', className: 'cell-end'},
		{Header: 'Token', disableSortBy: true, sortDescFirst: true, accessor: 'token'},
		{Header: 'Hash', disableSortBy: true, sortDescFirst: true, accessor: 'hash', className: 'font-mono text-sm'}
	], []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		// rows, //no pagination
		page, //with pagination
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		state: {pageIndex}
	} = useTable({columns, data, initialState: {pageSize: 12}}, useSortBy, usePagination);

	function	renderPreviousChevron(): ReactElement {
		if (!canPreviousPage) 
			return (<Chevron className={'w-4 h-4 opacity-50 cursor-not-allowed'} />);
		return (
			<Chevron
				className={'w-4 h-4 cursor-pointer'}
				onClick={previousPage} />
		);
	}

	function	renderNextChevron(): ReactElement {
		if (!canNextPage) 
			return (<Chevron className={'w-4 h-4 opacity-50 rotate-180 cursor-not-allowed'} />);
		return (
			<Chevron
				className={'w-4 h-4 rotate-180 cursor-pointer'}
				onClick={nextPage} />
		);
	}

	return (
		<div className={'inline-block relative pt-4 min-w-full align-middle rounded-lg shadow bg-surface'}>
			<div className={'overflow-scroll'}>
				<table
					{...getTableProps()}
					className={'overflow-x-scroll min-w-full rounded-lg divide-y-2 divide-surface-variant'}>
					<thead>
						{headerGroups.map((headerGroup: any): ReactElement => (
							// eslint-disable-next-line react/jsx-key
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column: any): ReactElement => (
									// eslint-disable-next-line react/jsx-key
									<th
										{...column.getHeaderProps(column.getSortByToggleProps([{
											className: `p-4 w-full text-left text-base font-normal text-typo-secondary whitespace-pre ${column.className}`
										}]))}>
										<TableHeadCell
											label={column.render('Header')}
											canSort={column.canSort}
											isSorted={column.isSorted}
											isSortedDesc={column.isSortedDesc}
											className={''} />
										{/* label, sortId, className, sortBy, set_sortBy */}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{page.map((row: TRow): ReactElement => {
							prepareRow(row);
							return (
								// eslint-disable-next-line react/jsx-key
								<tr {...row.getRowProps()} className={'h-16 transition-colors cursor-pointer bg-surface hover:bg-surface-variant'}>
									{row.cells.map((cell: any): ReactElement => {
										return (
											// eslint-disable-next-line react/jsx-key
											<td
												{...cell.getCellProps([
													{
														className: `p-4 text-base font-normal whitespace-pre ${cell.column.className}`,
														style: cell.column.style
													}])
												}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{canPreviousPage || canNextPage ? <div className={'flex flex-row justify-end items-center p-4 space-x-2'}>
				{renderPreviousChevron()}
				<p className={'text-sm tabular-nums select-none'}>
					{`${pageIndex + 1}/${pageOptions.length}`}
				</p>
				{renderNextChevron()}
			</div> : null}
			{/* <div className={'pagination'}>
					<select
						value={pageSize}
						onChange={e => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								{'Show '}{pageSize}
							</option>
						))}
					</select>
				</div> */}
		</div>
	);
}


export const Table = Object.assign(TableBase, {});