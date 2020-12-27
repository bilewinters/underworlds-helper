import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet } from "react-native";
import padStart from 'lodash.padstart';

import { Label } from "./Text";

const clockMaxMinutes = 999;
const clockMaxSeconds = 60 * clockMaxMinutes;

const styles = StyleSheet.create({
  clockText: {
    textAlign: "center",
  },
});

const tasks = [];
let timerId = NaN;

const startTimer = () => {
  timerId = setInterval(() => {
    tasks.forEach(task => {
      try {
        task();
      } catch (e) {}
    });
  }, 200);
}

const stopTimer = () => clearInterval(timerId);

const addTaskToTimer = (task) => {
  if (tasks.length === 0) {
    startTimer();
  }
  tasks.push(task);
  return () => {
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    if (tasks.length === 0) {
      stopTimer();
    }
  }
}

export default function Clock({ startTime, endTime }) {
  const gameStart = useMemo(() => Math.round(startTime/1000), []);
  const [secondsInGame, setTimeInGame] = useState(endTime ? Math.round(endTime/1000) - gameStart : 0);
  useEffect(() => {
    if (!endTime) {
      return addTaskToTimer(() => {
        const ellapsed = Math.round(Date.now()/1000) - gameStart;
        if (ellapsed <= clockMaxSeconds && ellapsed > secondsInGame) {
          setTimeInGame(ellapsed)
        }
      })
    }
  }, []);
  const minutes = Math.min(Math.floor(secondsInGame / 60), clockMaxMinutes);
  const seconds = secondsInGame < clockMaxSeconds ? secondsInGame % 60 : 59;
  return <Label style={styles.clockText}>{padStart(`${minutes}`, 2, '0')}:{padStart(`${seconds}`, 2, '0')}</Label>
}
