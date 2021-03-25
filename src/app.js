import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';

import './config';
import routes from './routes/index-router';

const app = express();

app.set( 'port', process.env.PORT || 3000 );

app.use( morgan( 'dev' ) );
app.use( helmet() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( routes );

export default app;
