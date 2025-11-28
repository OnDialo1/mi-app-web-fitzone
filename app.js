/*************************************************
 *  CONTROL INICIAL – SI HAY sesión entra al menú
 *************************************************/
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("usuario")) cargarApp();
    else mostrarLogin();
});

/*************************************************
 *  MOSTRAR MENÚ PRINCIPAL
 *************************************************/
function cargarApp(){
    // Ocultar login & registro
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";

    // Mostrar la interfaz interior
    document.querySelectorAll(".page").forEach(p=> p.style.display="none");
    document.getElementById("inicio").style.display = "block";

    // Mostrar navegación inferior
    document.querySelector("footer").style.display = "flex";
}

/*************************************************
 *  LOGIN
 *************************************************/
document.getElementById("loginForm").addEventListener("submit",(e)=>{
    e.preventDefault();

    let email = login_email.value;
    let password = login_password.value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let match = usuarios.find(u => u.email===email && u.password===password);

    if(match){
        localStorage.setItem("usuario", email);
        cargarApp();
    }else alert("❌ Usuario o contraseña incorrectos");
});

/*************************************************
 *  REGISTRO
 *************************************************/
document.getElementById("registerForm").addEventListener("submit",(e)=>{
    e.preventDefault();

    let username = reg_username.value;
    let email = reg_email.value;
    let password = reg_password.value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if(usuarios.some(u => u.email===email)) return alert("⚠ Ese correo ya existe");

    usuarios.push({username,email,password});
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✔ Registro exitoso. Inicia sesión.");
    mostrarLogin();
});

/*************************************************
 *  VISTAS LOGIN / REGISTER
 *************************************************/
function mostrarLogin(){
    login.style.display="flex";
    register.style.display="none";
    ocultarInterno();
}
function mostrarRegistro(){
    login.style.display="none";
    register.style.display="flex";
    ocultarInterno();
}
function ocultarInterno(){
    document.querySelectorAll(".page").forEach(p=>p.style.display="none");
    document.querySelector("footer").style.display="none";
}

/*************************************************
 *  NAVEGACIÓN INTERNA
 *************************************************/
function mostrarPagina(id){
    document.querySelectorAll(".page").forEach(p=>p.style.display="none");
    document.getElementById(id).style.display="block";

    document.querySelectorAll("footer button").forEach(b=>b.classList.remove("active"));
    document.getElementById("btn"+id.charAt(0).toUpperCase()+id.slice(1)).classList.add("active");
}

/*************************************************
 *  LOGOUT
 *************************************************/
function logout(){
    localStorage.removeItem("usuario");
    location.reload();
}


/*************************************************
 *  MENÚ DE CATEGORÍAS
 *************************************************/
function toggleCategoria(id){
    const cont = document.getElementById(id);
    cont.style.display = cont.style.display === "block" ? "none" : "block";
}

/*************************************************
 *  CARRITO
 *************************************************/
let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("carrito-lista");
    const total = document.getElementById("total");
    lista.innerHTML = "";

    if (carrito.length === 0) return total.innerText = "Carrito vacío.";

    carrito.forEach((p, i) => {
        lista.innerHTML += `
            <div>
                ${p.nombre} - $${p.precio.toLocaleString()}
                <button onclick="eliminarItem(${i})" style="float:right">❌</button>
            </div>`;
    });

    const totalCompra = carrito.reduce((ac, p) => ac + p.precio, 0);
    total.innerText = `Total: $${totalCompra.toLocaleString()}`;
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

/* Acciones rápidas */
function pedirDirecto(producto){ alert("Orden rápida enviada: " + producto); }
function pagar(){ if(carrito.length === 0) return alert("Agrega productos primero"); alert("Compra realizada ✔"); }
function pedirRappi(){ window.open("https://rappi.com","_blank"); }
function pedirUber(){ window.open("https://ubereats.com","_blank"); }

/*************************************************
 *  GOOGLE MAPS
 *************************************************/
let map;
function initMap(){
    map = new google.maps.Map(document.getElementById("map"),{
        center:{ lat:4.711, lng:-74.072 },
        zoom:13
    });
}

/*************************************************
 *  BOTONES CAMBIO DE FORMULARIO
 *************************************************/
function showRegister(){ mostrarRegistro(); }
function showLogin(){ mostrarLogin(); }