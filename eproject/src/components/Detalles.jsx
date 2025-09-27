import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const Detalles = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addItem } = useCartStore()
  const { user } = useAuthStore()

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) setProduct({ id: docSnap.id, ...docSnap.data() })
    }
    fetchProduct()
  }, [id])

  if (!product) return <Spinner animation="border" />

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Quiero comprar: ${product.title} por $${product.price}`)
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank') // Reemplaza número
  }

  return (
    <Card>
      <Card.Img variant="top" src={product.image} style={{ height: '300px', objectFit: 'contain' }} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Precio: ${product.price}</Card.Text>
        {user && <Button onClick={() => addItem({ ...product, quantity: 1 })}>Agregar al Carrito</Button>}
        <Button variant="success" onClick={handleWhatsApp} className="ms-2">Comprar en WhatsApp</Button>
      </Card.Body>
    </Card>
  )
}

export default Detalles