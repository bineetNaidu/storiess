import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
// import { ObjectID } from 'mongodb';

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string };
  };
  res: Response;
};
