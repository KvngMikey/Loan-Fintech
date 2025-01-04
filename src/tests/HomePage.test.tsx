import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../router/routes/HomePage";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom"; // for the 'toBeInTheDocument' matcher

// Mocking the API call and other components
jest.mock("../../components/Transactions", () => () => (
  <div>Transactions Component</div>
));
jest.mock("../../components/Header", () => () => <div>Header Component</div>);
jest.mock(
  "../../components/LoanDetailsModal",
  () =>
    ({ isOpen, loanDetails, onClose }: any) => {
      return isOpen ? (
        <div>
          <h2>Loan Details</h2>
          <p>{loanDetails.amount}</p>
          <p>{loanDetails.tenure}</p>
          <p>{loanDetails.dateRequested}</p>
          <p>{loanDetails.status}</p>
          <p>{loanDetails.purpose}</p>
          <button onClick={onClose}>Close Modal</button>
        </div>
      ) : null;
    },
);

describe("HomePage Component", () => {
  // Render HomePage with BrowserRouter to support routing
  const renderHomePage = () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );
  };

  it("should render the HomePage with correct elements", async () => {
    renderHomePage();

    // Check if essential elements are rendered
    expect(screen.getByText(/Current Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Request Loan/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming loan repayment/i)).toBeInTheDocument();
    expect(screen.getByText(/View Loan History/i)).toBeInTheDocument();
  });

  it("should open loan details modal with correct data when 'View Details' is clicked", async () => {
    renderHomePage();

    // Find and click the 'View Details' button
    const viewDetailsButton = screen.getByText(/View Details/i);
    fireEvent.click(viewDetailsButton);

    // Wait for modal to appear and check if the loan details are displayed
    await waitFor(() => {
      expect(screen.getByText(/Loan Details/i)).toBeInTheDocument();
      expect(screen.getByText(/75,500.00/)).toBeInTheDocument(); // Loan amount
      expect(screen.getByText(/6 months/)).toBeInTheDocument(); // Tenure
      expect(screen.getByText(/2024-12-01/)).toBeInTheDocument(); // Date requested
      expect(screen.getByText(/Active/)).toBeInTheDocument(); // Status
      expect(screen.getByText(/Home Renovation/)).toBeInTheDocument(); // Purpose
    });

    // Click the 'Close Modal' button to close the modal
    const closeModalButton = screen.getByText(/Close Modal/i);
    fireEvent.click(closeModalButton);

    // Ensure modal is closed
    await waitFor(() => {
      expect(screen.queryByText(/Loan Details/i)).not.toBeInTheDocument();
    });
  });

  // it("should navigate to loans page when 'Request Loan' button is clicked", async () => {
  //   renderHomePage();

  //   // Mock the navigate function
  //   const navigate = jest.fn();
  //   jest
  //     .spyOn(require("react-router"), "useNavigate")
  //     .mockReturnValue(navigate);

  //   // Click 'Request Loan' button
  //   const requestLoanButton = screen.getByText(/Request Loan/i);
  //   fireEvent.click(requestLoanButton);

  //   // Check if navigate was called with the correct route
  //   expect(navigate).toHaveBeenCalledWith("/loans");
  // });
});
