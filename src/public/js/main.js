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
		const title = buttonDelete[i].getAttribute("text");
		buttonDelete[i].addEventListener( 'click', function(){ viewAlert( id, title ) } );
	}
}

function viewAlert( id, title ) {
	const nickDelete = document.getElementById( 'nickUser' );
	const passwordDelete = document.getElementById( 'passwordUser' );

	let data = {
		'nick': nickDelete.value,
		'password': passwordDelete.value
	}

	Swal.fire({
		title: 'Delete',
		icon: 'warning',
		html:
		`¿ You Want to delete the url ${ title } ?`,
		showDenyButton: true,
		showCancelButton: true,
		showConfirmButton: false,
		denyButtonText: `yes, remove`,
		cancelButtonText: `Cancel`
	}).then((result) => {
		if (result.isDenied) {
			fetch( `/delete/${ id }`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body:JSON.stringify(data)
			}).then(_res => {
				location.reload();
			})
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
		title: `${title} copied correctly`,
		showConfirmButton: false,
		timer: 1500
	})
}

/* ======================================================================== */
const sendMsg = document.getElementById('message');

if( sendMsg ) {
	const msg = sendMsg.getAttribute('text');
	Swal.fire({
		title: msg,
		timer: 1500
	})

	window.history.pushState(null, "", "edited")
}
