import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'

export function AdminDashboard() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const adminName = localStorage.getItem('adminName')
  const adminEmail = localStorage.getItem('adminEmail')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    fetchAppointments(token)
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchAppointments(token)
    }, 30000)

    return () => clearInterval(interval)
  }, [navigate])

  const fetchAppointments = async (token) => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:4000/api/admin/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        localStorage.clear()
        navigate('/admin/login', { replace: true })
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }

      const data = await response.json()
      setAppointments(data.data || [])
      setLastRefresh(new Date())
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('adminToken')

    try {
      const response = await fetch(`http://localhost:4000/api/admin/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.status === 401) {
        localStorage.clear()
        navigate('/admin/login', { replace: true })
        return
      }

      if (!response.ok) throw new Error('Failed to update status')

      const data = await response.json()
      setAppointments(appointments.map((apt) => (apt.id === data.data.id ? data.data : apt)))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/admin/login', { replace: true })
  }

  const handleRefresh = () => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      fetchAppointments(token)
    }
  }

  const filteredAppointments =
    filter === 'all'
      ? appointments
      : appointments.filter((apt) => apt.status === filter)

  return (
    <>
      <PageHero title="Admin Dashboard" />
      <div className="min-h-[80vh] bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Appointments</h2>
              <p className="text-gray-600 mt-1">Welcome, {adminName}! ({adminEmail})</p>
              <p className="text-xs text-gray-400 mt-1">Last updated: {lastRefresh.toLocaleTimeString()}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
                <span className="ml-2 text-sm">
                  ({appointments.filter((a) => status === 'all' || a.status === status).length})
                </span>
              </button>
            ))}
          </div>

          {/* Appointments Table */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No appointments found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Project</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((apt, index) => (
                    <tr
                      key={apt.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{apt.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.email || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(apt.preferredDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.preferredTime}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{apt.projectType}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            apt.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : apt.status === 'CONFIRMED'
                                ? 'bg-green-100 text-green-800'
                                : apt.status === 'COMPLETED'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={apt.status}
                          onChange={(e) => updateStatus(apt.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
              <div key={status} className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm mb-1">{status}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {appointments.filter((a) => a.status === status).length}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
