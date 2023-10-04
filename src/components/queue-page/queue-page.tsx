import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ queue: "" });
  const [isButtonActive, setButtonActive] = useState({add: false, delete: false, clear: false});
  const [loader, setLoader] = useState({add: false, delete: false, clear: false});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <form name="queue" className={styles.form} onSubmit={handleSubmit}>
          <Input maxLength={4} isLimitText={true} name="queue" onChange={changeInput}/>
          <Button text={"Добавить"} type="button" disabled={isButtonActive.add} isLoader={loader.add}/>
          <Button text={"Удалить"} type="button" disabled={isButtonActive.delete} isLoader={loader.delete}/>
          <Button text={"Очистить"} type="button" extraClass={styles.margin_left} disabled={isButtonActive.clear} isLoader={loader.clear}/>
        </form>
          <div className={styles.circles_container}>
            <Circle letter={"1"} key={1} tail={"1"} />
            <Circle letter={"2"} key={2} tail={"2"} />
          </div>
      </div>
    </SolutionLayout>
  );
};
