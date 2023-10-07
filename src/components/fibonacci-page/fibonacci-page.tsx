import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ fibonacci: "" });
  const [isButtonActive, setButtonActive] = useState(true);
  const [loader, setLoader] = useState(false);
  const [fibArray, setFibArray] = useState<number[]>([]);
  const value = Number(values.fibonacci);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setButtonActive(false);
    handleChange(e);
  };

  const calculateFibonacci = async (number: number) => {
    setButtonActive(true);
    setLoader(true);
    let arr: number[] = [];
    for (let i = 0; i <= number; i++) {
      if (i < 2) {
        arr = [1, 1];
      } else {
        arr.push(arr[i - 2] + arr[i - 1]);
      }
      setFibArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setButtonActive(false);
    setLoader(false);
    return arr;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    calculateFibonacci(value);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form name="fibonacci" className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="number"
            max={19}
            isLimitText={true}
            name="fibonacci"
            onChange={changeInput}
          />
          <Button
            text={"Рассчитать"}
            type='submit'
            disabled={isButtonActive}
            isLoader={loader}
          />
        </form>      
          <div className={styles.circles_container}>
            {fibArray.map((letter, index) => (
              <Circle
                letter={String(letter)}
                key={index}
                index={index}
              />
            ))}
          </div>
      </div>
    </SolutionLayout>
  );
};
