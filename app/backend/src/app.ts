import * as express from 'express';
import LoginRouter from './Routes/Login.routes';
import TeamsRouter from './Routes/Teams.routes';
import MatchesRouter from './Routes/Matches.routes';
import ErrorHandler from './middlewares/ErrorHandler';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.RoutesRegister();
    this.ErrorHandler();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private RoutesRegister(): void {
    this.app.use('/login', LoginRouter);
    this.app.use('/teams', TeamsRouter);
    this.app.use('/matches', MatchesRouter);
  }

  private ErrorHandler(): void {
    this.app.use('/', ErrorHandler);
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
