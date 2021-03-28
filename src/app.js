import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import methodOverride from 'method-override';

import './config';
import routes from './routes/index-router';

/** Aplicacion de express
 * @type {Object}
*/

const app = express();

app.set( 'port', process.env.PORT || 3000 );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( morgan( 'dev' ) );
app.use( helmet() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( methodOverride( '_method' ) );

app.use( routes );

export default app;
