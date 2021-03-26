/** La Función Home, Renderiza la pagina principal de la aplicación
 * @type {function}
 * @param {Object} _req - "request" de la ruta
 * @param {Object} res - "response" de la ruta
 * @param {function} res.render - función para renderizar el html
*/

export const home = async ( _req, res ) => {
	res.render( 'home' );
};
