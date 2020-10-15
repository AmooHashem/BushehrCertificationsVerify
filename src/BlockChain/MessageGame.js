import React, { Component } from 'react';
import {
  Container,
  Button,
  Grid,
} from 'semantic-ui-react';
import PublicPrivateKeyPane from './PublicPrivateKeyPane'
import SignPane from './SignPane'
import VerifyPane from './VerifyPane'
import './style.css';

class MessageGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
    }
  }

  render() {
    const { pageNumber } = this.state;
    return (
      <Container text >
        <Grid centered style={{ direction: 'rtl' }}>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column textAlign='center'>
              {pageNumber === 0 &&
                <PublicPrivateKeyPane />
              }
              {pageNumber === 1 &&
                <SignPane />
              }
              {pageNumber === 2 &&
                <VerifyPane />
              }
            </Grid.Column>
          </Grid.Row>

          <Grid.Row verticalAlign='middle'>
            <Grid.Column textAlign='center'>
              <Button
                disabled={pageNumber === 0}
                primary
                onClick={
                  () => this.setState({ pageNumber: 0 })
                }
              >
                کلیدها
              </Button>

              <Button
                disabled={pageNumber === 1}
                primary
                onClick={
                  () => this.setState({ pageNumber: 1 })
                }
              >
                امضا
              </Button>

              <Button
                disabled={pageNumber === 2}
                primary
                onClick={
                  () => this.setState({ pageNumber: 2 })
                }
              >
                تایید امضا
              </Button>

            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    )
  }
}


export default MessageGame;