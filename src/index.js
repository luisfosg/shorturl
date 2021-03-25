import app from './app';

app.listen( app.get( 'port' ), () => {
	// eslint-disable-next-line no-console
	console.log( `\n Servidor Listo en el puerto: ${ app.get( 'port' ) }` );
} );
