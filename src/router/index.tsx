import { BrowserRouter, Routes, Route } from "react-router";
import LoanHistory from "./routes/LoanHistory";
import HomePage from "./routes/HomePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="loans" element={<LoanHistory/>}/>
      </Routes>
    </BrowserRouter>
  );
}
