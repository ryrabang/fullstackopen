const Notification = ({ message, isError }) => {
  return (
    <h2 className={`notification ${isError ? "error" : "success"}`}>
      {message}
    </h2>
  )
}

export default Notification
