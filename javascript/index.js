// ARRAYS DE OBJETOS (Globales)

let usuarios = []
let productos
let carrito

// VAR DOM ELEMENTS

let domNavContainer
let domRegistroTitle
let domLogin
let domLoginForm
let domLoginUser
let domLoginPass
let domLoginBtn
let domBusqueda
let domTextoABuscar
let domBtnBusqueda
let domRegistroForm
let domRegistroUser
let domRegistroPass
let domRegistroBtn
let domSearch
let domSearchForm
let domSearchProduct
let domProductos
let domCatalogoPrueba
let domCloseSession
let domCarrito
let domTotalCompra
let totalCompra = 0
let domBtnFinCompra

/* ================ CLASE USUARIOS ================ */

class Usuario {

    // ATRIBUTOS
    constructor(user, password, admin) {
        this.user = user
        this.password = password
        this.admin = admin // true=admin false=cliente
    }

    // MÉTODOS
    esAdmin = () => usuarios.find((usuario) => usuario.user === this.user).admin

    registrarUsuario = () => {
        usuarios.push(this)
    }
}

/* ================ CLASE PRODUCTO ================ */
class Producto {

    // ATRIBUTOS
    constructor(id, tipoProd, marca, precio, stock, imagen) {
        this.id = id
        this.tipoProd = tipoProd
        this.marca = marca
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    }

    // MÉTODOS

    comprar = (cant) => {
        if (this.validarStock(cant)) {
            this.disminuirStock(cant)
            alert("Compra efectuada con éxito\nMuchas gracias!")
            console.log(`Stock actualizado - Quedan ${this.stock} unidades del producto ${this.tipoProd} ${this.marca}`)
        }
        else {
            alert(`Stock insuficiente - Hay ${this.stock} unidades de ${this.tipoProd} ${this.marca}`)
        }
    }

    validarStock = (cant) => this.stock >= cant

    disminuirStock = (cant) => {
        this.stock = this.stock - cant
    }

    altaCatalogo = () => {
        productos.push(this)
    }
}

/* ================ ELEMENTOS DEL DOM ================ */

function domElementsInit() {
    domNavContainer = document.getElementById("nav-container")
    domRegistroTitle = document.getElementById("registro-titulo")
    domLogin = document.getElementById("login-container")
    domLoginForm = document.getElementById("login-form")
    domLoginUser = document.getElementById("login-user")
    domLoginPass = document.getElementById("login-pass")
    domTextoABuscar = document.getElementById("texto-a-buscar")
    domBtnBusqueda = document.getElementById("btn-busqueda")
    domRegistroForm = document.getElementById("registro-form")
    domRegistroUser = document.getElementById("registro-user")
    domRegistroPass = document.getElementById("registro-pass")
    domRegistroLoginBtn = document.getElementById("registro-btn")
    domSearch = document.getElementById("search-container")
    domSearchForm = document.getElementById("search-form")
    domSearchProduct = document.getElementById("search-product")
    domProductos = document.getElementById("productos-container")
    domCarrito = document.getElementById("carrito-container")
    domBtnFinCompra = document.getElementById("btn-fin-compra")
    domTotalCompra = document.getElementById("carrito-total")
    domCatalogoPrueba = document.getElementById("catalogo-prueba")
    domCloseSession = document.getElementById("close-session")
}

/* ================ EVENTOS DEL DOM ================ */


function eventoLogin() {
    domLoginForm?.addEventListener("submit", gestionarLogin) // Al cambiar de HTML hay que verificar si el evento existe, sino da error
}

function eventoCargaCatalogoPrueba() {
    domCatalogoPrueba?.addEventListener("click", cargarCatalogoPrueba)
}

function eventoSearch() {
    domSearchForm?.addEventListener("submit", searchProduct)
}

function eventoTotalCompra() {
    domBtnFinCompra?.addEventListener("click", finalizarCompra)
}

function eventoRegistroUsuario() {
    domRegistroForm?.addEventListener("submit", gestionarAlta)
}

function eventoCloseSession() {
    domCloseSession?.addEventListener("click", cerrarSesion)
}

/* ================ DECLARACIÓN DE FUNCIONES ================ */

function gestionarLogin(event) {
    event.preventDefault()
    let objectUser = new Usuario(domLoginUser.value, domLoginPass.value, false)
    domLoginForm.reset();
    if (validarLogin(objectUser)) {
        domLogin.hidden = true
        domNavContainer.hidden = false
        domCloseSession.innerText += `${objectUser.user} (Salir)`
        domSearch.hidden = false
        carrito = importarStorage("carrito") || []
        // Regenero objetos de catálogo con el array de productos importado de LS
        cargarCatalogoImportado(importarStorage("catalogo") || [])
        mostrarCarrito()
        !objectUser.esAdmin() ? mostrarProductos(productos, "client") : mostrarProductos(productos,"admin")
    }
    else {
        alert("Login fallido - Usuario o contraseña incorrectos")
        domSearch.hidden = true
        domNavContainer.hidden = true
    }
}

