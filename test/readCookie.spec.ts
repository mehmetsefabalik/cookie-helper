import { readCookie, createCookie } from "../src/index";
import { random } from "faker";
import { ICookieData } from "./interfaces";
import { cookieDataFactory } from "./cookieDataFactory";

const { number } = random;

describe("readCookie", () => {
  const numberOfCookies = number({ min: 1, max: 15 });
  const cookieDataArray: ICookieData[] = Array(numberOfCookies).fill(null).map(() => cookieDataFactory(true));
  for (const { name, value, days } of cookieDataArray) {
    createCookie(name, value, days);
  }

  test("should return value of cookie whose name is passed as parameter", () => {
    // Arrange
    const sampleCookie = cookieDataArray[0];

    // Act
    const value = readCookie(sampleCookie.name);

    // Assert
    expect(value).toBe(sampleCookie.value);
  })

  test("should return null", () => {
    // Arrange

    // Act
    const value = readCookie(number.toString());

    // Assert
    expect(value).toBe(null);
  })

});