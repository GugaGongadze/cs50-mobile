import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import { vibrate } from './utils';
import Clock from './components/Clock';

export default class App extends Component {
  state = {
    defaultWorkTime: 10,
    defaultBreakTime: 5,
    seconds: '',
    minutes: '',
    display: '',
    pauseMoment: '',
    paused: false,
    breakTime: false
  };

  componentDidMount() {
    this.countDown;
    this.setState(
      {
        seconds: this.state.defaultWorkTime // 25 minute Pomodoro Timer
      },
      this.startCountDown
    );
  }

  startCountDown() {
    this.timer(this.state.seconds);
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
        this.setState(
          {
            breakTime: !this.state.breakTime
          },
          this.displayNewTimer
        );
        return;
      }

      this.displayTimeLeft(secondsLeft);
    }, 1000);
  }

  displayNewTimer() {
    if (this.state.breakTime) {
      this.timer(this.state.defaultBreakTime);
    } else {
      this.timer(this.state.defaultWorkTime);
    }
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

  resumeCountDown = () => {
    if (this.state.paused === false) {
      this.timer(this.state.pauseMoment);
    }
  };

  onPauseToggle = () => {
    this.setState(
      {
        paused: !this.state.paused
      },
      this.resumeCountDown
    );
  };

  onClearPress = () => {
    clearInterval(this.countDown);
    this.setState(
      {
        seconds: this.state.defaultWorkTime,
        pauseMoment: this.state.defaultWorkTime,
        breakTime: false,
        paused: true
      },
      this.displayTimeLeft(this.state.seconds)
    );
  };

  render() {
    const { paused, display, breakTime } = this.state;

    return (
      <View>
        <LinearGradient
          colors={['#42a5f5', '#478ed1', '#0d47a1']}
          style={styles.gradient}
        >
          <View style={styles.timer}>
            <Text style={styles.title}>
              {breakTime ? 'Break Timer' : 'Work Timer'}
            </Text>
            <Clock display={display} />
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={this.onPauseToggle}
              title={paused ? 'Continue' : 'Pause'}
            />
            <Button onPress={this.onClearPress} title="Clear" />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
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
