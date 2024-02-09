import { Link } from "react-router-dom";
import { formatNumber } from "../util/util";
import Button from "./Button";
export default function GridContainer({ items, onEdit, onDelete, isLoading }) {
	return (
		<>
			<ul className="w-full py-2 flex flex-col md:flex-row lg:flex-row justify-start items-center flex-wrap gap-4">
				{!isLoading ? (
					items.map((customer) => (
						<li
							key={customer.id}
							className="w-full md:w-[48.2%] lg:w-[32.2%] border border-slate-500 p-3 rounded-md relative hover:drop-shadow-md transition-all"
						>
							<Button
								type="button"
								style={"absolute right-12"}
								ariaLabel={"edit-button"}
								onClick={() => onEdit(customer)}
								icon={"pencil-sharp"}
							/>

							<Button
								type="button"
								style={"absolute right-4"}
								ariaLabel={"delete-button"}
								onClick={() => onDelete(customer.id)}
								icon={"trash-sharp"}
							/>

							<Link
								to={`/view-customer/${customer.id}`}
								className="font-semibold text-lg underline xl:text-lg"
							>
								{customer.name}
							</Link>

							<p className="text-slate-600 my-2 text-sm xl:text-lg">{customer.email}</p>
							<p className="text-slate-600 text-sm xl:text-lg">
								{formatNumber(customer.phone)}
							</p>
						</li>
					))
				) : (
					<p>Loading data...</p>
				)}
			</ul>
		</>
	);
}
