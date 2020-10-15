import React, { Component } from 'react';
import {
  Input,
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

class PublicPrivateKeyPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMining: false,
      isLoading: false,
      privateKey: '',
      message: '',
      messageSignature: '',
      error: false,
    };
    this.sign = this.sign.bind(this)
  }

  sign() {
    this.setState({ isLoading: true })
    try {
      var signature = crypt.signature(this.state.privateKey, this.state.message);
    } catch{
      this.setState({ error: true })
    }
    this.setState({ messageSignature: signature })
    this.setState({ isLoading: false })
  }


  render() {
    const { message, privateKey, isLoading, messageSignature, error } = this.state;

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
                  <br />
                  <Label size='medium' color='blue'>
                    پیغام:
                  </Label>
                  <TextArea style={{ width: '100%', height: '100px', textAlign: 'center' }}
                    value={message}
                    placeholder='پیغامتو بنویس :)'
                    onChange={(e) => this.setState({ message: e.target.value })}
                  />
                  <br />
                  <br />
                  <Label size='medium' color='blue'>
                    کلید خصوصی:
                  </Label>
                  <TextArea style={{ width: '100%', height: '200px', textAlign: 'center' }}
                    placeholder='محل کلید خصوصی شما...'
                    onChange={(e) => this.setState({ privateKey: e.target.value })}
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
                        <p>احتمالاً فرمت کلید خصوصیت اشتباهه...</p>
                      </Message>
                    </>
                  }
                  <Button
                    disabled={isLoading || !privateKey}
                    color='green'
                    style={{ direction: 'rtl' }}
                    onClick={this.sign}
                  >
                    امضاش کن!
                  </Button>
                  <br />
                  <br />
                  <TextArea style={{ width: '100%', height: '100px', textAlign: 'center' }}
                    disabled
                    value={messageSignature ? messageSignature : 'محل امضای پیغام شما...'}
                  />
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
