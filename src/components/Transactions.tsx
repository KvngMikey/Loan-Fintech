import { useEffect, useState } from "react";
import type { Transactions } from "../types";

const Transactions = () => {
  const [recentTransactions, setTransactions] = useState<Transactions[] | null>(
    null,
  );

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transactions[] | null
  >(null);
  const [sortBy, setSortBy] = useState<string>("date");

  async function getRecentTransactions() {
    const apiUrl = `https://67793d87482f42b62e90ca8e.mockapi.io/api/v1/transactions`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed");
      }
      setTransactions(data);
      setFilteredTransactions(data); // Initialize filteredTransactions
    } catch (e) {
      console.error(e);
    }
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);

    if (recentTransactions) {
      const sortedTransactions = [...recentTransactions];

      if (value === "date") {
        sortedTransactions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      } else if (value === "amount") {
        sortedTransactions.sort(
          (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
        );
      } else if (value === "type") {
        sortedTransactions.sort((a, b) => a.type.localeCompare(b.type));
      }

      setFilteredTransactions(sortedTransactions);
    }
  };

  useEffect(() => {
    getRecentTransactions();
  }, []);

  //   if (!filteredTransactions) return null;

  return (
    <section className="mx-7">
      <div className="flex items-center justify-between">
        <p className="text-dark-blue text-lg font-semibold">
          Recent Transactions
        </p>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border-light-grey-200 rounded-lg border p-2 text-xs shadow-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="type">Sort by Type</option>
        </select>
      </div>

      <div className="border-light-grey-200 mt-4 flow-root rounded-lg border bg-white shadow-sm">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Reference Number
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredTransactions?.map((tran) => (
                  <tr key={tran.id} className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {tran.name}
                    </td>

                    <td
                      className={`whitespace-nowrap px-3 py-4 text-sm font-semibold ${
                        tran.type === "withdrawal"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {tran.type === "withdrawal" ? "-" : "+"}
                      {tran.amount}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {tran.refNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(tran.date).toISOString().split("T")[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
