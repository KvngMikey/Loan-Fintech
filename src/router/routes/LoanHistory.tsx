import { NavLink } from "react-router";
import currencyIcon from "../../assets/curreny-icon.svg";
import plusIcon from "../../assets/plus-icon.svg";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoanHistory() {
  const [loans, setLoans] = useState([
    {
      id: 1,
      amount: "75,500",
      tenure: "6 months",
      dateRequested: "2024-12-01",
      purpose: "Home renovation",
      status: "active",
    },
    {
      id: 2,
      amount: "5,000",
      tenure: "12 months",
      dateRequested: "2024-11-15",
      purpose: "Education loan",
      status: "repaid",
    },
    {
      id: 3,
      amount: "1,500",
      tenure: "3 months",
      dateRequested: "2024-10-30",
      purpose: "Medical expenses",
      status: "requested",
    },
    {
      id: 4,
      amount: "4,000",
      tenure: "8 months",
      dateRequested: "2024-11-10",
      purpose: "Car repair",
      status: "repaid",
    },
    {
      id: 5,
      amount: "1,000",
      tenure: "2 months",
      dateRequested: "2024-10-05",
      purpose: "Travel expenses",
      status: "repaid",
    },
    {
      id: 6,
      amount: "7,500",
      tenure: "15 months",
      dateRequested: "2024-09-25",
      purpose: "Business investment",
      status: "requested",
    },
    {
      id: 7,
      amount: "3,000",
      tenure: "7 months",
      dateRequested: "2024-08-20",
      purpose: "Wedding expenses",
      status: "requested",
    },
    {
      id: 8,
      amount: "2,000",
      tenure: "4 months",
      dateRequested: "2024-07-15",
      purpose: "Vacation",
      status: "repaid",
    },
    {
      id: 9,
      amount: "6,000",
      tenure: "10 months",
      dateRequested: "2024-06-12",
      purpose: "Debt consolidation",
      status: "repaid",
    },
    {
      id: 10,
      amount: "8,000",
      tenure: "16 months",
      dateRequested: "2024-05-18",
      purpose: "House down payment",
      status: "repaid",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
    amount: "",
    tenure: "",
    purpose: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    tenure: "",
    purpose: "",
  });

  const validateForm = () => {
    const newErrors = {
      amount: "",
      tenure: "",
      purpose: "",
    };

    if (!formDetails.amount) {
      newErrors.amount = "Amount is required.";
    } else if (
      isNaN(Number(formDetails.amount)) ||
      Number(formDetails.amount) <= 0
    ) {
      newErrors.amount = "Enter a valid amount greater than 0.";
    }

    if (!formDetails.tenure) {
      newErrors.tenure = "Tenure is required.";
    }

    if (!formDetails.purpose) {
      newErrors.purpose = "Purpose is required.";
    } else if (formDetails.purpose.length < 5) {
      newErrors.purpose = "Purpose must be at least 5 characters.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Add the new loan to the loans array
      setLoans((prevLoans) => [
        ...prevLoans,
        {
          id: prevLoans.length + 1,
          amount: formDetails.amount,
          tenure: formDetails.tenure,
          purpose: formDetails.purpose,
          dateRequested: new Date().toISOString().split("T")[0], // Current date
          status: "requested",
        },
      ]);

      toast.success("Loan request submitted successfully!");

      // Reset the form and close the modal
      setFormDetails({ amount: "", tenure: "", purpose: "" });
      setIsModalOpen(false);
    }
  };

  return (
    <section className="m-7">
      <ToastContainer />

      <div className="mb-5 cursor-pointer text-blue-500">
        <NavLink to="/">Back to home</NavLink>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-dark-blue text-lg font-semibold">Loan History</p>

        <button
          className="border-light-grey-200 flex items-center gap-2 rounded-md border bg-white p-2 shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          <img src={plusIcon} alt="addIcon" />
          <p className="text-dark-blue text-xs font-bold">Request Loan</p>
        </button>
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
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Tenure
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date Requested
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loans.map((loan) => (
                  <tr key={loan.id} className="even:bg-gray-50">
                    <td className="flex whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      <img src={currencyIcon} alt="currencyIcon" />
                      {loan.amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {loan.tenure}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {loan.purpose}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {loan.dateRequested}
                    </td>
                    <td
                      className={`whitespace-nowrap px-3 py-4 text-sm capitalize text-gray-500 ${
                        loan.status === "active"
                          ? "text-blue-600"
                          : loan.status === "requested"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {loan.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-5 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Request Loan</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  value={formDetails.amount}
                  onChange={handleInputChange}
                  placeholder="Enter Amount"
                  className="w-full rounded-md border p-2"
                />

                {errors.amount && (
                  <p style={{ color: "red" }}>{errors.amount}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tenure
                </label>
                <input
                  type="text"
                  name="tenure"
                  value={formDetails.tenure}
                  onChange={handleInputChange}
                  placeholder="Enter Tenure"
                  className="w-full rounded-md border p-2"
                />

                {errors.tenure && (
                  <p style={{ color: "red" }}>{errors.tenure}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Purpose
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formDetails.purpose}
                  onChange={handleInputChange}
                  placeholder="Enter Purpose"
                  className="w-full rounded-md border p-2"
                />

                {errors.purpose && (
                  <p style={{ color: "red" }}>{errors.purpose}</p>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false); // Close the modal
                    setFormDetails({ amount: "", tenure: "", purpose: "" }); // Clear form values
                    setErrors({ amount: "", tenure: "", purpose: "" }); // Clear errors (optional)
                  }}
                  className="rounded-md bg-gray-200 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
