import React from 'react'
import Modal from './Modal'
import Button from './SimpleButton'

class ModalExample extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
  }

  render(){
    let fullscreen = this.props.fullscreen
      ? 'ReactModal__Content--fullscreen'
      : null;

    return (
      <div className='ModalExample'>
        <Button onClick={this.showModal.bind(this)}>
          show modal
        </Button>
        <Modal
            className={fullscreen}
            closeTimeoutMS={150}
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal.bind(this)}>
          <h2>Close modal</h2>
          <button onClick={this.closeModal.bind(this)}>
            Close this modal
          </button>
        </Modal>
      </div>
    )
  }

  closeModal(){
    this.setState({ isOpen: false })
  }

  showModal(e){
    this.setState({ isOpen: true })
  }
}

export default ModalExample
