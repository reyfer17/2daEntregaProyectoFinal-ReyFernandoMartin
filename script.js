class Producto {
    constructor(codigo, nombre, precio, detalle, imagen){
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.detalle = detalle
        this.imagen = imagen
    }
    totalizar(pedido){
        let totalPedido = 0
        pedido.forEach (elemento =>{
            totalPedido += elemento.precio
        })
        return totalPedido
    }
}

const pochocloGrande = new Producto (1, "Pochoclo Grande", 1000, "dulce, en balde", 'images/pochocloGrande.jpg')
const pochocloMediano = new Producto (2, "Pochoclo Mediano", 800, "dulce, en caja", 'images/pochocloMediano.jpg')
const pochocloChico = new Producto (3, "Pochoclo Chico", 600, "dulce, en bolsita", 'images/pochocloChico.gif')
const gaseosaGrande = new Producto (4, "Gaseosa Grande", 500, "vaso x 950ml", 'images/gaseosaGrande.jpg')
const gaseosaChica = new Producto (5, "Gaseosa Chica", 400, "botella x 500ml", 'images/gaseosaChica.jpg')
const agua = new Producto (6, "Agua", 300, "botella x 500ml", 'images/agua.png')
const chocolate = new Producto (7, "Chocolate", 800, "con leche x 300g", 'images/chocolate.jpg')

const productos = [pochocloGrande, pochocloMediano, pochocloChico, gaseosaGrande, gaseosaChica, agua, chocolate]
//const guardarProductos = (clave, valor) =>{localStorage.setItem(clave, valor)}
//guardarProductos ("listaProductos", JSON.stringify(productos))
//const almacenados = JSON.parse(localStorage.getItem("listaProductos"))
const carrito = []
const divProductos =document.getElementById("productos")
const divCarrito =document.getElementById("carritoHTML")
const divTotal =document.getElementById("total")
const botonMostrarCarrito = document.getElementById("botonMostrarCarrito")
const botonVaciarCarrito = document.getElementById("botonVaciarCarrito")


productos.forEach (producto => {
    divProductos.innerHTML += `
    <div class="card productos"  id="${producto.codigo}" 
    style="width: 14rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-text">${producto.codigo}</h3> 
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.detalle}</p>
            <h2 class="card-text">$${producto.precio}</h2>
            <button class="btn btn-success" onclick="avisoYCarga(${producto.codigo})">Agregar</button>
        </div>
    </div>
    `
})

function avisoYEliminacion (indice){
    //console.log("di click en eliminar indice "+ indice)
    carrito.splice(indice,1)    
    actualizarCarrito()
}

function avisoYCarga (codigo){
    //console.log("di click en boton "+ codigo)
    productos.forEach (producto => {
        if (producto.codigo == codigo){
            let agregado = new Producto
            agregado =producto
            carrito.push(agregado)
        }
    })
}

function actualizarCarrito (){botonMostrarCarrito.addEventListener("click",() =>{
    divCarrito.innerHTML =``
    divTotal.innerHTML =``
    let indice = -1
    carrito.forEach (elemento => {
        indice += 1
        divCarrito.innerHTML += `
        <div class="card carrito" 
        style="width: 14rem;">
            <img src="${elemento.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${elemento.nombre}</h5>
                <p class="card-text">${elemento.detalle}</p>
                <h2 class="card-text">$${elemento.precio}</h2>
                <button class="btn btn-danger" onclick="avisoYEliminacion(${indice})">Eliminar</button>
            </div>
        </div>
        `
    })
    let p = new Producto
    divTotal.innerHTML +=`
    <div class="card" 
    style="width: 30rem;">
        <div class="card-body total">
            <h5 class="card-title">TOTAL: $${p.totalizar(carrito)}</h5>
        </div>
    </div>
    `
})
}

botonVaciarCarrito.addEventListener("click",() =>{
    divCarrito.innerHTML =``
    divTotal.innerHTML =``
    carrito.splice(0,carrito.length)
})

actualizarCarrito()