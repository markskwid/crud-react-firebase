import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  formatNumber,
  transactions,
  formatCurrency,
  totalNumber,
} from "../util/util";
import Loading from "../components/Loading";
import { customerActions } from "../store/customer.slice";

export default function ViewPage() {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const data = useSelector((state) => state.customer.items);

  useEffect(() => {
    setLoading(true);
    if (id && data) {
      const userData = data.filter((item) => item.id === id);
      setUser(userData[0]);
      setTimeout(() => setLoading(false), 1500);
    }
  }, [id]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full drop-shadow-lg">
        <h1 className="text-xl font-extrabold">
          <Link to="/">
            <span className="text-lg mr-2" aria-hidden="true" aria-label="">
              <ion-icon name="arrow-back-sharp"></ion-icon>
            </span>
          </Link>
          Customer Information
        </h1>

        <div className="w-full mt-7 bg-white  border-slate-500 rounded-md p-5 lg:px-16 lg:py-5">
          <div className="container-name flex flex-col lg:flex-row justify-between items-start lg:items-center text-slate-800">
            <p className="font-bold text-base mt-2 lg:mt-0">
              <span className="block text-xs text-slate-500">First Name</span>
              {user && user.name && user.name.split(" ")[0]}
            </p>

            <p className="font-bold text-base mt-2 lg:mt-0">
              <span className="block text-xs text-slate-500">
                Email Address
              </span>
              {user && user.email}
            </p>

            <p className="font-bold text-base mt-2 lg:mt-0">
              <span className="block text-xs text-slate-500">
                Contact Number
              </span>
              {user && user.phone && formatNumber(user.phone)}
            </p>
          </div>

          <div className="w-full mt-8">
            <div className="header bg-gray-300 px-3 py-2 rounded-t-lg">
              <p className="font-bold">Transaction History</p>
            </div>

            <div className="w-full overflow-x-auto border-dotted border-2 border-t-0">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-slate-400 text-sm text-start">
                      Date
                    </th>
                    <th className="px-3 py-2 text-slate-400 text-sm text-start">
                      Merchant
                    </th>
                    <th className="px-3 py-2 text-slate-400 text-sm text-start">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((data) => (
                    <tr key={data.id}>
                      <td className="font-extrabold px-3 py-2 text-slate-800 text-sm text-start">
                        {data.date}
                      </td>

                      <td className="font-base px-3 py-2 text-slate-600 text-sm text-start w-1/2">
                        {data.merchant}
                      </td>

                      <td className="font-normal px-3 py-2 text-slate-500 text-sm text-start">
                        {formatCurrency(data.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td className="p-3 font-extrabold">TOTAL</td>
                    <td className="font-extrabold text-end"></td>
                    <td className="p-3 font-extrabold text-start">
                      {formatCurrency(totalNumber(transactions))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
