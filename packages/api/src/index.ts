import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import storyApi from './routers/story';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/Hello';
import { connectDb } from './configs/connectDb';
import { UserResolver } from './resolvers/users';
import { MyContext } from './utils/types';
import { COOKIE_NAME, ___prod___ } from './utils/constants';
import { StoryResolver } from './resolvers/stories';
import { ReportResolvers } from './resolvers/reports';
import { createUserLoader } from './lib/createUserLoader';

if (!___prod___) {
  dotenv.config();
}

const bootstrap = async () => {
  try {
    const app = express();
    app.set('trust proxy', 1);
    app.use(express.json());
    app.use(
      cors({
        origin: process.env.PUBLIC_URL!,
        credentials: true,
      })
    );
    app.use(
      session({
        store: MongoStore.create({
          mongoUrl: process.env.DATABASE_URL!,
        }),
        name: COOKIE_NAME,
        cookie: {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // ? 1 week
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET!,
        resave: false,
      })
    );
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: [],
            connectSrc: ["'self'"],
            scriptSrc: [
              "'unsafe-inline'",
              "'self'",
              'http://cdn.jsdelivr.net/npm/@apollographql/',
            ],
            styleSrc: [
              "'self'",
              "'unsafe-inline'",
              'http://cdn.jsdelivr.net/npm/@apollographql/',
            ],
            workerSrc: ["'self'", 'blob:'],
            objectSrc: [],
            imgSrc: [
              "'self'",
              'blob:',
              'data:',
              'https://images.unsplash.com/',
              'http://cdn.jsdelivr.net/npm/@apollographql/',
            ],
            fontSrc: ["'self'", 'https://fonts.googleapis.com/'],
          },
        },
      })
    );

    const server = new ApolloServer({
      schema: await buildSchema({
        validate: false,
        resolvers: [
          HelloResolver,
          UserResolver,
          StoryResolver,
          ReportResolvers,
        ],
      }),
      context: ({ req, res }): MyContext => ({
        req,
        res,
        userLoader: createUserLoader(),
      }),
    });

    server.applyMiddleware({
      app,
      cors: {
        origin: process.env.PUBLIC_URL!,
        credentials: true,
      },
    });

    await connectDb();

    app.use('/api', storyApi);

    app.listen({ port: process.env.PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

bootstrap();
