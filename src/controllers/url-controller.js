/** La Función Home, Renderiza la pagina principal de la aplicación
 * @type {function}
 * @param {Object} _req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const home = async ( _req, res ) => {
	res.render( 'home' );
};

/** La Función Home, Renderiza la solicitud para ingresar la contraseña
 * @type {function}
 * @param {Object} _req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const password = async ( _req, res ) => {
	res.render( 'password' );
};

/** La Función Home, Renderiza la solicitud para ingresar la contraseña
 * @type {function}
 * @param {Object} _req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const pageNotFound = async ( _req, res ) => {
	res.render( 'notFound' );
};
