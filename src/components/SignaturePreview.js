import React from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { Panel } from 'react-bootstrap'
import ClipboardButton from 'react-clipboard.js'
import queryString from 'query-string'

import Logo from '../../public/logo.jpg'

const keyStyle = {
  display: 'inline-block',
  width: '60px'
}

const SplitAddressLines = (lines) => {
  return lines.split('|').map((line) => (
    <div key={line}>
      { line }
    </div>)
  )
}

const CopyButton = ({formValues}) => {
  return (
    <ClipboardButton component='a' data-clipboard-target='#copy-me'>
      Copy
    </ClipboardButton>
  )
}

const ShareButton = ({formValues}) => {
  const shareLink = window.location.origin + '/?' + queryString.stringify(formValues)
  return (
    <ClipboardButton component='a' data-clipboard-text={shareLink}>
      Share
    </ClipboardButton>
  )
}

const Signature = ({formValues}) => {
  const {
    fullName,
    title,
    email,
    officePhone,
    mobilePhone,
    location
  } = formValues

  // very simple markup with inline style
  // for simple email clients
  return (
    <div style={{ fontSize: 'small' }}>
      <div>
        <b>{ fullName }</b>
      </div>
      <div>
        <i>{ title }</i>
      </div>
      <img src={Logo} alt='Logo' />
      <div>
        { SplitAddressLines(location) }
      </div>
      <br />
      <div>
        <div>
          <span style={keyStyle}>Email</span>
          <a style={{ width: 40 }} href={`mailto:${email}`}>
            { email }
          </a>
        </div>
        <div>
          <span style={keyStyle}>Office</span>
          <a href={`tel:${officePhone}`}>
            { officePhone }
          </a>
        </div>
        <div>
          <span style={keyStyle}>Mobile</span>
          <a href={`tel:${mobilePhone}`}>
            { mobilePhone }
          </a>
        </div>
      </div>
    </div>
  )
}

const SignaturePreview = (state) => {
  return (
    <Panel bsStyle='primary' style={{ height: '540px' }}>
      <span><ShareButton formValues={state.formValues} /></span>
      <span style={{ padding: '0 4px' }}>|</span>
      <span><CopyButton formValues={state.formValues} /></span>
      <div id='copy-me'>
        <Signature {...state} />
      </div>
    </Panel>
  )
}

const mapStateToProps = (state) => {
  return {
    formValues: getFormValues('userForm')(state)
  }
}

export default connect(mapStateToProps)(SignaturePreview)
