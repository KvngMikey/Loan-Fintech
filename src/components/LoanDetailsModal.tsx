import React from "react";

type LoanDetailsModalProps = {
  isOpen: boolean;
  loanDetails: {
    amount: string;
    tenure: string;
    dateRequested: string;
    status: string;
    purpose: string;
  };
  onClose: () => void;
};

const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({
  isOpen,
  loanDetails,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Loan Details</h2>
          <button className="text-gray-600" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <p>
            <strong>Amount:</strong> {loanDetails.amount}
          </p>
          <p>
            <strong>Tenure:</strong> {loanDetails.tenure}
          </p>
          <p>
            <strong>Date Requested:</strong> {loanDetails.dateRequested}
          </p>
          <div className="flex gap-2">
            <strong>Status:</strong>
            <p className="text-blue-600 capitalize">{loanDetails.status}</p>
          </div>
          <p>
            <strong>Purpose:</strong> {loanDetails.purpose}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;
