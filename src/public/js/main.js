// @ts-nocheck

let check;
check = document.getElementById( 'watch' );

check.addEventListener( 'change', hideOrShowPassword )

function hideOrShowPassword() {
	let password;

	password = document.getElementById( 'passwordUrl' );

	if ( check.checked == false ) {
		password.type = 'text';
	} else {
		password.type = 'password';
	}
};
