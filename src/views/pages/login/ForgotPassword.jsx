import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { cilEnvelopeClosed } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/api/account/reset-password/init', email, {
        headers: { 'Content-Type': 'text/plain' }, // obligatorio para JHipster
      })
      setSuccess(true)
      setError('')
    } catch (err) {
      setError('No se pudo enviar el correo. Verifica que el email esté registrado.')
      setSuccess(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h2>Recuperar contraseña</h2>
                    <p className="text-body-secondary">
                      Ingresa tu correo y te enviaremos instrucciones
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    {success && (
                      <p className="text-success">
                        Revisa tu correo. Hemos enviado el enlace para recuperar tu contraseña.
                      </p>
                    )}
                    {error && <p className="text-danger">{error}</p>}
                    <CButton type="submit" color="primary">
                      Enviar
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