// Aplicando desestructuración en parámetros del objeto Usuario
validarLogin = ({user, password}) => usuarios.some((usuario) => (usuario.user === user && usuario.password === password))

function searchProduct(event) {
    event.preventDefault()
    let searchProd = domSearchProduct.value
    let listProducts = productos.filter((prod) => prod.tipoProd.toLowerCase().includes(searchProd.toLowerCase()))
    searchProd == "" ? alert("Debe ingresar un producto a buscar") : mostrarProductos(listProducts,"client")
    domSearchForm.reset()
}

function gestionarAlta(event) {
    event.preventDefault()
    domRegistroTitle.innerHTML = ""
    let objectUser = new Usuario(domRegistroUser.value, domRegistroPass.value, false)
    domRegistroForm.reset();
    if (!usuarioExistente(objectUser.user)) {
        objectUser.registrarUsuario()
        domRegistroTitle.innerHTML += `El usuario ${objectUser.user} se ha registrado exitosamente!`
        console.log(usuarios)
    }
    else {
        domRegistroTitle.innerHTML += `Alta fallida - El usuario que intenta registrar ya existe`
    }
}

usuarioExistente = (userAlta) => usuarios.some((usuario) => usuario.user === userAlta)

productoExistente = (tipoProdAlta, marcaAlta) => productos.some((producto) => producto.tipoProd === tipoProdAlta && producto.marca === marcaAlta)

