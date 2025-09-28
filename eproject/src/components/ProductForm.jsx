import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { db } from '../firebase'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'

const ProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState(product || { title: '', price: 0, description: '', image: '', category: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (product) {
      await updateDoc(doc(db, 'products', product.id), formData)
    } else {
      await addDoc(collection(db, 'products'), formData)
    }
    onClose()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Título</Form.Label>
        <Form.Control name="title" value={formData.title} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Precio</Form.Label>
        <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Descripción</Form.Label>
        <Form.Control name="description" value={formData.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Imagen URL</Form.Label>
        <Form.Control name="image" value={formData.image} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Categoría</Form.Label>
        <Form.Control name="category" value={formData.category} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

export default ProductForm