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

const buttonDelete = document.getElementsByClassName( 'alerta' );
if ( buttonDelete ) {
	for (let i = 0; i < buttonDelete.length; i++) {
		const id = buttonDelete[i].getAttribute("value");
		buttonDelete[i].addEventListener( 'click', function(){ viewAlert( id ) } );
	}
}

function viewAlert( id ) {
	Swal.fire({
		title: 'Eliminar',
		icon: 'warning',
		html:
		  '¿ Desea Eliminar la Url Seleccionada ?',
		showDenyButton: true,
		showCancelButton: true,
		showConfirmButton: false,
		denyButtonText: `Si, Eliminar`,
		cancelButtonText: `Cancelar`
	}).then((result) => {
		if (result.isDenied) {
			window.location.href = `/delete/${ id }`;
		}
	})
}
