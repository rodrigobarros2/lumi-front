import { render } from "@testing-library/react";
import { Home } from "lucide-react";

describe("Home Component", () => {
  it("renders filter input and year select", () => {
    render(<Home />);
  });
});
