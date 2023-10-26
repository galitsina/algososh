import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { delay, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

interface ISortingPageProps {
  arrLength?: number;
}

export const SortingPage: React.FC<ISortingPageProps> = ({arrLength = 3}) => {
  const [randomArray, setRandomArray] = useState<number[]>([]);
  const [loader, setLoader] = useState({
    ascendingLoader: false,
    descendingLoader: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState({
    ascendingDisabled: false,
    descendingDisabled: false,
    newArrayDisabled: false
  });
  const [selectedOption, setSelectedOption] = useState("selection-sort");
  const [isSortingFinished, setSortingFinished] = useState(false);
  const [pointers, setPointers] = useState({
    mIndex: -1,
    currentInside: -1,
    currentOutside: -1,
  });
  const { mIndex, currentInside, currentOutside } = pointers;

  useEffect(() => { createRandomArr(arrLength) }, []);
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const createRandomArr = (arrLength?: number) => {

    setPointers({
      mIndex: -1,
      currentInside: -1,
      currentOutside: -1,
    })
    const minLen = 0;
    const maxLen = 17;
    let randomArrLength = arrLength;
    if (arrLength === undefined || (arrLength < minLen || arrLength > maxLen)) {
      randomArrLength =  Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    }
    
    let randomArr = new Array(randomArrLength);
    for (let i = 0; i < randomArr.length; i++) {
      let randomNumber = Math.floor(Math.random() * 100);
      randomArr[i] = randomNumber;
    }
    setRandomArray([...randomArr]);

    return randomArr;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  //bubble sort
  const bubbleSort = async (arr: number[], direction: Direction) => {
    setSortingFinished(false);
    Direction.Descending === direction ? (setLoader({
      ascendingLoader: false,
      descendingLoader: true,
    })) : (setLoader({
      ascendingLoader: true,
      descendingLoader: false,
    }));
    setButtonDisabled({
      ascendingDisabled: true,
      descendingDisabled: true,
      newArrayDisabled: true
    });
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        setPointers({ mIndex: j + 1, currentInside: j, currentOutside: i });
        await delay(DELAY_IN_MS);
        if (
          Direction.Descending === direction
            ? arr[j] < arr[j + 1]
            : arr[j] > arr[j + 1]
        ) {
          swap(arr, j, j + 1);
        }
      }
    }
    setRandomArray([...arr]);
    Direction.Descending === direction ? (setLoader({
      ...loader,
      descendingLoader: false,
    })) : (setLoader({
      ...loader,
      ascendingLoader: false,
    }));
    setButtonDisabled({
      ascendingDisabled: false,
      descendingDisabled: false,
      newArrayDisabled: false
    });
    setSortingFinished(true);
    return arr;
  };

  //selection sort
  const selectionSort = async (arr: number[], direction: Direction) => {
    setSortingFinished(false);
    Direction.Descending === direction ? (setLoader({
      ascendingLoader: false,
      descendingLoader: true,
    })) : (setLoader({
      ascendingLoader: true,
      descendingLoader: false,
    }));
    setButtonDisabled({
      ascendingDisabled: true,
      descendingDisabled: true,
      newArrayDisabled: true
    });
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let index = i;
      for (let j = i; j < length; j++) {
        setPointers({ mIndex: index, currentInside: j, currentOutside: i });
        await delay(DELAY_IN_MS);
        if (
          Direction.Descending === direction
            ? arr[j] > arr[index]
            : arr[j] < arr[index]
        ) {
          index = j;
        }
      }
      swap(arr, i, index);
    }
    setRandomArray([...arr]);
    Direction.Descending === direction ? (setLoader({
      ...loader,
      descendingLoader: false,
    })) : (setLoader({
      ...loader,
      ascendingLoader: false,
    }));
    setButtonDisabled({
      ascendingDisabled: false,
      descendingDisabled: false,
      newArrayDisabled: false
    });
    setSortingFinished(true);
    return arr;
  };

  const defineColor = (index: number): ElementStates => {
    if (mIndex === -1 || currentInside === -1 || currentOutside === -1) {
      return ElementStates.Default;
    }
    if (isSortingFinished) {
      return ElementStates.Modified;
    }
    if (mIndex === index || currentInside === index) {
      return ElementStates.Changing;
    }
    if (selectedOption === "selection-sort" ? (index < currentOutside) : (index > randomArray.length - 1 - currentOutside)) {
      return ElementStates.Modified;
    } else {
      return ElementStates.Default;
    }
  };

  const handleDescendingSorting = () => {
    if (selectedOption === "selection-sort") {
      selectionSort(randomArray, Direction.Descending);
    };
    if (selectedOption === "bubble-sort") {
      bubbleSort(randomArray, Direction.Descending);
    };

  };

  const handleAscendingSorting = () => {
    if (selectedOption === "selection-sort") {
      selectionSort(randomArray, Direction.Ascending);
    };
    if (selectedOption === "bubble-sort") {
      bubbleSort(randomArray, Direction.Ascending);
    };
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <form name="sorting" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_item}>
            <RadioInput
              label="Выбор"
              value="selection-sort"
              name="choice"
              checked={selectedOption === "selection-sort"}
              onChange={handleOptionChange}
            />
            <RadioInput
              label="Пузырёк"
              value="bubble-sort"
              name="choice"
              checked={selectedOption === "bubble-sort"}
              onChange={handleOptionChange}
              extraClass={styles.extra_margin}
            />
          </div>
          <div className={styles.form_item}>
            <Button
              onClick={handleAscendingSorting}
              text={"По возрастанию"}
              type="submit"
              disabled={buttonDisabled.ascendingDisabled}
              isLoader={loader.ascendingLoader}
              sorting={Direction.Ascending}
              extraClass={styles.button}
            />
            <Button
              onClick={handleDescendingSorting}
              text={"По убыванию"}
              type="submit"
              disabled={buttonDisabled.descendingDisabled}
              isLoader={loader.descendingLoader}
              sorting={Direction.Descending}
              extraClass={styles.button}
            />
          </div>
          <Button
            onClick={() => {createRandomArr(arrLength)}}
            text={"Новый массив"}
            type="submit"
            disabled={buttonDisabled.newArrayDisabled}
            extraClass={`${styles.button} ${styles.extra_margin}`}
          />
        </form>
        <div className={styles.arr_items}>
          {randomArray.map((item, index) => (
            <div key={index} data-testid={`column-${index}`}>
              <Column index={item} state={defineColor(index)} />
            </div>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
