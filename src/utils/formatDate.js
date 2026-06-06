export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return yyyy === now.getFullYear() ? `${mm}-${dd}` : `${yyyy}-${mm}-${dd}`
}
