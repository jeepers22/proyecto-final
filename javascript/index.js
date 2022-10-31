// ARRAYS DE OBJETOS (Globales)

let usuarios = []
let productos
let carrito

// VARIABLES LOCALES

let usuarioLogueado
let target

// VARs DOM ELEMENTS
let domNavContainer
let domRegistroTitle
let domLoginBtn
let domAltaBtn
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
let domCloseSession
let domCarritoGeneral
let domCarritoIcon
let domCarrito
let domTotalCompra
let totalCompra = 0
let domBtnFinCompra

// VARs DOM MODALES

// MODAL LOGIN
let domLoginModal
let domCerrarLoginModal
let modalLogin
let domLoginForm
let domLoginUser
let domLoginPass

// MODAL ALTA PRODUCTO
let domAltaModal
let modalAlta
let domCerrarAltaModal
let domAltaTipoProd
let domAltaMarca
let domAltaPrecio
let domAltaStock
let domAltaImagen

// MODAL MODIFICAR PRODUCTO
let domModificarModal
let domCerrarModificarModal
let modalModificar
let domAltaForm
let domModificarTipoProd
let domModificarMarca
let domModificarPrecio
let domModificarStock
let domModificarImagen

/* ================ CLASE USUARIOS ================ */

class Usuario {

    // ATRIBUTOS
    constructor(id, user, password, admin) {
        this.id = id
        this.user = user
        this.password = password
        this.admin = admin // true=admin false=cliente
    }

    // MÉTODOS
    asignarTarget = () => this.admin ? "admin" : "client"

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

    disminuirStock = (cant) => {
        this.stock = this.stock - cant
    }

}

/* ================ ELEMENTOS DEL DOM ================ */

function domElementsInit() {

    domNavContainer = document.getElementById("nav-container")
    domRegistroTitle = document.getElementById("registro-titulo")
    domLoginBtn = document.getElementById("login-icon")
    domLoginModal = document.getElementById("login-modal")
    modalLogin = new bootstrap.Modal(domLoginModal)
    domLoginForm = document.getElementById("login-form")
    domLoginUser = document.getElementById("login-user")
    domLoginPass = document.getElementById("login-pass")
    domCerrarLoginModal = document.getElementById("btnCerrarModalLogin")
    domModificarModal = document.getElementById("modificar-prod-modal")
    modalModificar = new bootstrap.Modal(domModificarModal)
    domModificarTipoProd = document.getElementById("modificar-tipoProd")
    domModificarMarca = document.getElementById("modificar-marca")
    domModificarPrecio = document.getElementById("modificar-precio")
    domModificarStock = document.getElementById("modificar-stock")
    domModificarImagen = document.getElementById("modificar-imagen")
    domCerrarModificarModal = document.getElementById("btnCerrarModalModificarProducto")
    domAltaBtn = document.getElementById("create-icon")
    domAltaModal = document.getElementById("alta-prod-modal")
    modalAlta = new bootstrap.Modal(domAltaModal)
    domAltaForm = document.getElementById("alta-prod-form")
    domAltaTipoProd = document.getElementById("alta-tipoProducto")
    domAltaMarca = document.getElementById("alta-marca")
    domAltaPrecio = document.getElementById("alta-precio")
    domAltaStock = document.getElementById("alta-stock")
    domAltaImagen = document.getElementById("alta-imagen")
    domCerrarAltaModal = document.getElementById("btnCerrarModalAltaProducto")
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
    domCarritoIcon = document.getElementById("carrito-icon")
    domCarritoGeneral = document.getElementById("carrito-general")
    domCarrito = document.getElementById("carrito-container")
    domBtnFinCompra = document.getElementById("btn-fin-compra")
    domTotalCompra = document.getElementById("carrito-total")
    domCloseSession = document.getElementById("close-session")

}

/* ================ EVENTOS DEL DOM ================ */

function eventoModalLogin() {
    domLoginBtn?.addEventListener("click", abrirModalLogin)
}

function eventoCerrarModal() {
    domCerrarLoginModal?.addEventListener("click", cerrarModalLogin)
}

function eventoLogin() {
    domLoginForm?.addEventListener("submit", gestionarLogin)
}

function eventoModalAlta() {
    domAltaBtn?.addEventListener("click", abrirModalAlta)
}

function eventoCerrarModalAltaProducto() {
    domCerrarAltaModal?.addEventListener("click", cerrarModalAltaProducto)
}

function eventoAltaProducto() {
    domAltaForm?.addEventListener("submit", gestionarAltaProducto)
}

