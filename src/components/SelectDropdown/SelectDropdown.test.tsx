import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import SelectDropdown from ".";

const SelectRender = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  return (
    <SelectDropdown
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      options={[
        { value: "Africa", displayValue: "Africa" },
        { value: "America", displayValue: "America" },
        { value: "Asia", displayValue: "Asia" },
        { value: "Europe", displayValue: "Europe" },
        { value: "Oceania", displayValue: "Oceania" },
      ]}
    />
  );
};

describe("Select Component", () => {
  test("should render select component", async () => {
    render(<SelectRender />);

    expect(await screen.findByTestId("select-container")).toBeInTheDocument();
  });

  test("should render select field and expand arrow", async () => {
    render(<SelectRender />);

    expect(await screen.findByTestId(/select-field/i)).toBeInTheDocument();
    expect(await screen.findByAltText(/expand/i)).toBeInTheDocument();
  });

  test("should display dropdown after clicking on expand arrow", async () => {
    render(<SelectRender />);

    // fireEvent.click(screen.getByAltText(/expand/i));
    userEvent.click(screen.getByAltText(/expand/i));

    expect(await screen.findByTestId(/options-box/i)).toBeInTheDocument();
    expect((await screen.findAllByRole(/option/i)).length).toBe(5);
  });

  test("should select an option, change the select field content and close the dropdown", async () => {
    render(<SelectRender />);

    // fireEvent.click(screen.getByAltText(/expand/i));
    userEvent.click(screen.getByAltText(/expand/i));

    // fireEvent.click(screen.getByRole(/option/i, { name: "Asia" }));
    userEvent.click(screen.getByRole(/option/i, { name: "Asia" }));

    expect((await screen.findAllByText(/Asia/i)).length).toBe(2);

    expect(await screen.findByTestId(/options-box/i)).toHaveStyle(
      "max-height: 0"
    );
  });

  test("should disappear dropdown after clicking outside", async () => {
    render(<SelectRender />);
    // fireEvent.click(screen.getByAltText(/expand/i));
    userEvent.click(screen.getByAltText(/expand/i));

    // dropdown should disappear even if clicked inside dropdown or dropdown field

    // fireEvent.mouseDown(document.body);
    userEvent.click(document.body);

    expect(await screen.findByTestId(/options-box/i)).toHaveStyle(
      "max-height: 0"
    );
  });
});
