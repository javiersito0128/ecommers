import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore' // Añadido addDoc
import { Table, Button, Modal } from 'react-bootstrap'
import ProductForm from '../components/ProductForm'

const Admin = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const prodSnap = await getDocs(collection(db, 'products'))
      setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      const orderSnap = await getDocs(collection(db, 'orders'))
      setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      setError('Error al cargar datos')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id, collectionName) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
      fetchData() // Refresco completo
    } catch (err) {
      setError('Error al eliminar')
    }
  }

  const seedProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
      for (const p of data) {
        await addDoc(collection(db, 'products'), p)
      }
      alert('Productos seeded exitosamente!')
      fetchData()
    } catch (err) {
      setError('Error al seed productos')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    fetchData() // Refresco después de guardar
  }

  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <h1>Admin</h1>
      <Button onClick={seedProducts} className="mb-3">Seed Productos desde API</Button>
      <h2>Productos</h2>
      <Button onClick={() => { setEditProduct(null); setShowModal(true); }} className="mb-3">Agregar Producto</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>
                <Button onClick={() => { setEditProduct(p); setShowModal(true); }} className="me-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(p.id, 'products')}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Pedidos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm product={editProduct} onClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Admin