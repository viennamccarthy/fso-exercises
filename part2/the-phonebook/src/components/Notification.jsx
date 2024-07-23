const Notification = ({ message: { content, isError }}) => {

  const notificationStyle = content ? {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  } : {};

  notificationStyle.color = isError ? 'red' : 'green';

  return (
    <div style={notificationStyle}>
      {content}
    </div>
  )
};

export default Notification;
