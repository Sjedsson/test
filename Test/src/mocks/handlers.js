import { http as mockHttp, HttpResponse as MockHttpResponse } from "msw";

const bookingDetailsMock = {
  when: "2024-06-06T12:00",
  lanes: "1",
  people: "1",
  shoes: ["42"],
  price: 220,
  id: "STR2101YPJD",
  active: true,
};

export const handlers = [
  mockHttp.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/",
    (req) => {
      console.log("Mock API called with:", req.body);
      return MockHttpResponse.json(bookingDetailsMock, { status: 201 });
    }
  ),
];