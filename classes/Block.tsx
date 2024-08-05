import { BLOCKS, BlockType } from "@/constants/GameProps";
import { View, ViewStyle } from "react-native";
import React from "react";
import { Text } from "@/components/Themed";

enum PropName {
  one = "one",
  two = "two",
  three = "three",
}

class Block {
  x: number;
  y: number;
  template: BlockType;
  blockSize: number;
  color: string;
  element: JSX.Element;
  value: number = 0;
  queue: PropName = PropName.one;

  constructor(
    x: number,
    y: number,
    template: BlockType,
    size: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.template = template;
    this.blockSize = size;
    this.color = color;
    this.element = this.createBlock();
  }

  getElement() {
    return this.element;
  }

  setValue(value: number) {
    this.value = value;
  }

  remove() {
    this.element = <></>;
  }

  setColor(color: string) {
    this.color = color;
    this.element = this.createBlock();
    this.value = 1;
  }

  private createBlock(): JSX.Element {
    const style: ViewStyle = {
      borderWidth: 1,
      borderColor: "#4444FF30",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: this.color,
      width: this.blockSize,
      height: this.blockSize,
    };

    return (
      <View style={style}>{/* <Text>{`${this.x}-${this.y}`}</Text> */}</View>
    );
  }

  setElement(blockType: any, element: any) {
    const blockShape = BLOCKS[blockType];
    this.template = blockShape;
    this.element = element;
  }
}

export default Block;
