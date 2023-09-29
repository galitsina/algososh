import React, { FormEvent, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const { handleChange } = useForm({ string: "" });
  const [pointers, setPointers] = useState({ start: -1, end: -1 });
  const [letters, setLetters] = useState<string[]>([]);
  const [isButtonActive, setButtonActive] = useState(false);

  const { start, end } = pointers;

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setLetters(e.target.value.split(""));
    setPointers({ start: -1, end: -1 });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    reverseString(letters);
  };

  const reverseString = async (arr: string[]) => {
    setButtonActive(true);
    let start = 0;
    let end = arr.length - 1;
    
    while (start < end) {
      setPointers({start, end});
      await delay(DELAY_IN_MS);
      swap(arr, start, end);
      await delay(DELAY_IN_MS);

      start++;
      end--;
    }
    start++
    setPointers({start, end});
    setButtonActive(false);
    return arr;
  };

  const defineColor = (index: number): ElementStates => {
    let state;
    if ((start === -1) || (end === -1)) {
      return ElementStates.Default;
    }
    if ((index < start) || (index > end)) {
      state = ElementStates.Modified;
    } else if ((index === start) || (index === end)) {
      state = ElementStates.Changing;
    } else {
      state = ElementStates.Default;
    }
    return state;
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form name="string" className={styles.form} onSubmit={handleSubmit}>
          <Input
            maxLength={11}
            isLimitText={true}
            name="string"
            onChange={changeInput}
          />
          <Button
            text={"Развернуть"}
            type='submit'
            disabled={isButtonActive}
            isLoader={isButtonActive}
          />
        </form>
        {Boolean(letters) && (
          <div className={styles.circles_container}>
            {letters.map((letter, index) => (
              <Circle state={defineColor(index)} letter={letter} key={index} />
            ))}
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
