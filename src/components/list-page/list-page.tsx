import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "", index: "" });
  const [isButtonActive, setButtonActive] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form name="linked-list" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_container}>
            <Input maxLength={4} isLimitText={true} name="value" onChange={changeInput} extraClass = {styles.input_width} placeholder = "Введите значение"/>
            <Button text={"Добавить в head"} type="button" disabled={isButtonActive} isLoader={loader} />
            <Button text={"Добавить в tail"} type="button" disabled={isButtonActive} isLoader={loader} />
            <Button text={"Удалить из head"} type="button" disabled={isButtonActive} isLoader={loader} />
            <Button text={"Удалить из tail"} type="button" disabled={isButtonActive} isLoader={loader} />
          </div>
          <div className={styles.form_container}>
            <Input name="index" onChange={changeInput} extraClass = {styles.input_width} placeholder = "Введите индекс"/>
            <Button text={"Добавить по индексу"} type="button" disabled={isButtonActive} isLoader={loader} extraClass = {styles.button_width}/>
            <Button text={"Удалить по индексу"} type="button" disabled={isButtonActive} isLoader={loader} extraClass = {styles.button_width}/>
          </div>
        </form>
        {
          <div className={styles.circles_container}>
            <Circle letter={"1"} key={1} tail={"1"} />
            <Circle letter={"2"} key={2} tail={"2"} />
          </div>
        }
      </div>
    </SolutionLayout>
  );
};
