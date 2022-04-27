import { ManageCategoryDashboard } from "./components/ManageCategoryDashboard";
import { CategoryScreenProvider } from "./context/ManageCategory.context";

export function ManageCategoryScreen() {
  return (
    <CategoryScreenProvider>
      <ManageCategoryDashboard />
    </CategoryScreenProvider>
  );
}
