import trendChartImage from "../../assets/trend-icon.svg";
import countryIcon from "../../assets/country-flag.svg";
import currencyIcon from "../../assets/curreny-icon.svg";
import plusIcon from "../../assets/plus-icon.svg";
import bellIcon from "../../assets/bell-icon.svg";
import statusIcon from "../../assets/status-icon.svg";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import Transactions from "../../components/Transactions";
import { useEffect, useState } from "react";
import type { User } from "../../types";
import LoanDetailsModal from "../../components/LoanDetailsModal";

function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanDetails, setLoanDetails] = useState({
    amount: "",
    tenure: "",
    dateRequested: "",
    status: "",
    purpose: "",
  });

  const navigate = useNavigate();

  function routeToLoansPage() {
    navigate("/loans");
  }

  function viewLoanDetails() {
    setLoanDetails({
      amount: "75,500.00",
      tenure: "6 months",
      dateRequested: "2024-12-01",
      status: "Active",
      purpose: "Home Renovation",
    });
    setIsModalOpen(true);
  }

  async function getUserInfo() {
    const apiUrl = `https://67793d87482f42b62e90ca8e.mockapi.io/api/v1/User/1`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed");
      }
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <main>
        <Header user={user} />

        <section className="border-light-grey-200 mx-7 mb-5 flex justify-between rounded-lg border bg-white px-7 py-5 shadow-sm">
          <div>
            <img src={countryIcon} alt="countryIcon" className="mb-3" />

            <p className="text-dark-grey mb-2 text-xs font-normal">
              Current Balance
            </p>

            <p className="text-dark-blue flex gap-1 text-2xl font-semibold">
              <img src={currencyIcon} alt="currencyIcon" />
              {user?.balance}
            </p>

            <button
              className="border-light-grey-200 mt-9 flex items-center gap-2 rounded-md border bg-white p-2 shadow-md"
              onClick={routeToLoansPage}
            >
              <img src={plusIcon} alt="addIcon" />
              <p className="text-dark-blue text-xs font-bold">Request Loan</p>
            </button>
          </div>

          <img src={trendChartImage} alt="trendIcon" />
        </section>

        <section className="border-light-grey-200 mx-7 mb-10 flex flex-wrap items-center justify-between gap-1 rounded-lg border bg-white px-7 py-8 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={bellIcon} alt="bellIcon" />

            <div>
              <p className="text-dark-grey mb-2 text-xs font-normal">
                Upcoming loan repayment
              </p>

              <div className="flex items-center gap-1">
                <img src={currencyIcon} alt="currencyIcon" />

                <p className="text-dark-blue text-xl font-semibold">
                  75,500.00
                </p>

                <img src={statusIcon} alt="statusIcon" className="mx-1" />

                <p className="text-dark-grey text-xs font-normal">
                  Due in 5 days
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="border-light-grey-200 flex items-center gap-2 rounded-md border bg-white p-2 shadow-md"
              onClick={viewLoanDetails}
            >
              <p className="text-dark-blue text-xs font-bold">View Details</p>
            </button>

            <button
              className="border-light-grey-200 flex items-center gap-2 rounded-md border bg-white p-2 shadow-md"
              onClick={routeToLoansPage}
            >
              <p className="text-dark-blue text-xs font-bold">
                View Loan History
              </p>
            </button>
          </div>
        </section>

        <Transactions />

        <LoanDetailsModal
          isOpen={isModalOpen}
          loanDetails={loanDetails}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </>
  );
}

export default HomePage;
