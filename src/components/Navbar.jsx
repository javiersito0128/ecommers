import { Link } from 'react-router-dom'
import { Navbar as BSNavbar, Nav } from 'react-bootstrap'
import { useAuthStore } from '../stores/authStore'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  return (
    <BSNavbar bg="primary" variant="dark" expand="lg">
      <BSNavbar.Brand as={Link} to="/">E-commerce</BSNavbar.Brand>
      <BSNavbar.Toggle />
      <BSNavbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/productos">Tienda</Nav.Link>
          {user && <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>}
          {user && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
        </Nav>
        <Nav>
          {user ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  )
}

export default Navbar