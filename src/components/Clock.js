import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { differenceInSeconds } from "date-fns"
import padStart from 'lodash.padstart';

import { Label } from "./Text";

const clockMaxMinutes = 999;
const clockMaxSeconds = 60 * clockMaxMinutes;

const styles = StyleSheet.create({
  clockText: {
    textAlign: "center",
  },
});

export default function Clock({ startTime, endTime, accurate }) {
  const accuracy = accurate ? 1 : 1;
  const [timeInGame, setTimeInGame] = useState(Math.floor(differenceInSeconds(endTime || Date.now(), startTime)/accuracy)*accuracy);
  useEffect(() => {
    if (!endTime && timeInGame < clockMaxSeconds) {
      const interval = setInterval(() => {
        const ellasped =  Math.floor(differenceInSeconds(Date.now(), startTime)/accuracy)*accuracy;
        if (ellasped - timeInGame >= 1) {
          setTimeInGame(ellasped);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [timeInGame]);
  const minutes = Math.min(Math.floor(timeInGame / 60), clockMaxMinutes);
  const seconds = timeInGame < clockMaxSeconds ? timeInGame % 60 : 59;
  return <Label style={styles.clockText}>{padStart(`${minutes}`, 2, '0')}:{padStart(`${seconds}`, 2, '0')}</Label>
}