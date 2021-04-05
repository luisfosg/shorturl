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

/* ======================================================================== */

const closed = document.getElementById( 'closee' );

if ( closed ) {
	closed.addEventListener( 'click', closeAlert );
}

function closeAlert() {
	const alerta = document.getElementById( 'alerta' );
	alerta.remove();
}

/* ======================================================================== */

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
/* ======================================================================== */

const copyText = document.getElementsByClassName( 'copiarTexto' );
if ( copyText ) {
	for (let i = 0; i < copyText.length; i++) {
		const text = copyText[i].getAttribute("value");
		const title = copyText[i].getAttribute("text");
		copyText[i].addEventListener( 'click', function(){  copyTheText( title, text ) } );
	}
}

function copyTheText(title, text) {
	var aux = document.createElement("input");
	aux.setAttribute("value", text);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);

	Swal.fire({
		icon: 'success',
		title: `${title} copiado correctamente`,
		showConfirmButton: false,
		timer: 1500
	})
}
