import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const h1 = screen.getByText("Contact Form");
  expect(h1).toBeDefined();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  const fourChar = "wefg";
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/First Name/i);
  userEvent.type(firstNameInput, fourChar);
  const errorMessage = screen.getByText(
    "Error: firstName must have at least 5 characters."
  );
  expect(errorMessage).toBeDefined();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);
  const errorFirst = screen.getByText(
    "Error: firstName must have at least 5 characters."
  );
  const errorLast = screen.getByText("Error: lastName is a required field.");
  const errorEmail = screen.getByText(
    "Error: email must be a valid email address."
  );
  expect(errorFirst).toBeDefined();
  expect(errorLast).toBeDefined();
  expect(errorEmail).toBeDefined();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = "Potato";
  const lastName = "Mcgee";
  const submitButton = screen.getByRole("button");
  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);

  userEvent.type(firstNameInput, firstName);
  userEvent.type(lastNameInput, lastName);
  userEvent.click(submitButton);

  const errorEmail = screen.getByText(
    "Error: email must be a valid email address."
  );
  expect(errorEmail).toBeDefined();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const invalidEmail = "potato@gojo";
  const emailInput = screen.getByLabelText(/Email/i);
  userEvent.type(emailInput, invalidEmail);
  const errorEmail = screen.getByText(
    "Error: email must be a valid email address."
  );
  expect(errorEmail).toBeDefined();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstName = "Potato";
  const validEmail = "Potato@Spuds.com";
  const firstNameInput = screen.getByLabelText(/First Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const submitButton = screen.getByRole("button");
  userEvent.type(firstNameInput, firstName);
  userEvent.type(emailInput, validEmail);
  userEvent.click(submitButton);
  const errorLast = screen.getByText("Error: lastName is a required field.");
  expect(errorLast).toBeDefined();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstName = "Potato";
  const lastName = "Mcgee";
  const validEmail = "Potato@Spuds.com";
  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const submitButton = screen.getByRole("button");
  userEvent.type(firstNameInput, firstName);
  userEvent.type(lastNameInput, lastName);
  userEvent.type(emailInput, validEmail);
  userEvent.click(submitButton);
  const dataFirst = screen.getByTestId("firstnameDisplay");
  const dataLast = screen.getByTestId("lastnameDisplay");
  const dataEmail = screen.getByTestId("emailDisplay");

  expect(dataFirst).toBeDefined();
  expect(dataLast).toBeDefined();
  expect(dataEmail).toBeDefined();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstName = "Potato";
  const lastName = "Mcgee";
  const validEmail = "Potato@Spuds.com";
  const testMessage = "Boilem Mashem Stickem in a Stew";
  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const messageInput = screen.getByLabelText(/Message/i);
  const submitButton = screen.getByRole("button");
  userEvent.type(firstNameInput, firstName);
  userEvent.type(lastNameInput, lastName);
  userEvent.type(emailInput, validEmail);
  userEvent.type(messageInput, testMessage);
  userEvent.click(submitButton);
  const dataFirst = screen.getByTestId("firstnameDisplay");
  const dataLast = screen.getByTestId("lastnameDisplay");
  const dataEmail = screen.getByTestId("emailDisplay");
  const dataMessage = screen.getByTestId("messageDisplay");
  expect(dataFirst).toBeDefined();
  expect(dataLast).toBeDefined();
  expect(dataEmail).toBeDefined();
  expect(dataMessage).toBeDefined();
});
