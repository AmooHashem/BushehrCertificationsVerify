import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import {
  Input,
  Container,
  Grid,
  Form,
  TextArea,
  Segment,
  Label,
  Button,
} from 'semantic-ui-react';
import './style.css';
import { Crypt } from 'hybrid-crypto-js';

var crypt = new Crypt();

class PublicPrivateKeyPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMining: false,
      isLoading: false,
      privateKey: '',
      message: '',
      messageSignature: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.sign = this.sign.bind(this)
  }

  sign() {
    this.setState({ isLoading: true })
    var signature = crypt.signature(this.state.privateKey, this.state.message);
    this.setState({ messageSignature: signature })
    this.setState({ isLoading: false })
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ message: value })
  }

  render() {
    const { message, privateKey, isLoading, messageSignature } = this.state;

    return (
      <Container text>
        <Grid centered>
          <Grid.Row verticalAlign='middle' columns={1}>
            <Grid.Column>
              <Segment>
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  <Label size='big' color='blue'>
                    {'امضا'}
                  </Label>
                  <br />
                  <TextArea
                    value={message}
                    style={{ direction: 'rtl' }}
                    placeholder='پیغامتو بنویس :)'
                    onChange={this.handleChange}
                  />
                  <Label size='medium' color='blue'>
                    کلید خصوصی:
                  </Label>
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={privateKey ? sha256(privateKey) : 'محل کلید خصوصی شما...'}
                    />
                  </Input>
                  <br />
                  <br />
                  <Button
                    disabled={isLoading || !privateKey}
                    color='green'
                    style={{ direction: 'rtl' }}
                    onClick={this.sign}
                  >
                    امضاش کن!
                  </Button>
                  <br />
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={messageSignature ? sha256(messageSignature) : 'محل امضای پیغام شما...'}
                    />
                  </Input>
                </Form>

              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    )
  }
}

export default PublicPrivateKeyPane;