function eventoCerrarModalModificarProducto() {
    domCerrarModificarModal?.addEventListener("click", cerrarModalModificarProducto)
}

function eventoSearch() {
    domSearchForm?.addEventListener("submit", searchProduct)
}

function eventoTotalCompra() {
    domBtnFinCompra?.addEventListener("click", finalizarCompra)
}

function eventoRegistroUsuario() {
    domRegistroForm?.addEventListener("submit", gestionarAltaUsuario)
}

function eventoCloseSession() {
    domCloseSession?.addEventListener("click", cerrarSesion)
}

function domEventsInit() {
    eventoModalLogin()
    eventoCerrarModal()
    eventoLogin()
    eventoModalAlta()
    eventoCerrarModalAltaProducto()
    eventoAltaProducto()
    eventoCerrarModalModificarProducto()
    eventoSearch()
    eventoTotalCompra()
    eventoRegistroUsuario()
    eventoCloseSession()
}

/* ================ DECLARACIÓN DE FUNCIONES ================ */

function abrirModalLogin() {
    modalLogin.show()

}

function cerrarModalLogin() {
    modalLogin.hide()
}

function abrirModalAlta() {
    modalAlta.show()
}

function cerrarModalAltaProducto() {
    modalAlta.hide()
}

function cerrarModalModificarProducto() {
    modalModificar.hide()
}

function gestionarLogin(event) {
    event.preventDefault()
    modalLogin.hide()
    // El id se autogenera de forma incremental desde mockAPI
    // usuarioLogueado = new Usuario("", domLoginUser.value, domLoginPass.value, "")
    const userIngresado = domLoginUser.value
    const passwordIngresado = domLoginPass.value
    domLoginForm.reset()
    if (validarLogin(userIngresado, passwordIngresado)) {
        domCloseSession.innerText += `${userIngresado} (Salir)`
        usuarioLogueado = usuarios.find((usuario) => usuario.user === userIngresado && usuario.password === passwordIngresado)
        target = usuarioLogueado.asignarTarget()
        mostrarElementos()
    }
    else {
        alert("Login fallido - Usuario o contraseña incorrectos")
        domSearch.hidden = true
        domNavContainer.hidden = true
    }
}

// Aplicando desestructuración en parámetros del objeto Usuario
validarLogin = (user, password) => usuarios.some((usuario) => (usuario.user === user && usuario.password === password))

function mostrarElementos() {
    domLoginBtn.hidden = true
    domNavContainer.hidden = false
    domSearch.hidden = false
    importarCatalogoMockAPI()
    switch (target) {
        case "client":
            domCarritoIcon.hidden = false
            // domCarritoGeneral.hidden = false
            carrito = importarStorage(usuarioLogueado.user) || []
            break
        case "admin":
            domAltaBtn.hidden = false
            break
        default:
            console.log("Se ingresó un target inexistente")
    }
}

