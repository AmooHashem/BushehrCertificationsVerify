import React, { Component } from 'react';
import {
  Container,
  Grid,
  Form,
  TextArea,
  Segment,
  Label,
  Button,
  Message,
} from 'semantic-ui-react';
import './style.css';
import { Crypt } from 'hybrid-crypto-js';

var crypt = new Crypt();

class VerifyPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isFirstAttemp: true,
      isVerified: false,
      newMessage: '',
      publicKey: '',
      messageSignature: '',
      error: false,
    }
    this.verify = this.verify.bind(this)
  }

  verify() {
    this.setState({ isLoading: true, isFirstAttemp: false });
    try {
      var verify = crypt.verify(
        this.state.publicKey,
        this.state.messageSignature,
        this.state.newMessage,
      )
      this.setState({ isVerified: verify });
    } catch{
      this.setState({ error: true })
    }
    this.setState({ isLoading: false })
  }


  render() {
    const {
      isLoading,
      isFirstAttemp,
      publicKey,
      isVerified,
      messageSignature,
      error,
    } = this.state;

    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column>
              <Segment
                inverted={!isFirstAttemp && !error}
                color={!isFirstAttemp ? isVerified ? 'green' : 'red' : null}
              >
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  <Label size='big' color='blue'>
                    {'تایید امضا'}
                  </Label>
                  <br />
                  <br />
                  <Label size='medium' color='blue'>
                    پیغام:
                  </Label>
                  <TextArea style={{ width: '100%', height: '100px', textAlign: 'center' }}
                    placeholder='پیغامی که میخوای امضاشو چک کنی وارد کن :)'
                    onChange={(e) => this.setState({ newMessage: e.target.value })}
                  />
                  <br />
                  <br />
                  <Label size='medium' color='blue'>
                    کلید عمومی:
                  </Label>
                  <TextArea style={{ width: '100%', height: '200px', textAlign: 'center' }}
                    placeholder='محل کلید عمومی شما...'
                    onChange={(e) => this.setState({ publicKey: e.target.value })}
                  />
                  <br />
                  <br />
                  <Label size='medium' color='blue'>
                    امضای پیغام:
                  </Label>
                  <TextArea style={{ width: '100%', height: '100px', textAlign: 'center' }}
                    placeholder='محل امضای پیغام شما...'
                    onChange={(e) => this.setState({ messageSignature: e.target.value })}
                  />
                  <br />
                  <br />
                  {error && !isLoading &&
                    <>
                      <Message
                        color='red'
                        style={{ direction: 'rtl' }}
                      >
                        <Message.Header>یه مشکلی وجود داره.</Message.Header>
                        <p>احتمالاً یا فرمت کلید عمومیت اشتباهه، یا فرمت امضای پیغامت...</p>
                      </Message>
                    </>
                  }
                  <Button
                    disabled={isLoading || !publicKey || !messageSignature}
                    color='green'
                    style={{ direction: 'rtl' }}
                    onClick={this.verify}
                  >
                    معتبره؟
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

export default VerifyPane;
