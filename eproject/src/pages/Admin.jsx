import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { Table, Button, Modal } from 'react-bootstrap'
import ProductForm from '../components/ProductForm'

const Admin = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const prodSnap = await getDocs(collection(db, 'products'))
      setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      const orderSnap = await getDocs(collection(db, 'orders'))
      setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    }
    fetchData()
  }, [])

  const handleDelete = async (id, collectionName) => {
    await deleteDoc(doc(db, collectionName, id))
    // Refresh data
    const fetchData = async () => { /* same as above */ }
    fetchData()
  }

  const seedProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    for (const p of data) {
      await addDoc(collection(db, 'products'), p)
    }
    alert('Productos seeded!')
  }

  return (
    <div>
      <h1>Admin</h1>
      <Button onClick={seedProducts}>Seed Productos desde API</Button>
      <h2>Productos</h2>
      <Button onClick={() => { setEditProduct(null); setShowModal(true); }}>Agregar Producto</Button>
      <Table>
        {/* Similar a carrito, con edit/delete */}
        <thead><tr><th>Título</th><th>Precio</th><th>Acciones</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>
                <Button onClick={() => { setEditProduct(p); setShowModal(true); }}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(p.id, 'products')}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Pedidos</h2>
      <Table>
        {/* List orders, with delete */}
        <thead><tr><th>User</th><th>Total</th><th>Acciones</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.userId}</td>
              <td>${o.total}</td>
              <td><Button variant="danger" onClick={() => handleDelete(o.id, 'orders')}>Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm product={editProduct} onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Admin