function mostrarProductos(listProducts) {
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
                ${actionButtons(producto.id)}
            </div>
            `
        domProductos.append(domCard)

        // Acciones para enviar productos al carrito (Clientes)
        let domBtnAltaCarrito = document.getElementById(`agregar-carrito-${producto.id}`)
        let domCantAComprar = document.getElementById(`cant-carrito-${producto.id}`)
        domBtnAltaCarrito?.addEventListener("click", () => {
            enviarACarrito(producto, domCantAComprar.value)
            domCantAComprar.value = ""
        })

        // UPDATE producto (Administador)
        let domModificarProducto = document.getElementById(`modificar-prod-${producto.id}`)
        domModificarProducto?.addEventListener("click", () => {
            modificarProducto(producto)
        })

        // DELETE producto (Administrador)
        let domEliminarProducto = document.getElementById(`eliminar-prod-${producto.id}`)
        domEliminarProducto?.addEventListener("click", () =>{
            eliminarProducto(producto)
        })
    })
}

function actionButtons(idProd) {
    const actions = {
        "admin": `<button id="modificar-prod-${idProd}" class="btn btn-primary modificar-prod-btn">Modificar</button>
                  <button id="eliminar-prod-${idProd}" class="btn btn-primary  eliminar-prod-btn">Eliminar</button>`,
        "client": `<input type="number" min="0" max="50" class="cant-producto" id="cant-carrito-${idProd}">
                   <button type="submit" id="agregar-carrito-${idProd}" class="btn btn-primary agregar-carrito-btn">Agregar al carrito</button>`,
        "": ""  //! En algun momento tengo que sacar esto
    }
    return actions[target]
}

function searchProduct(event) {
    event.preventDefault()
    let searchProd = domSearchProduct.value
    const productosABuscar = productos.filter((prod) => prod.tipoProd.toLowerCase().includes(searchProd.toLowerCase()))
    searchProd == "" ? alert("Debe ingresar un producto a buscar") : confirmarBusqueda(productosABuscar)
    domSearchForm.reset()
}

function confirmarBusqueda(productosABuscar) {
    mostrarProductos(productosABuscar)
    let dombtnReiniciarBusqueda = document.getElementById("btnReiniciarBusqueda")
    dombtnReiniciarBusqueda.hidden = false
    dombtnReiniciarBusqueda.addEventListener("click", () => {
        mostrarProductos(productos)
        dombtnReiniciarBusqueda.hidden = true
    })
}

function enviarACarrito({id, stock}, cantSolicitada) {
    const cantCompra = parseInt(cantSolicitada)
    !validarRepetido(id) ? altaCarrito(id, stock, cantCompra) : agregarRepetidoEnCarrito(id, stock, cantCompra)
}

function gestionarAltaProducto(event) {
    event.preventDefault()
    // El id se autogenera de forma incremental desde mockAPI
    const nuevoProducto = new Producto("", domAltaTipoProd.value, domAltaMarca.value, parseFloat(domAltaPrecio.value), parseInt(domAltaStock.value), domAltaImagen.value)
    if (!validarIngresoAtributos(nuevoProducto)) {
        mostrarModalConValores("alta", nuevoProducto)
    } else {
        confirmarAltaProducto(nuevoProducto)
    }
}

function modificarProducto(producto) {
    mostrarModalConValores("modificar", producto)
    let domUpdateForm = document.getElementById("modificar-prod-form")
    domUpdateForm?.addEventListener("submit", (event) => {
        event.preventDefault()
        const nuevoProducto = new Producto(producto.id, domModificarTipoProd.value, domModificarMarca.value, parseFloat(domModificarPrecio.value), parseInt(domModificarStock.value), domModificarImagen.value)
        if (!validarIngresoAtributos(nuevoProducto)) {
            mostrarModalConValores("modificar", producto)
        } else {
            validarSiHayCambios(producto, nuevoProducto) ? confirmarCambioProducto(nuevoProducto) : mostrarAlert("Ingreso fallido", "No ha modificado ningún valor", "warning")
        }
    })
}

function mostrarModalConValores(modal, {tipoProd, marca, precio, stock, imagen}) {
    switch (modal) {
        case "alta":
            modalAlta.show()
            domAltaTipoProd.value = tipoProd
            domAltaMarca.value = marca
            domAltaPrecio.value = precio
            domAltaStock.value = stock
            domAltaImagen.value = imagen
            break
        case "modificar":
            modalModificar.show()
            domModificarTipoProd.value = tipoProd
            domModificarMarca.value = marca
            domModificarPrecio.value = precio
            domModificarStock.value = stock
            domModificarImagen.value = imagen
            break
        default:
            console.log("El modal a desplegar no existe")
    }
}

validarSiHayCambios = ({tipoProd, marca, precio, stock, imagen}, nuevoProducto) => (tipoProd !== nuevoProducto.tipoProd || marca !== nuevoProducto.marca || precio !== nuevoProducto.precio || stock !== nuevoProducto.stock || imagen !== nuevoProducto.imagen)

function validarIngresoAtributos({precio, stock}) {
    if  (precio <= 0) {
        mostrarAlert("Ingreso inválido", "El precio debe ser mayor a 0", "warning")
        return false
    } else if (stock < 0) {
        mostrarAlert("Ingreso inválido", "El stock debe ser mayor o igual a 0", "warning")
        return false
    } else {
        return true
    }
}

function confirmarAltaProducto(producto){
    registrarProductoMockAPI(producto)
    mostrarAlert("Alta exitosa", "Se ha registrado el nuevo producto", "success")
    domAltaForm.reset()
    modalAlta.hide()
}

function confirmarCambioProducto(nuevoProducto) {
    modificarProductoMockAPI(nuevoProducto)
    mostrarAlert("Actualización exitosa", "Se ha modificado el producto seleccionado", "success")
    modalModificar.hide()
}

function eliminarProducto(producto) {
    eliminarProductoMockAPI(producto.id)
    mostrarAlert("Baja exitosa", "Se ha eliminado del catálogo el producto seleccionado", "success")
}

validarRepetido = (id) => carrito.some((objectCarrito) => objectCarrito.id === id)

function altaCarrito(id, stock, cantSolicitada) {
    if (cantSolicitada <= stock) {
        let objectCarrito = {
            id: id,
            cant: cantSolicitada
        }
        carrito.push(objectCarrito)
        enviarAStorage(carrito, usuarioLogueado.user)
        mostrarCarrito()
        mostrarToast("Producto agregado al carrito")
    }
    else {
        // Si el stock es 0 sale por false
        stock ? mostrarAlert("Stock insuficiente", `Disponemos de un máximo de ${stock} unidades`, "warning") : 
        mostrarAlert("Sin stock", `No quedan más unidades del producto solicitado`, "warning")
    }
}

function agregarRepetidoEnCarrito(id, stock, nuevaCantSolicitada) {
    const idsCarrito = carrito.map((objectCarrito) => objectCarrito.id)
    const posicionRepetido = idsCarrito.indexOf(id)
    const acumCantSolicitada = carrito[posicionRepetido].cant + nuevaCantSolicitada
    if (acumCantSolicitada <= stock) {
        carrito[posicionRepetido].cant = acumCantSolicitada
        enviarAStorage(carrito, usuarioLogueado.user)
        mostrarCarrito()
        mostrarToast("Producto agregado al carrito")
    }
    else {
        // Si el stock es 0 sale por false
        stock ? mostrarAlert("Stock insuficiente", `Disponemos de un máximo de ${stock} unidades`, "warning") : 
        mostrarAlert("Sin stock", `No quedan más unidades del producto solicitado`, "warning")
    }
}

function mostrarToast(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

function enviarAStorage(objeto, nombre) {
    const objetoJSON = JSON.stringify(objeto)
    localStorage.setItem(nombre, objetoJSON)
}

function importarStorage(nombre) {
    return JSON.parse(localStorage.getItem(nombre))
}

function cargarCatalogoMockAPI(productosImportados) {
    productos = []
    productosImportados.forEach(({id, tipoProd, marca, precio, stock, imagen}) => productos.push(new Producto(id, tipoProd, marca, precio, stock, imagen)))
}

function cargarUsuariosMockAPI(usuariosImportados) {
    usuarios = []
    // ACLARACIÓN: convierto string a booleano, dado que en mockAPI está seleccionado como Boolean, sin embargo veo que lo maneja como String
    usuariosImportados.forEach(({id, user, password, admin}) =>
        admin === "true" ? usuarios.push(new Usuario(id, user, password, true)) : usuarios.push(new Usuario(id, user, password, false))
    )
    console.log(usuarios)
}

/* El carrito guarda únicamente el id y la cantidad a comprar por el usuario
   No guardo el producto completo porque ocuparía más espacio en memoria en vano, con sólo el id, puedo rearmar el producto */

function mostrarCarrito() {   //Obtengo los atributos de los productos del catálogo que se encuentran en el carrito
    domCarrito.innerHTML = ""
    totalCompra = 0
    carrito.forEach((itemCarrito) => {
        let prodCatalogo = productos.find((prod) => prod.id === itemCarrito.id)
        let domItemCarrito = document.createElement("div")
        domItemCarrito.className = "producto-card"
        domItemCarrito.id = `item-carrito-${itemCarrito.id}`
        domItemCarrito.innerHTML = `
        <img src="${prodCatalogo.imagen}" alt="${prodCatalogo.tipoProd}" class="producto-img">
        <div class="producto__info">
        <h3>Producto: ${prodCatalogo.tipoProd} - ${prodCatalogo.marca}</h3>
        <p class="mb-0">Precio unitario: ${prodCatalogo.precio} - Cantidad a comprar: ${itemCarrito.cant}</p>
        <h4>Subtotal: ${prodCatalogo.precio * itemCarrito.cant}</h4>
        </div>
        <div class="producto__compra">
            <button id="eliminar-item-carrito-${itemCarrito.id}" class="btn btn-danger eliminar-prod-btn">Eliminar</button>
        </div>
        `
        domCarrito.append(domItemCarrito)

        // DELETE item carrito (Cliente)
        let domEliminarItemCarrito = document.getElementById(`eliminar-item-carrito-${itemCarrito.id}`)
        domEliminarItemCarrito?.addEventListener("click", () => {
            eliminarItemCarrito(itemCarrito, prodCatalogo.precio)
        })

        totalCompra += prodCatalogo.precio * itemCarrito.cant
    })
    calcularTotalCompra()
}

function eliminarItemCarrito(itemCarrito, precio) {
    const posicionItem = carrito.indexOf(itemCarrito)
    carrito.splice(posicionItem,1)
    carrito.length === 0 ? vaciarCarrito() : enviarAStorage(carrito, usuarioLogueado.user)
    totalCompra -= precio * itemCarrito.cant
    mostrarCarrito()
    calcularTotalCompra()
    mostrarToast("Item eliminado del carrito")
}

function finalizarCompra() {
    domTotalCompra.innerText = "Importe Total Compra: "
    if (carrito.length === 0) {
        mostrarAlert("Compra fallida", "No hay productos seleccionados en el carrito", "warning")
    }
    else {
        actualizarStockCatalogo()
        vaciarCarrito()
        mostrarAlert("Compra exitosa", "Muchas gracias por elegirnos", "success")
    }
}

function mostrarAlert(titulo, msjSecundario, icono) {
    Swal.fire(
        titulo,
        msjSecundario,
        icono
    )
}

function calcularTotalCompra() {
    if (totalCompra !== 0) {
        domTotalCompra.innerText = `Importe Total Compra: $${totalCompra}`
        domCarritoGeneral.hidden = false
    } else {
        domCarritoGeneral.hidden = true
    }
}

function actualizarStockCatalogo() {
    carrito.forEach(({id, cant}) => {
        let prodCatalogo = productos.find((prod) => prod.id === id)
        prodCatalogo.disminuirStock(cant)
        modificarProductoMockAPI(prodCatalogo)
        })
}

function vaciarCarrito() {
    carrito = []
    localStorage.removeItem(usuarioLogueado.user)
    mostrarCarrito()
}

// GET PARA CARGAR CATALOGO DE MOCK API
async function importarCatalogoMockAPI() {
    try {
        const response = await fetch("https://6358ae4ec26aac906f466377.mockapi.io/productos")
        const data = await response.json()
        const catalogoImportadoJSON = [...data]
        cargarCatalogoMockAPI(catalogoImportadoJSON)
        mostrarProductos(productos)
        if (target === "client") {
            mostrarCarrito()
        }
    }
    catch (error) {
        console.log(error)
        mostrarAlert("Atención", "Existen inconvenientes al cargar el catálogo, vuelva a probar más tarde", "warning")
    }
}

// POST MOCK API
async function registrarProductoMockAPI(producto) {
    try {
        const response = await fetch("https://6358ae4ec26aac906f466377.mockapi.io/productos",
        {
            method: "POST",
            body: JSON.stringify(producto),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
        }
        })
        importarCatalogoMockAPI()
    }
    catch (error) {
        console.log(error)
        mostrarAlert("Atención", "Existen inconvenientes para registrar el producto, vuelva a probar más tarde", "warning")
    }
}

// PUT MOCK API
async function modificarProductoMockAPI(producto) {
    try {
        const response = await fetch(`https://6358ae4ec26aac906f466377.mockapi.io/productos/${producto.id}`,
        {
            method: "PUT",
            body: JSON.stringify(producto),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        importarCatalogoMockAPI()
    }
    catch (error) {
        console.log(error)
        mostrarAlert("Atención", "Existen inconvenientes para modificar el producto, vuelva a probar más tarde", "warning")
    }
}

