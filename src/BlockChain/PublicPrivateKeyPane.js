import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import {
  Input,
  Container,
  Grid,
  Form,
  Segment,
  Label,
  Button,
} from 'semantic-ui-react';
import './style.css';
import { Crypt, RSA } from 'hybrid-crypto-js';
var rsa = new RSA()

class PublicPrivateKeyPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateKey: '',
      publicKey: '',
      isLoading: false,
    }
    this.generateNewKey = this.generateNewKey.bind(this)
  }

  generateNewKey() {
    this.setState({ isLoading: true })
    rsa.generateKeyPairAsync().then(keyPair => {
      this.setState({ privateKey: keyPair.privateKey })
      this.setState({ publicKey: keyPair.publicKey })
      this.setState({ isLoading: false })
    });
  }

  render() {
    const { privateKey, publicKey, isLoading } = this.state;

    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  <Label size='big' color='blue'>
                    {'کلید‌های خصوصی و عمومی'}
                  </Label>
                  <br />
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
                  <Label size='medium' color='blue' >
                    کلید عمومی:
                  </Label>
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={publicKey ? sha256(publicKey) : 'محل کلید عمومی شما...'}
                    />
                  </Input>
                  <br />
                  <br />
                  <Button
                    disabled={isLoading}
                    color='green'
                    style={{ direction: 'rtl' }}
                    onClick={this.generateNewKey}
                  >
                    یه جفت کلید جدید بساز!
                  </Button>
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
