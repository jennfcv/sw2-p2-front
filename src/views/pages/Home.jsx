import React from 'react'
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CNavbar,
  CNavbarBrand,
  CCard,
  CCardBody,
  CImage,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <>
      {/* NAVBAR */}
      <CNavbar colorScheme="light" className="bg-white shadow-sm px-4">
        <CNavbarBrand href="#" className="fw-bold text-success fs-4">
          SISTEMA CRÉDITOS S.A.
        </CNavbarBrand>
        <CButton color="primary" onClick={handleLogin}>Iniciar Sesión</CButton>
      </CNavbar>

      {/* HERO SLIDER CON COLORES Y FLECHAS */}
      <Carousel fade controls indicators interval={3000}>
        <Carousel.Item>
          <div style={{
            background: 'linear-gradient(to right, #004AAD, #007BFF)',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <div className="text-center px-3">
              <h1 className="display-4 fw-bold">Créditos Rápidos y Confiables</h1>
              <p className="lead">Solicita créditos sin trámites complejos, 100% online y desde casa. Ideal para gastos personales, emergencias o inversión.</p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{
            background: 'linear-gradient(to right, #00695c, #26a69a)',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <div className="text-center px-3">
              <h1 className="display-4 fw-bold">Inversiones Seguras</h1>
              <p className="lead">Protege tu inversión con contratos inteligentes, firma digital y total trazabilidad.</p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{
            background: 'linear-gradient(to right, #7b1fa2, #ba68c8)',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <div className="text-center px-3">
              <h1 className="display-4 fw-bold">Accesible para Todos</h1>
              <p className="lead">Inclusión financiera real para jóvenes, adultos mayores y trabajadores independientes.</p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* SERVICIOS */}
      <CContainer className="py-5 text-center">
        <h2 className="mb-5 fw-bold">¿Qué ofrece nuestra plataforma?</h2>
        <CRow className="gy-4">
          <CCol md={4}>
            <CCard className="h-100 shadow-lg border-0">
              <CCardBody>
                <CImage src="https://cdn-icons-png.flaticon.com/512/2382/2382218.png" height={60} className="mb-3" />
                <h5 className="fw-bold">Reconocimiento Inteligente</h5>
                <p className="text-muted">Nuestro sistema escanea automáticamente documentos y extrae datos para acelerar tu solicitud.</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={4}>
            <CCard className="h-100 shadow-lg border-0">
              <CCardBody>
                <CImage src="https://cdn-icons-png.flaticon.com/512/109/109612.png" height={60} className="mb-3" />
                <h5 className="fw-bold">Contratos Blockchain</h5>
                <p className="text-muted">Evita fraudes y manipulación de información gracias a tecnología blockchain que asegura tus documentos.</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={4}>
            <CCard className="h-100 shadow-lg border-0">
              <CCardBody>
                <CImage src="https://cdn-icons-png.flaticon.com/512/5997/5997305.png" height={60} className="mb-3" />
                <h5 className="fw-bold">Aprobación Automática</h5>
                <p className="text-muted">Gracias al análisis de tu historial, ingresos y perfil, nuestros modelos de IA aprueban en minutos.</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <div className="mt-5">
          <h4 className="fw-bold">¿Aún no tienes cuenta?</h4>
          <p className="text-muted">Únete a nuestra comunidad y empieza a construir tu historial crediticio con transparencia y confianza.</p>
          <CButton color="success" size="lg" onClick={handleLogin}>Crea tu cuenta ahora</CButton>
        </div>
      </CContainer>

      {/* FOOTER */}
      <div className="bg-dark text-white text-center py-4">
        <p className="mb-1">© 2025 SISTEMA CRÉDITOS S.A.</p>
        <p className="mb-0">Con tecnología Blockchain, Inteligencia Artificial y seguridad de nivel bancario.</p>
      </div>
    </>
  )
}

export default Home
