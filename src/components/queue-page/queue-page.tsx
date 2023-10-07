import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./class-queue";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState(new Queue<string>(7));
  const [colorState, setColorState] = useState({
    tail: ElementStates.Default,
    head: ElementStates.Default});
  const { values, handleChange, setValues } = useForm({ queue: "" });
  const [isButtonActive, setButtonActive] = useState({ add: false, delete: false, clear: false });
  const [loader, setLoader] = useState({ add: false, delete: false, clear: false });
  const value = values.queue;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const add = async () => {
    setButtonActive({ add: true, delete: true, clear: true });
    setLoader({ ...loader, add: true });
    queue.enqueue(value);
    setQueue(queue);
    setValues({ queue: "" });
    setColorState({...colorState, tail: ElementStates.Changing});
    await delay(SHORT_DELAY_IN_MS);
    setColorState({...colorState, tail: ElementStates.Default});
    setButtonActive({ add: false, delete: false, clear: false });
    setLoader({ ...loader, add: false });
  }

  const deleteHead = async () => {
    setButtonActive({ add: true, delete: true, clear: true });
    setLoader({ ...loader, delete: true });
    setColorState({...colorState, head: ElementStates.Changing});
    await delay(SHORT_DELAY_IN_MS);
    setColorState({...colorState, head: ElementStates.Default});
    queue.dequeue();
    setQueue(queue);
    setValues({ queue: "" });
    setButtonActive({ add: false, delete: false, clear: false });
    setLoader({ ...loader, delete: false });
  }
  const clearAll = async () => {
    setQueue(new Queue<string>(7));
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <form name="queue" className={styles.form} onSubmit={handleSubmit}>
          <Input maxLength={4} value={value} isLimitText={true} name="queue" onChange={changeInput} />
          <Button onClick={add} text={"Добавить"} type="button" disabled={isButtonActive.add} isLoader={loader.add} />
          <Button onClick={deleteHead} text={"Удалить"} type="button" disabled={isButtonActive.delete} isLoader={loader.delete} />
          <Button onClick={clearAll} text={"Очистить"} type="button" extraClass={styles.margin_left} disabled={isButtonActive.clear} isLoader={loader.clear} />
        </form>
        <div className={styles.circles_container}>
          {queue.items.map((item, index) => {
            const wrappedLetter = item ? item : undefined;
            let wrappedColor;
            if (queue.tail - 1 === index) {
              wrappedColor = colorState.tail;
            } else if (queue.head === index) {
              wrappedColor = colorState.head;
            }
            return (<Circle 
              letter={wrappedLetter} 
              key={index} 
              index={index} 
              state={wrappedColor} 
              tail={queue.tail - 1 === index ? "tail" : ""} 
              head={!queue.isEmpty() && queue.head === index ? "head" : ""} />)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
