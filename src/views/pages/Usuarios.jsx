import React, { useEffect, useState } from 'react'
import {
    CButton, CCard, CCardBody, CCardHeader, CCol,
    CForm, CFormInput, CFormSelect, CModal, CModalBody,
    CModalFooter, CModalHeader, CModalTitle,
    CTable, CTableBody, CTableDataCell, CTableHead,
    CTableHeaderCell, CTableRow, CAlert, CFormLabel,
    CFormCheck, CSpinner, CInputGroup, CInputGroupText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPlus, cilPencil, cilLockLocked } from '@coreui/icons'

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [rolesDisponibles, setRolesDisponibles] = useState([])
    const [visible, setVisible] = useState(false)
    const [editando, setEditando] = useState(false)
    const [eliminando, setEliminando] = useState(null)
    const [cambiandoPassword, setCambiandoPassword] = useState(null)
    const [nuevaPassword, setNuevaPassword] = useState('')
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)

    const [formulario, setFormulario] = useState({
        id: '',
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        activated: true,
        langKey: 'es',
        authorities: []
    })

    const [errores, setErrores] = useState({
        login: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    const token = localStorage.getItem('id_token')
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }

    const validarFormulario = () => {
        const nuevosErrores = {}
        let valido = true

        if (!formulario.login.trim()) {
            nuevosErrores.login = 'El nombre de usuario es requerido'
            valido = false
        }

        if (!formulario.firstName.trim()) {
            nuevosErrores.firstName = 'El nombre es requerido'
            valido = false
        }

        if (!formulario.lastName.trim()) {
            nuevosErrores.lastName = 'El apellido es requerido'
            valido = false
        }

        if (!formulario.email.trim()) {
            nuevosErrores.email = 'El email es requerido'
            valido = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
            nuevosErrores.email = 'El email no es válido'
            valido = false
        }

        setErrores(nuevosErrores)
        return valido
    }

    const obtenerUsuarios = async () => {
        setCargando(true)
        try {
            const res = await fetch('/api/admin/users?page=0&size=100&sort=id,desc', { headers })
            if (res.ok) {
                const data = await res.json()
                setUsuarios(data)
            } else {
                setError('Error al obtener usuarios')
            }
        } catch (error) {
            setError('Error de conexión al obtener usuarios')
        } finally {
            setCargando(false)
        }
    }

    const obtenerRoles = async () => {
        try {
            const res = await fetch('/api/authorities', { headers })
            if (res.ok) {
                const data = await res.json()
                setRolesDisponibles(data.map(role => role.name)) // Extraemos solo los nombres
            }
        } catch (error) {
            console.error('Error al obtener roles:', error)
        }
    }

    const crearUsuario = async (userDTO, password) => {
        setCargando(true)
        setError(null)

        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    ...userDTO,
                    password,
                    login: userDTO.login.toLowerCase(),
                    email: userDTO.email.toLowerCase(),
                    imageUrl: userDTO.imageUrl?.trim() === '' ? null : userDTO.imageUrl,
                    authorities: userDTO.authorities,
                }),
            })

            if (res.ok) {
                setExito('Usuario creado correctamente')
                setVisible(false)
                obtenerUsuarios()
            } else {
                const err = await res.json()
                setError(err.title || 'Error al crear usuario')
            }
        } catch (error) {
            setError('Error de conexión')
        } finally {
            setCargando(false)
        }
    }


    const actualizarUsuario = async (userDTO) => {
        setCargando(true)
        setError(null)

        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                    ...userDTO,
                    login: userDTO.login.toLowerCase(),
                    email: userDTO.email.toLowerCase(),
                    imageUrl: userDTO.imageUrl?.trim() === '' ? null : userDTO.imageUrl,
                    authorities: userDTO.authorities,
                }),
            })

            if (res.ok) {
                setExito('Usuario actualizado correctamente')
                setVisible(false)
                obtenerUsuarios()
            } else {
                const err = await res.json()
                setError(err.title || 'Error al actualizar usuario')
            }
        } catch (error) {
            setError('Error de conexión')
        } finally {
            setCargando(false)
        }
    }


    const eliminarUsuario = async (login) => {
        setCargando(true)
        setError(null)
        try {
            const res = await fetch(`/api/admin/users/${login}`, {
                method: 'DELETE',
                headers,
            })
            if (res.ok) {
                setExito('Usuario eliminado correctamente')
                setEliminando(null)
                obtenerUsuarios()
            } else {
                setError('Error al eliminar usuario')
            }
        } catch (error) {
            setError('Error de conexión al eliminar usuario')
        } finally {
            setCargando(false)
        }
    }

    const abrirEdicion = (usuario) => {
        setFormulario({
            ...usuario,
            authorities: usuario.authorities ? usuario.authorities.map(a => a.name) : []
        })
        setEditando(true)
        setVisible(true)
    }

    const resetearMensajes = () => {
        setError(null)
        setExito(null)
    }

    useEffect(() => {
        obtenerUsuarios()
        obtenerRoles()
    }, [])

    return (
        <CCol xs={12}>
            {error && <CAlert color="danger" onDismiss={resetearMensajes}>{error}</CAlert>}
            {exito && <CAlert color="success" onDismiss={resetearMensajes}>{exito}</CAlert>}

            <CCard>
                <CCardHeader className="d-flex justify-content-between align-items-center">
                    <strong>Gestión de Usuarios</strong>
                    <CButton color="primary" onClick={() => {
                        resetearMensajes()
                        setVisible(true)
                        setEditando(false)
                        setFormulario({
                            login: '',
                            firstName: '',
                            lastName: '',
                            email: '',
                            imageUrl: '',
                            activated: true,
                            langKey: 'es',
                            authorities: []
                        })
                    }}>
                        <CIcon icon={cilPlus} className="me-2" /> Nuevo Usuario
                    </CButton>
                </CCardHeader>
                <CCardBody>
                    {cargando && usuarios.length === 0 ? (
                        <div className="text-center">
                            <CSpinner />
                        </div>
                    ) : (
                        <CTable hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Usuario</CTableHeaderCell>
                                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                                    <CTableHeaderCell>Apellido</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Activo</CTableHeaderCell>
                                    <CTableHeaderCell>Roles</CTableHeaderCell>
                                    <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {usuarios.map((u, idx) => (
                                    <CTableRow key={u.login || idx}>
                                        <CTableDataCell>{u.login}</CTableDataCell>
                                        <CTableDataCell>{u.firstName}</CTableDataCell>
                                        <CTableDataCell>{u.lastName}</CTableDataCell>
                                        <CTableDataCell>{u.email}</CTableDataCell>
                                        <CTableDataCell>{u.activated ? 'Sí' : 'No'}</CTableDataCell>
                                        <CTableDataCell>
                                            {u.authorities && u.authorities.join(', ')}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-end">
                                            <CButton color="info" size="sm" className="me-2" onClick={() => abrirEdicion(u)}>
                                                <CIcon icon={cilPencil} />
                                            </CButton>
                                            
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                onClick={() => {
                                                    resetearMensajes()
                                                    setEliminando(u.login)
                                                }}
                                            >
                                                <CIcon icon={cilTrash} />
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    )}
                </CCardBody>
            </CCard>

            {/* Modal Crear/Editar Usuario */}
            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>{editando ? 'Editar Usuario' : 'Crear Usuario'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel>Usuario*</CFormLabel>
                            <CFormInput
                                value={formulario.login}
                                onChange={(e) => setFormulario({ ...formulario, login: e.target.value })}
                                invalid={!!errores.login}
                                disabled={editando}
                            />
                            {errores.login && <div className="invalid-feedback d-block">{errores.login}</div>}
                        </div>

                        <div className="mb-3">
                            <CFormLabel>Nombre*</CFormLabel>
                            <CFormInput
                                value={formulario.firstName}
                                onChange={(e) => setFormulario({ ...formulario, firstName: e.target.value })}
                                invalid={!!errores.firstName}
                            />
                            {errores.firstName && <div className="invalid-feedback d-block">{errores.firstName}</div>}
                        </div>

                        <div className="mb-3">
                            <CFormLabel>Apellido*</CFormLabel>
                            <CFormInput
                                value={formulario.lastName}
                                onChange={(e) => setFormulario({ ...formulario, lastName: e.target.value })}
                                invalid={!!errores.lastName}
                            />
                            {errores.lastName && <div className="invalid-feedback d-block">{errores.lastName}</div>}
                        </div>

                        <div className="mb-3">
                            <CFormLabel>Email*</CFormLabel>
                            <CFormInput
                                type="email"
                                value={formulario.email}
                                onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                                invalid={!!errores.email}
                            />
                            {errores.email && <div className="invalid-feedback d-block">{errores.email}</div>}
                        </div>

                        <div className="mb-3">
                            <CFormCheck
                                label="Usuario activo"
                                checked={formulario.activated}
                                onChange={(e) => setFormulario({ ...formulario, activated: e.target.checked })}
                            />
                        </div>

                        <div className="mb-3">
                            <CFormLabel>Roles</CFormLabel>
                            <CFormSelect
                                multiple
                                value={formulario.authorities}
                                onChange={(e) =>
                                    setFormulario({
                                        ...formulario,
                                        authorities: Array.from(e.target.selectedOptions, (opt) => opt.value),
                                    })
                                }
                            >
                                {rolesDisponibles.map((rol) => (
                                    <option key={rol} value={rol}>
                                        {rol}
                                    </option>
                                ))}
                            </CFormSelect>
                            <small className="text-muted">Mantén presionado Ctrl para seleccionar múltiples roles</small>
                        </div>

                        {!editando && (
                            <div className="mb-3">
                                <CFormLabel>Contraseña*</CFormLabel>
                                <CFormInput
                                    type="password"
                                    value={formulario.password || ''}
                                    onChange={(e) => setFormulario({ ...formulario, password: e.target.value })}
                                />
                            </div>
                        )}
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)} disabled={cargando}>
                        Cancelar
                    </CButton>
                    <CButton color="primary" onClick={() => {
                        if (validarFormulario()) {
                            if (editando) {
                                actualizarUsuario(formulario)
                            } else {
                                crearUsuario(formulario, formulario.password)
                            }
                        }
                    }} disabled={cargando}>
                        {cargando ? <CSpinner size="sm" /> : 'Guardar'}
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Modal Cambiar Contraseña */}
            <CModal visible={!!cambiandoPassword} onClose={() => setCambiandoPassword(null)}>
                <CModalHeader>
                    <CModalTitle>Cambiar Contraseña</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel>Nueva Contraseña</CFormLabel>
                            <CInputGroup>
                                <CInputGroupText>
                                    <CIcon icon={cilLockLocked} />
                                </CInputGroupText>
                                <CFormInput
                                    type="password"
                                    value={nuevaPassword}
                                    onChange={(e) => setNuevaPassword(e.target.value)}
                                    placeholder="Ingrese la nueva contraseña"
                                />
                            </CInputGroup>
                        </div>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setCambiandoPassword(null)} disabled={cargando}>
                        Cancelar
                    </CButton>
                    <CButton color="primary" onClick={() => cambiarPassword(cambiandoPassword, nuevaPassword)} disabled={cargando || !nuevaPassword}>
                        {cargando ? <CSpinner size="sm" /> : 'Cambiar Contraseña'}
                    </CButton>
                </CModalFooter>
            </CModal>

            {/* Modal Eliminar Usuario */}
            <CModal visible={!!eliminando} onClose={() => setEliminando(null)}>
                <CModalHeader>
                    <CModalTitle>Confirmar Eliminación</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    ¿Estás seguro que deseas eliminar el usuario <strong>{eliminando}</strong>? Esta acción no se puede deshacer.
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setEliminando(null)} disabled={cargando}>
                        Cancelar
                    </CButton>
                    <CButton color="danger" onClick={() => eliminarUsuario(eliminando)} disabled={cargando}>
                        {cargando ? <CSpinner size="sm" /> : 'Eliminar'}
                    </CButton>
                </CModalFooter>
            </CModal>
        </CCol>
    )
}

export default Usuarios