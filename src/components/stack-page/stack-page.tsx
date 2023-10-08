import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./class-stack";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stackArray, setStackArray] = useState<string[]>([]);
  const stack = new Stack<string>(stackArray);
  const { values, handleChange, setValues } = useForm({ stack: "" });
  const [isButtonActive, setButtonActive] = useState({ add: true, delete: true, clear: true });
  const [loader, setLoader] = useState({add: false, delete: false, clear: false});
  const value = values.stack;
  const [colorState, setColorState] = useState(ElementStates.Default);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setButtonActive({ add: false, delete: false, clear: false });
  };

  const add = async () => {
    setButtonActive({add: true, delete: true, clear: true});
    setLoader({...loader, add: true});
    stack.push(value);
    setStackArray(stack.items);
    setValues({ stack: "" });
    setColorState(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setColorState(ElementStates.Default);
    setButtonActive({add: false, delete: false, clear: false});
    setLoader({...loader, add: false});
  }

  const deleteTop = async () => {
    setButtonActive({add: true, delete: true, clear: true});
    setLoader({...loader, delete: true});
    setColorState(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setColorState(ElementStates.Default);
    stack.pop();
    setStackArray(stack.items);
    setValues({ stack: "" });
    setButtonActive({add: false, delete: false, clear: false});
    setLoader({...loader, delete: false});
    if (stack.items.length === 0) {
      setButtonActive({add: false, delete: true, clear: true});
    }
  }

  const clearAll = () => {
    stack.clear();
    setStackArray(stack.items);
    setButtonActive({ add: false, delete: true, clear: true });
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form name="stack" className={styles.form} onSubmit={handleSubmit}>
          <Input
            maxLength={4}
            isLimitText={true}
            name="stack"
            value={value}
            onChange={changeInput}
          />
          <Button
            onClick={add}
            text={"Добавить"}
            type="button"
            disabled={isButtonActive.add}
            isLoader={loader.add}
          />
          <Button
            onClick={deleteTop}
            text={"Удалить"}
            type="button"
            disabled={isButtonActive.delete}
            isLoader={loader.delete}
          />
          <Button
            onClick={clearAll}
            text={"Очистить"}
            type="button"
            extraClass={styles.margin_left}
            disabled={isButtonActive.clear}
            isLoader={loader.clear}
          />
        </form>
        <div className={styles.circles_container}>
          {stackArray.map((letter, index) => (
            <Circle state={stackArray.length - 1 === index ? colorState : ElementStates.Default} letter={letter} key={index} index={index} head={stackArray.length - 1 === index ? 'top' : ''} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
