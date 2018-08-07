import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import { vibrate } from './utils';
import Clock from './components/Clock';

export default class App extends Component {
  state = {
    seconds: '',
    minutes: '',
    display: '',
    pauseMoment: '',
    paused: false
  };

  componentDidMount() {
    this.countDown;
    this.setState({
      seconds: 1500 // 25 minute Pomodoro Timer
    });

    this.timer(1500);
  }

  componentWillUnmount() {
    clearInterval(this.countDown);
  }

  timer(seconds) {
    clearInterval(this.countDown);

    const now = Date.now();
    const then = now + seconds * 1000;

    this.displayTimeLeft(seconds);

    this.countDown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (this.state.paused) {
        this.setState({
          pauseMoment: secondsLeft
        });
        clearInterval(this.countDown);
        return;
      }

      if (secondsLeft < 0) {
        clearInterval(this.countDown);
        vibrate();
        return;
      }

      this.displayTimeLeft(secondsLeft);
    }, 1000);
  }

  displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? '0' : ''
    }${remainderSeconds}`;

    this.setState({
      display: display
    });
  }

  onPauseToggle = () => {
    this.setState(
      {
        paused: !this.state.paused
      },
      this.resumeCountDown
    );
  };

  resumeCountDown = () => {
    if (this.state.paused === false) {
      this.timer(this.state.pauseMoment);
    }
  };

  render() {
    return (
      <View>
        <LinearGradient
          colors={['#42a5f5', '#478ed1', '#0d47a1']}
          style={styles.gradient}
        >
          <View style={styles.timer}>
            <Text style={styles.title}>Pomodoro Timer</Text>
            <Clock display={this.state.display} />
          </View>
          <Button
            onPress={this.onPauseToggle}
            title={this.state.paused ? 'Continue' : 'Pause'}
          />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height
  },
  timer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timer_controls: {
    display: 'flex'
  },
  timer_button: {
    fontSize: 26,
    padding: '1rem'
  }
});
