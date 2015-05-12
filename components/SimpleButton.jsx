import React, {PropTypes} from 'react'
import classNames from 'classnames'

require('./SimpleButton.css');

class SimpleButton extends React.Component {

  displayName = 'SimpleButton'

  static propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary', 'default']),
    size: PropTypes.oneOf(['small', 'large']),
    disabled: PropTypes.bool,
    submit: PropTypes.bool
  }

  static defaultProps = {
    type: 'default'
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let {type, disabled, size, submit, ...other} = this.props;
    let classes = classNames({
      'Button': true,
      ['Button--'+ type]: true,
      'Button--disabled': disabled,
      ['Button--'+ size]: size
    });

    if (submit) {
      other.type = 'submit';
    }

    return (
      <button className={classes} {...other}>
        {this.props.children}
      </button>
    )
  }

}

module.exports = SimpleButton
