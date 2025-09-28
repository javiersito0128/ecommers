import { useEffect } from 'react'
import { useCartStore } from '../stores/cartStore'
import { useDiscountStore } from '../stores/discountStore'
import { useAuthStore } from '../stores/authStore'
import { Table, Button, Form, Alert } from 'react-bootstrap'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

const Carrito = () => {
  const { items, removeItem, updateQuantity, loadCart, clearCart } = useCartStore()
  const { discount, applyCoupon } = useDiscountStore()
  const { user } = useAuthStore()
  const [couponCode, setCouponCode] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) loadCart(user.uid)
  }, [user, loadCart])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountedTotal = (total * (1 - discount / 100)).toFixed(2)

  const handleBuy = async () => {
    try {
      await addDoc(collection(db, 'orders'), { userId: user.uid, items, total: discountedTotal, date: new Date() })
      const message = encodeURIComponent(`Pedido: ${items.map(i => `${i.title} x${i.quantity}`).join(', ')} Total: $${discountedTotal}`)
      window.open(`https://wa.me/1234567890?text=${message}`, '_blank') // Reemplaza número
      clearCart()
    } catch (err) {
      setError('Error al procesar pedido')
    }
  }

  return (
    <div>
      <h1>Carrito</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <Form.Control type="number" value={item.quantity} onChange={e => updateQuantity(item.id, parseInt(e.target.value))} min={1} />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td><Button variant="danger" onClick={() => removeItem(item.id)}>Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form className="mb-3 d-flex">
        <Form.Control placeholder="Cupón" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="me-2" />
        <Button onClick={() => applyCoupon(couponCode)}>Aplicar</Button>
      </Form>
      {discount > 0 && <Alert variant="success">Descuento {discount}% aplicado!</Alert>}
      <h3>Total: ${discountedTotal}</h3>
      <Button onClick={handleBuy}>Comprar via WhatsApp</Button>
    </div>
  )
}

export default Carrito