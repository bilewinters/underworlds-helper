import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";

import { InitiativeToken, largeToken } from "@/components/Token";
import { Title } from "@/components/Text";
import tokens from "@design/tokens";

const initiativePadding = 8;

const InitiativeValue = ({
  value,
  position: { driver, offset },
  disabled,
  selected,
  onInitiativeSelect,
}) => {
  const yOffset =
    offset * largeToken.height +
    offset * initiativePadding +
    largeToken.height / 2;
  return (
    <Animated.View
      style={{
        zIndex: selected ? 3 : 2,
        position: "absolute",
        transform: [
          {
            translateY: driver.interpolate({
              inputRange: [0, 100],
              outputRange: [0, yOffset],
            }),
          },
        ],
      }}
    >
      <InitiativeToken
        value={value}
        selected={selected}
        disabled={disabled}
        onPress={onInitiativeSelect}
      >
        <Title style={{ bottom: Platform.OS === "ios" ? -2 : undefined }}>
          {value}
        </Title>
      </InitiativeToken>
    </Animated.View>
  );
};

export default function Initiative({
  position,
  initiative,
  onInitiativeSelect,
  startOpen,
}) {
  const { width, height } = largeToken;
  const val = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const toggleInitiativeSelection = () =>
    Animated.timing(val, {
      toValue: open ? 0 : 100,
      useNativeDriver: false,
      duration: 500,
    }).start(() => setOpen(!open));
  const onSelect = (initiativeVlaue) => {
    onInitiativeSelect(initiativeVlaue);
    toggleInitiativeSelection();
  };

  useEffect(() => {
    if (startOpen) {
      toggleInitiativeSelection();
    }
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        height: (height + initiativePadding) * 6 + height / 2,
      }}
    >
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={toggleInitiativeSelection}
      >
        <Animated.View
          style={{
            ...largeToken,
            borderWidth: 3,
            position: "absolute",
            backgroundColor: tokens.color.primary,
            borderColor: tokens.color.border,
            height: val.interpolate({
              inputRange: [0, 100],
              outputRange: [
                height,
                (height + initiativePadding) * 6 + height / 2,
              ],
            }),
            width: val.interpolate({
              inputRange: [0, 100],
              outputRange: [width, width * 2],
            }),
            transform: [
              {
                translateY: val.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -height * 3],
                }),
              },
            ],
          }}
        >
          <InitiativeValue
            value={1}
            position={{ driver: val, offset: -3 }}
            disabled={!open}
            selected={initiative === 1}
            onInitiativeSelect={onSelect}
          />
          <InitiativeValue
            value={2}
            position={{ driver: val, offset: -2 }}
            disabled={!open}
            selected={initiative === 2}
            onInitiativeSelect={onSelect}
          />
          <InitiativeValue
            value={3}
            position={{ driver: val, offset: -1 }}
            disabled={!open}
            selected={initiative === 3}
            onInitiativeSelect={onSelect}
          />
          <InitiativeValue
            value={4}
            position={{ driver: val, offset: 0 }}
            disabled={!open}
            selected={initiative === 4}
            onInitiativeSelect={onSelect}
          />
          <InitiativeValue
            value={5}
            position={{ driver: val, offset: 1 }}
            disabled={!open}
            selected={initiative === 5}
            onInitiativeSelect={onSelect}
          />
          <InitiativeValue
            value={6}
            position={{ driver: val, offset: 2 }}
            disabled={!open}
            selected={initiative === 6}
            onInitiativeSelect={onSelect}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
