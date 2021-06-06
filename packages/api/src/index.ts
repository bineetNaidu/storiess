import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/Hello';
import { connectDb } from './configs/connectDb';
import { UserResolver } from './resolvers/users';
import { MyContext } from './utils/types';

dotenv.config();

const bootstrap = async () => {
  try {
    const app = express();

    app.set('trust proxy', 1);
    app.use(express.json());
    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );

    const server = new ApolloServer({
      schema: await buildSchema({
        validate: false,
        resolvers: [HelloResolver, UserResolver],
      }),
      context: ({ req, res }): MyContext => ({ req, res }),
    });

    server.applyMiddleware({
      app,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    });

    await connectDb();

    app.listen({ port: 4000 }, () => {
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
