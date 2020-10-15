import React, { Component } from 'react';
import {
  Container,
  Grid,
  Form,
  Segment,
  Label,
  Button,
  TextArea,
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
        <Grid centered>
          <Grid.Row verticalAlign='middle' columns={1}>
            <Grid.Column>
              <Segment>
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  <Label size='big' color='blue'>
                    {'کلید‌های خصوصی و عمومی'}
                  </Label>
                  <br />
                  <br />
                  <Label size='medium' color='blue'>
                    کلید خصوصی:
                  </Label>
                  <TextArea style={{ width: '100%', height: '200px', textAlign: 'center' }}
                    disabled
                    value={privateKey ? privateKey : 'محل کلید خصوصی شما...'}
                  />
                  <br />
                  <br />
                  <Label size='medium' color='blue' >
                    کلید عمومی:
                  </Label>
                  <TextArea style={{ width: '100%', height: '200px', textAlign: 'center' }}
                    disabled
                    value={publicKey ? publicKey : 'محل کلید عمومی شما...'}
                  />
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
