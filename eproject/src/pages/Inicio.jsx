import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import ProductCard from '../components/ProductCard'
import { Row, Col, Spinner, Alert } from 'react-bootstrap'

const Inicio = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('rating.rate', 'desc'), limit(6))
        const querySnapshot = await getDocs(q)
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } catch (err) {
        setError('Error al cargar productos destacados')
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <h1>Bienvenido - Productos Destacados</h1>
      <Row className="product-grid">
        {products.map(p => (
          <Col key={p.id} md={4}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Inicio