function mostrarProductos(listProducts, targetActions) {
    domProductos.innerHTML = ""  // Evita carga repetida de catálogo ante más de un despliegue de de compra

    listProducts.forEach((producto) => {
        let domCard = document.createElement("div")
        domCard.className = "producto-card"
        domCard.id = "producto-card-${producto.id}"
        domCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.tipoProd}" class="producto-img">
            <div class="producto__info">
                <h3>Producto: ${producto.tipoProd} - ${producto.marca}</h3>
                <p>Precio: ${producto.precio} - Disponibles: ${producto.stock}</p>
            </div>
            <div class="producto__compra">
                ${actionButtons(targetActions, producto.id)}
            </div>
            `
        domProductos.append(domCard)

        let domBtnAltaCarrito = document.getElementById(`agregar-carrito-${producto.id}`)
        let domCantAComprar = document.getElementById(`cant-carrito-${producto.id}`)
        domBtnAltaCarrito?.addEventListener("click", () => {
            enviarACarrito(producto, domCantAComprar.value)
            domCantAComprar.value = ""
        })
    })
}

function actionButtons (target, idProd) {
    const actions = {
        "admin": `<button id="modificar-prod-${idProd}" class="btn modificar-prod-btn">Modificar</button>
                  <button id="eliminar-prod-${idProd}" class="btn eliminar-prod-btn">Eliminar</button>`,
        "client": `<input type="number" min="0" max="50" class="cant-producto" id="cant-carrito-${idProd}">
                   <button type="submit" id="agregar-carrito-${idProd}" class="btn agregar-carrito-btn">Agregar al carrito</button>`,
        "": ""  //! En algun momento tengo que sacar esto
    }
    return actions[target]
}

function enviarACarrito({id, stock}, cantSolicitada) {
    const cantCompra = parseInt(cantSolicitada)
    !validarRepetido(id) ? altaCarrito(id, stock, cantCompra) : agregarRepetidoEnCarrito(id, stock, cantCompra)
    calcularTotalCompra()
}

validarRepetido = (id) => carrito.some((objectCarrito) => objectCarrito.id === id)

function altaCarrito(id, stock, cantSolicitada) {
    if (cantSolicitada <= stock) {
        let objectCarrito = {
            id: id,
            cant: cantSolicitada
        }
        carrito.push(objectCarrito)
        enviarAStorage(carrito, "carrito")
        mostrarCarrito()
    }
    else {
        alert(`No disponemos de la cantidad solicitada, puede comprar un máximo de ${stock} unidades`)
    }
}

function agregarRepetidoEnCarrito(id, stock, nuevaCantSolicitada) {
    const idsCarrito = carrito.map((objectCarrito) => objectCarrito.id)
    const posicionRepetido = idsCarrito.indexOf(id)
    const acumCantSolicitada = carrito[posicionRepetido].cant + nuevaCantSolicitada
    if (acumCantSolicitada <= stock) {
        carrito[posicionRepetido].cant = acumCantSolicitada
        enviarAStorage(carrito, "carrito")
        mostrarCarrito()
    }
    else {
        alert(`No disponemos de la cantidad solicitada, puede comprar un máximo de ${stock} unidades`)
    }
}

function enviarAStorage(objeto, nombre) {
    const objetoJSON = JSON.stringify(objeto)
    localStorage.setItem(nombre, objetoJSON)
}

function importarStorage(nombre) {
    return JSON.parse(localStorage.getItem(nombre))
}

function cargarCatalogoImportado(productosImportados) {
    productos = []
    productosImportados.forEach(({id, tipoProd, marca, precio, stock, imagen}) => productos.push(new Producto(id, tipoProd, marca, precio, stock, imagen)))
}

/* El carrito guarda únicamente el id y la cantidad a comprar por el usuario
   No guardo el producto completo porque ocuparía más espacio en memoria en vano, con sólo el id, puedo rearmar el producto */

function mostrarCarrito() {   //Obtengo los atributos de los productos del catálogo que se encuentran en el carrito
    domCarrito.innerHTML = ""
    totalCompra = 0
    carrito.forEach(({id, cant}) => {
        let prodCatalogo = productos.find((prod) => prod.id === id)
        let domItemCarrito = document.createElement("div")
        domItemCarrito.className = "producto-card"
        domItemCarrito.id = `item-carrito-${id}`
        domItemCarrito.innerHTML = `
        <img src="${prodCatalogo.imagen}" alt="${prodCatalogo.tipoProd}" class="producto-img">
        <div class="producto__info">
        <h3>Producto: ${prodCatalogo.tipoProd} - ${prodCatalogo.marca}</h3>
        <p>Precio unitario: ${prodCatalogo.precio} - Cantidad a comprar: ${cant}</p>
        <h4>Subtotal: ${prodCatalogo.precio * cant}</h4>
        </div>
        `
        domCarrito.append(domItemCarrito)
        totalCompra += prodCatalogo.precio * cant
    })
}

function finalizarCompra() {
    domTotalCompra.innerText = "Importe Total Compra: "
    // alertar("Compra exitosa", "Muchas gracias por elegirnos", "success")
    actualizarStockCatalogo()
    vaciarCarrito()
    mostrarProductos(productos, "client")
    mostrarCarrito()
}

// function alertar(titulo, msjSecundario, icono) {
//     console.log(`Compra exitosa, ${titulo}, ${msjSecundario}, ${icono}`)
//     Swal.fire(
//         titulo,
//         msjSecundario,
//         icono
//     )
// }

function calcularTotalCompra() {
    domTotalCompra.innerText = `Importe Total Compra: $${totalCompra}`
}

function actualizarStockCatalogo() {
    carrito.forEach(({id, cant}) => {
        let prodCatalogo = productos.find((prod) => prod.id === id)
        prodCatalogo.disminuirStock(cant)
    })
    enviarAStorage(productos, "catalogo")
}

function vaciarCarrito() {
    carrito = []
    localStorage.removeItem("carrito")
}

function cargarCatalogoPrueba() {

    productos = []

    productos.push(new Producto(1, "Paleta", "BlackCrown", 60000, 10, "./img/paleta-black.png"))
    productos.push(new Producto(2, "Paleta", "ML10", 50000, 5, "./img/paleta-ml10.png"))
    productos.push(new Producto(3, "Paleta", "Siux", 65000, 15, "./img/paleta-siux.png"))
    productos.push(new Producto(4, "Paleta", "WingPro", 35000, 4, "./img/paleta-wing.png"))
    productos.push(new Producto(5, "Bolso", "Adidas", 25000, 10, "./img/bolso-adidas.jpg"))
    productos.push(new Producto(6, "Mochila", "Nike", 18000, 6, "./img/mochila-nike.jpg"))
    productos.push(new Producto(7, "Muñequeras", "UnderArmour", 1000, 15, "./img/muniequera-under.jpg"))
    productos.push(new Producto(8, "Tubo Pelotas", "Adidas", 2000, 8, "./img/pelotas-adidas.jpg"))
    productos.push(new Producto(9, "Tubo Pelotas", "Prince", 1500, 4, "./img/pelotas-prince.jpg"))

    enviarAStorage(productos, "catalogo")
    mostrarProductos(productos, "client")
}

function cerrarSesion() {
    document.location.reload()
}

/* ================ DECLARACIÓN FUNCIÓN PRINCIPAL ================ */

function main() {

    // GENERACIÓN DE USUARIOS
    usuarios.push(new Usuario("admin", "1234", true))
    usuarios.push(new Usuario("maxi", "maxizero", false))
    usuarios.push(new Usuario("a", "a", false))

    domElementsInit()
    eventoLogin()
    eventoCargaCatalogoPrueba()
    eventoSearch()
    eventoTotalCompra()
    eventoRegistroUsuario()
    eventoCloseSession()
}

/* ================ LLAMADO FUNCIÓN PRINCIPAL ================ */

main()