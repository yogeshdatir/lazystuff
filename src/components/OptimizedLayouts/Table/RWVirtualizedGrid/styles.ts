const styles = {
  messagesContainer: {
    height: '100vh',
    width: '1000px',
  },
  newMessage: {
    backgroundColor: '#3578E5',
    borderRadius: '8px',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto, sans-serif',
    padding: '12px',
    width: '65%',
  },
  newMessageContainer: {
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '1rem',
  },
  receivedMessage: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    display: 'flex',
    fontFamily: 'Roboto, sans-serif',
    padding: '12px',
    width: '65%',
  },
  receivedMessageContainer: {
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'flex-start',
    width: '100%',
  },
};

export default styles;
