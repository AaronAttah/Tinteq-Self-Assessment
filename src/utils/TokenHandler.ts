import { Request, Response } from "express";

export const tokenHandler = async (req: Request) => {
  const authToken = req.headers.authorization;

  let token;
  if (authToken) {
    const tokenArray = authToken.split(" ");
    token = tokenArray.length > 1 ? tokenArray[1] : null;
  }

  return token;
};
