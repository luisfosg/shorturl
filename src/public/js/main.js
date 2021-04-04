// @ts-nocheck

const check = document.getElementById( 'watch' );

check.addEventListener( 'change', hideOrShowPassword );

function hideOrShowPassword() {
	const password = document.getElementById( 'passwordUrl' );

	if ( check.checked == false ) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}
};

const closed = document.getElementById( 'closee' );

if ( closed ) {
	closed.addEventListener( 'click', closeAlert );
}

function closeAlert() {
	const alerta = document.getElementById( 'alerta' );
	alerta.remove();
}
