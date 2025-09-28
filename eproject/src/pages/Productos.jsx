import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import ProductCard from '../components/ProductCard'
import { Row, Col, Form, Spinner } from 'react-bootstrap'

const Productos = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filterCategory, setFilterCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'))
      const prods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProducts(prods)
      setCategories([...new Set(prods.map(p => p.category))])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(p => 
    (!filterCategory || p.category === filterCategory) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return <Spinner animation="border" />

  return (
    <div>
      <h1>Tienda</h1>
      <Form className="mb-3">
        <Form.Select onChange={e => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="">Todas Categorías</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </Form.Select>
        <Form.Control placeholder="Buscar..." onChange={e => setSearch(e.target.value)} value={search} className="mt-2" />
      </Form>
      <Row className="product-grid">
        {filteredProducts.map(p => (
          <Col key={p.id} md={3}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Productos