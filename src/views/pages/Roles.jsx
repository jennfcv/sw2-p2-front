import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus } from '@coreui/icons'

const Roles = () => {
  const [roles, setRoles] = useState([])
  const [visible, setVisible] = useState(false)
  const [newRole, setNewRole] = useState('')
  const [deletingRole, setDeletingRole] = useState(null)

  const token = localStorage.getItem('id_token')

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/authorities', { headers })
      if (res.ok) {
        const data = await res.json()
        setRoles(data)
      }
    } catch (error) {
      console.error('Error al obtener roles:', error)
    }
  }

  const createRole = async () => {
    try {
      const res = await fetch('/api/authorities', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: newRole }),
      })
      if (res.ok) {
        setVisible(false)
        setNewRole('')
        fetchRoles()
      }
    } catch (error) {
      console.error('Error al crear rol:', error)
    }
  }

  const deleteRole = async (name) => {
    try {
      const res = await fetch(`/api/authorities/${name}`, {
        method: 'DELETE',
        headers,
      })
      if (res.ok) {
        setDeletingRole(null)
        fetchRoles()
      }
    } catch (error) {
      console.error('Error al eliminar rol:', error)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  return (
    <CCol xs={12}>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Gestión de Roles</strong>
          <CButton color="primary" onClick={() => setVisible(true)}>
            <CIcon icon={cilPlus} className="me-2" />
            Nuevo Rol
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre del Rol</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {roles.map((role, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{role.name}</CTableDataCell>
                  <CTableDataCell className="text-end">
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => setDeletingRole(role.name)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal Crear Rol */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Crear Nuevo Rol</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Nombre del Rol"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Ej: ROLE_ANALISTA"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
          <CButton color="primary" onClick={createRole} disabled={!newRole}>Guardar</CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Confirmación Eliminar */}
      <CModal visible={!!deletingRole} onClose={() => setDeletingRole(null)}>
        <CModalHeader>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Estás seguro que deseas eliminar el rol <strong>{deletingRole}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeletingRole(null)}>Cancelar</CButton>
          <CButton color="danger" onClick={() => deleteRole(deletingRole)}>Eliminar</CButton>
        </CModalFooter>
      </CModal>
    </CCol>
  )
}

export default Roles
