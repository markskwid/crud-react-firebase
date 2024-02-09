import { Link } from "react-router-dom";
import { formatNumber } from "../util/util";
import Button from "./Button";
export default function TableContainer({
	items,
	tableHead,
	isLoading,
	onEdit,
	onDelete,
}) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full table-auto border">
				<thead className="bg-purple-600">
					<tr>
						{Array.isArray(tableHead) && tableHead.length > 0 ? (
							tableHead.map((title) => (
								<th
									key={title}
									className="border border-slate-800  text-white text-start p-2"
								>
									{title}
								</th>
							))
						) : (
							<th className="text-center border border-slate-800  text-white p-2" colSpan={4}>
								Table Information
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{!isLoading ? (
						items.map((customer) => (
							<tr
								key={customer.id}
								className="hover:bg-gray-300 transition-all"
							>
								<td className="text-sm underline border border-slate-800 p-2">
									<Link to={`/view-customer/${customer.id}`}>
										{customer.name}
									</Link>
								</td>
								<td className="text-sm border border-slate-800 p-2">
									{customer.email}
								</td>
								<td className="text-sm border border-slate-800 p-2">
									{formatNumber(customer.phone)}
								</td>
								<td
									className="border border-slate-800 text-center"
									aria-hidden="true"
								>
									<Button
										type="button"
										style={"mr-2"}
										ariaLabel={"edit-button"}
										onClick={() => onEdit(customer)}
										icon={"pencil-sharp"}
									/>

									<Button
										type="button"
										style={"mr-2"}
										ariaLabel={"delete-button"}
										onClick={() => onDelete(customer.id)}
										icon={"trash-sharp"}
									/>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4">Loading data...</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
