import { Table } from 'react-bootstrap';
import './style.css';

export default function TableForm({ header, body, dataEmptyDscr, colSpan = '9' } = {}) {
	return (
		<Table responsive striped bordered hover variant='light'>
			<thead>
				<tr>
					<th>#</th>
					{header.map((item, index) => (
						<th key={index}>{item}</th>
					))}
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
				{body.length === 0 ? (
					<tr style={{ textAlign: 'center' }}>
						<td valign='top' colSpan={colSpan} className='dataTables_empty'>
							{dataEmptyDscr}
						</td>
					</tr>
				) : (
					body.map((element) => element)
				)}
			</tbody>
		</Table>
	);
}
