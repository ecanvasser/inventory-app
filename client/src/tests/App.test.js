import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inventory from "../components/Inventory";
import fetchMock from "jest-fetch-mock";

test("Inventory API call runs successfully", async () => {
  const mockData = [
    {mockdata: 'test'}
  ];

  fetchMock.mockResponse(() => {
    jest.fn(() => mockData);
  });
  render(<Inventory />);

  expect(
    await screen.queryByText("Something went bad!")
  ).not.toBeInTheDocument();
});