// DELETE MOCK API
async function eliminarProductoMockAPI(idProducto) {
    try {
        const response = await fetch(`https://6358ae4ec26aac906f466377.mockapi.io/productos/${idProducto}`, {
            method: "DELETE",
        })
        importarCatalogoMockAPI()
    }
    catch (error) {
        console.log(error)
        mostrarAlert("Atención", "Existen inconvenientes para eliminar productos, vuelva a probar más tarde", "warning")
    }
}

// GET PARA CARGAR USUARIOS DE MOCK API
async function importarUsuariosMockAPI() {
    try {
        const response = await fetch("https://6358ae4ec26aac906f466377.mockapi.io/usuarios")
        const data = await response.json()
        const usuariosImportadoJSON = [...data]
        cargarUsuariosMockAPI(usuariosImportadoJSON)
    }
    catch (error) {
        console.log(error)
        mostrarAlert("Atención", "Existen inconvenientes para validar sus datos, vuelva a probar más tarde", "warning")
    }
}

function cerrarSesion() {
    document.location.reload()
}

/* ================ DECLARACIÓN FUNCIÓN PRINCIPAL ================ */

function main() {

    importarUsuariosMockAPI()
    domElementsInit()
    domEventsInit()

}

/* ================ LLAMADO FUNCIÓN PRINCIPAL ================ */

main()