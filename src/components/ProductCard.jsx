import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => (
  <Card>
    <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'contain' }} />
    <Card.Body>
      <Card.Title>{product.title}</Card.Title>
      <Card.Text>${product.price}</Card.Text>
      <Button as={Link} to={`/productos/${product.id}`}>Ver Detalles</Button>
    </Card.Body>
  </Card>
)

export default ProductCard