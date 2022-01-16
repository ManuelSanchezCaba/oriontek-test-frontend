import { useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import './style.css';

import { useTable, usePagination, useGlobalFilter } from 'react-table';

export default function TableForm({ columns, data, dataEmptyDscr, colSpan = '9', children } = {}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		state,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		usePagination
	);

	useEffect(() => {
		setPageSize(5);
	}, []);

	return (
		<>
			<span
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '10px',
				}}
			>
				<Form.Control
					size='sm'
					type='text'
					value={globalFilter || ''}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder='Search'
					style={{ width: '25%' }}
				/>
				{children}
			</span>
			<Table responsive striped bordered hover variant='light' {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.length === 0 ? (
						<tr>
							<td valign='top' colSpan={colSpan} className='dataTables_empty'>
								{dataEmptyDscr}
							</td>
						</tr>
					) : (
						page.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
									})}
								</tr>
							);
						})
					)}
				</tbody>
			</Table>
			<div className='pagination'>
				<Button size='sm' variant='light' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</Button>
				<Button
					size='sm'
					variant='light'
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{'<'}
				</Button>
				<Button size='sm' variant='light' onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</Button>
				<Button
					size='sm'
					variant='light'
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{'>>'}
				</Button>
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					<Form.Group style={{ display: 'flex' }}>
						<Form.Label>| Go to page:</Form.Label>
						<Form.Control
							size='sm'
							type='number'
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: '100px' }}
						/>
					</Form.Group>
				</span>
				<div>
					<Form.Select
						size='sm'
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[5, 10, 15, 20].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</Form.Select>
				</div>
			</div>
		</>
	);
}
