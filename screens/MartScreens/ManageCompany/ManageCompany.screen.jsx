import { ManageCompanyDashboard } from "./components/ManageCompanyDashboard";
import { CompanyScreenProvider } from "./context/ManageCompany.context";

export function ManageCompanyScreen() {
  return (
    <CompanyScreenProvider>
      <ManageCompanyDashboard />
    </CompanyScreenProvider>
  );
}
