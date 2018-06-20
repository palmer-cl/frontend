import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import copy from 'clipboard-copy';

import { CellContainer, Header, Body } from './styles';

const CodeStyle = styled.div`
  code {
    word-break: break-all;
  }
`;

export default class SmartContractAbi extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    abi: PropTypes.string.isRequired,
  };

  state = { showCopied: false };

  componentDidMount() {
    this.setState({ showCopied: false });
  }

  copyAbi = () => {
    copy(this.props.abi)
      .then(() => {
        this.setState({ showCopied: true, copiedContent: 'Copied!' });
        setTimeout(() => this.setState({ showCopied: false }), 3000);
      })
      .catch(err => {
        this.setState({ showCopied: true, copiedContent: 'Sorry! There was an error while copying the ABI' });
        setTimeout(() => this.setState({ showCopied: false }), 3000);
      });
  };

  modalTrigger(showAbiButton) {
    const { address, abi } = this.props;
    const { showCopied, copiedContent } = this.state;
    return (
      <Modal trigger={showAbiButton} centered="false" size="fullscreen" closeIcon>
        <Modal.Header>Smart Contract ABI</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <CodeStyle>
              <code>{abi}</code>
            </CodeStyle>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon labelPosition="left" onClick={this.copyAbi}>
            <Icon name="copy" />
            {showCopied ? copiedContent : 'Copy'}
          </Button>
          <Button
            as="a"
            href={`https://www.myetherwallet.com/?to=${address}#contracts`}
            target="_blank"
            icon
            labelPosition="right"
          >
            Go to MyEtherWallet
            <Icon name="external" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    return (
      <CellContainer>
        <Header>
          <Icon name="code" /> Smart Contract ABI
        </Header>
        <Body>
          {this.modalTrigger(
            <Button color="grey" size="mini">
              Show ABI
            </Button>
          )}
        </Body>
      </CellContainer>
    );
  }
}
