import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react'
import axios from 'axios'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const params = new URLSearchParams(location.search)
  const key = params.get('key')

  const handleReset = async (e) => {
    e.preventDefault()

    if (!key) {
      alert('Enlace inválido o expirado.')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    try {
      await axios.post('http://localhost:8080/api/account/reset-password/finish', {
        key,
        newPassword,
      })
      alert('Contraseña actualizada correctamente.')
      navigate('/login')
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.title ||
        'Ocurrió un error al actualizar la contraseña.'
      alert(message)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard>
              <CCardBody>
                <h4>Restablecer Contraseña</h4>
                <CForm onSubmit={handleReset}>
                  <CFormInput
                    type="password"
                    label="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mb-3"
                  />
                  <CFormInput
                    type="password"
                    label="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mb-3"
                  />
                  <CButton type="submit" color="primary">
                    Guardar nueva contraseña
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
