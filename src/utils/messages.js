export const showError = (error, msg) => {
    if (error) return <div className="alert alert-danger mb-0">{msg}</div>
}

export const showSuccess = (success, msg) => {
    if (success) return <div className="alert alert-success mb-0">{msg}</div>
}

export const showLoading = loading => {
    if (loading) return <div className="alert alert-info mb-0">Loading.....</div>
} 
