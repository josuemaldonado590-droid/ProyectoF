// =========================================
// ELEMENTOS PRINCIPALES
// =========================================

const inicio =
    document.getElementById("inicio");

const sobresPantalla =
    document.getElementById("sobresPantalla");

const final =
    document.getElementById("final");

const comenzarBtn =
    document.getElementById("comenzarBtn");

const cerrarCarta =
    document.getElementById("cerrarCarta");

const modal =
    document.getElementById("modal");

const contador =
    document.getElementById("contador");

const finalBtn =
    document.getElementById("reiniciarBtn");


// =========================================
// DATOS DE LAS CARTAS
// =========================================
//
// AQUÍ PUEDES CAMBIAR TODO EL TEXTO.
// No necesitas modificar el HTML.
//

const cartas = {

    1: {

        titulo: "Gracias",

        texto: `
Gracias por estos siete meses.

Gracias por cada conversación,
cada risa, cada momento 
y también por cada día complicado
que hemos tenido y lo hemos resuelto.

Gracias simplemente por estar.

Y de todas las cosas que han pasado
estos meses, una de las que más
agradezco es que nuestras historias
se hayan encontrado.
`
    },


    2: {

        titulo: "Un recuerdo",

        texto: `
Hay momentos que quizá para otras
personas serían pequeños o normales,
pero que para mí significan demasiado.

Una conversación inesperada.
Una risa.
Un abrazo.
Una mirada.
Un día cualquiera que terminó siendo
un día que recuerdo con cariño.

No siempre se necesita grandes momentos.

A veces basta con estar juntos
para que un día normal se vuelva
especial.
`
    },


    3: {

        titulo: "Lo que admiro de ti",

        texto: `
Hay muchas cosas que admiro de ti.

Admiro la manera en la que sigues
adelante incluso cuando estás cansada.

Admiro todo lo que intentas hacer
aunque algunas veces las cosas
no salgan como esperabas.

Admiro tu forma de ser, tus pequeños
detalles y esas cosas que quizá tú
no notas pero que yo sí.

Y quiero que sepas que no tienes que
ser perfecta para que yo vea todo
lo bonito que hay en ti.
`
    },


    4: {

        titulo: "Lo que me haces sentir",

        texto: `
Contigo he descubierto que sentirse
querido también puede estar en cosas
muy pequeñas.

En un mensaje.

En saber que hay alguien con quien
puedo compartir una tontería y terminar
riendo.

En un abrazo cuando no hace falta
decir nada.

Me haces sentir acompañado.

Y eso es algo que valoro muchísimo.
`
    },


    5: {

        titulo: "Lo que aprendí",

        texto: `
Estos meses también me han enseñado
cosas.

He aprendido que una relación no se
trata solamente de los días bonitos.

También se trata de escucharnos,
entendernos, tener paciencia y aprender
a estar ahí cuando las cosas no son
perfectas.

He aprendido que querer a alguien
también significa cuidar lo que
construyen juntos.

Y todavía sigo aprendiendo.
`
    },


    6: {

        titulo: "Lo que deseo",

        texto: `
Todavía hay muchas cosas que quiero
vivir contigo.

Más días normales que terminen siendo
recuerdos.

Más lugares.

Más fotografías.

Más conversaciones que duren hasta
que ninguno sepa cómo terminamos
hablando de ese tema.

Más risas.

Más momentos que algún día podamos
recordar y decir:

"¿Te acuerdas de eso?"

No sé exactamente qué nos espera,
pero sí sé que me gustaría seguir
descubriéndolo contigo.
`
    },


    7: {

        titulo: "Para ti",

        texto: `
Llegaste a mi vida de una manera que
quizá ninguno de los dos imaginaba.

Y ahora, siete meses después, puedo
mirar atrás y pensar en todo lo que
hemos vivido.

No sé cuántos capítulos tendrá nuestra
historia.

No sé qué nos traerán los próximos
meses.

Pero sí sé algo:

Me alegra muchísimo tenerte a mi lado.

Gracias por elegirme.

Gracias por dejarme formar parte
de tu vida.

Y gracias por estos siete meses,
Abi.

Esta última carta es solamente
para recordarte algo:

Te Amo muchísimo. ❤️
`
    }

};


// =========================================
// ESTADO
// =========================================

let abiertos = new Set();

let sobreSeleccionado = null;


// =========================================
// BOTÓN INICIAL
// =========================================

comenzarBtn.addEventListener("click", () => {

    inicio.classList.add("oculto");

    sobresPantalla.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================================
// OBTENER TODOS LOS SOBRES
// =========================================

const sobres =
    document.querySelectorAll(".sobre");


// =========================================
// EVENTO PARA CADA SOBRE
// =========================================

sobres.forEach((sobre) => {

    sobre.addEventListener("click", () => {

        const numero =
            Number(sobre.dataset.numero);

        abrirSobre(sobre, numero);

    });

});


// =========================================
// ABRIR SOBRE
// =========================================

function abrirSobre(sobre, numero) {

    sobreSeleccionado = numero;


    // Si ya está abierto, simplemente
    // mostramos nuevamente la carta.

    if (abiertos.has(numero)) {

        mostrarCarta(numero);

        return;
    }


    // Marcar como abierto

    abiertos.add(numero);

    sobre.classList.add("abierto");

    sobre.parentElement.classList.add("abierto");


    actualizarContador();


    // Esperamos a que la animación
    // del sobre avance antes de mostrar
    // la carta.

    setTimeout(() => {

        mostrarCarta(numero);

    }, 850);

}


// =========================================
// MOSTRAR CARTA
// =========================================

function mostrarCarta(numero) {

    const datos =
        cartas[numero];


    document.getElementById(
        "numeroCartaModal"
    ).textContent =
        String(numero).padStart(2, "0");


    document.getElementById(
        "tituloCarta"
    ).textContent =
        datos.titulo;


    document.getElementById(
        "textoCarta"
    ).textContent =
        datos.texto;


    modal.classList.remove("oculto");


    document.body.style.overflow =
        "hidden";

}


// =========================================
// CERRAR CARTA
// =========================================

cerrarCarta.addEventListener("click", cerrarModal);


document.querySelector(".fondo-modal")
    .addEventListener("click", cerrarModal);


function cerrarModal() {

    modal.classList.add("oculto");

    document.body.style.overflow =
        "";

}


// =========================================
// ESC PARA CERRAR
// =========================================

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        cerrarModal();

    }

});


// =========================================
// CONTADOR
// =========================================

function actualizarContador() {

    contador.textContent =
        `${abiertos.size} / 7 abiertos`;


    // Cuando haya abierto los siete

    if (abiertos.size === 7) {

        setTimeout(() => {

            mostrarFinal();

        }, 1000);

    }

}


// =========================================
// MOSTRAR FINAL
// =========================================

function mostrarFinal() {

    cerrarModal();

    sobresPantalla.classList.add("oculto");

    final.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================
// REINICIAR
// =========================================

finalBtn.addEventListener("click", () => {

    final.classList.add("oculto");

    sobresPantalla.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================================
// PREVENIR DOBLE CLIC DURANTE ANIMACIÓN
// =========================================

let ultimaApertura = 0;

sobres.forEach((sobre) => {

    sobre.addEventListener("click", () => {

        const ahora =
            Date.now();

        if (ahora - ultimaApertura < 500) {

            return;

        }

        ultimaApertura = ahora;

    });

});