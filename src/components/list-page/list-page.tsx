import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./class-list-page";

interface IAnimationState {
  colorArray?: [string, ElementStates][],
  removeCircle?: [number, React.ReactElement],
  addCircle?: [number, React.ReactElement]
}

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "", index: "" });
  const [isButtonActive, setButtonActive] = useState({
    addHead: true,
    addTail: true,
    deleteHead: false,
    deleteTail: false,
    addByIndex: true,
    deleteByIndex: true 
  });
  const [loader, setLoader] = useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addByIndex: false,
    deleteByIndex: false 
  });
  const array = ["0", "34", "8", "1"];
  const [linkedList, setLinkedList] = useState<LinkedList<string>>(new LinkedList<string>(array));

  const value = values.value;
  const index = values.index;
  const indexTypeNumber = Number(index);

  const [animationState, setAnimationState] = useState<IAnimationState>({
    colorArray: linkedList.toArray().map(item => [item, ElementStates.Default])
  });
  const {colorArray, removeCircle, addCircle } = animationState;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setButtonActive({...isButtonActive, addHead: false, addTail: false, deleteHead: false, deleteTail: false});
  };
  const changeInputIndex = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setButtonActive({addHead: false, addTail: false, deleteHead: false, deleteTail: false, addByIndex: false, deleteByIndex: false});
    if (Number(e.target.value) > animationState.colorArray!.length -1) {
      setButtonActive({addHead: false, addTail: false, deleteHead: false, deleteTail: false, addByIndex: true, deleteByIndex: true});
    }
  };

  const addHead = async () => {
    setButtonActive({...isButtonActive, addHead: true, addTail: true, deleteHead: true, deleteTail: true});
    setLoader({ ...loader, addHead: true });
    linkedList.prepend(value);
    setLinkedList(linkedList);
    setValues({ value: "", index: "" });
    const frames: IAnimationState[] = [];
    frames.push({addCircle: [0, (<Circle isSmall={true} state={ElementStates.Changing} letter={value}/>)]});
    let tmpArray: [string, ElementStates][] = linkedList.toArray().map((item, index) => {
      if (index === 0) {
        return [item, ElementStates.Modified]
      }
      return [item, ElementStates.Default]
    });
    frames.push({addCircle: undefined, colorArray: tmpArray});
    frames.push({colorArray: tmpArray.map(item => [item[0], ElementStates.Default])});
    for(let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      setAnimationState({...animationState, ...frame});
      await delay(SHORT_DELAY_IN_MS);
    }
    setButtonActive({...isButtonActive, addHead: false, addTail: false, deleteHead: false, deleteTail: false});
    setLoader({ ...loader, addHead: false });
  }
  const addTail = async () => {
    setButtonActive({...isButtonActive, addHead: true, addTail: true, deleteHead: true, deleteTail: true});
    setLoader({ ...loader, addTail: true });
    linkedList.append(value);
    setValues({ value: "", index: "" });
    const size = linkedList.toArray().length;
    const frames: IAnimationState[] = [];
    frames.push({addCircle: [size -2, (<Circle isSmall={true} state={ElementStates.Changing} letter={value}/>)]});
    let tmpArray: [string, ElementStates][] = linkedList.toArray().map((item, index) => {
      if (index === size-1){
        return [item, ElementStates.Modified]
      }
      return [item, ElementStates.Default]}
    );
    frames.push({addCircle: undefined, colorArray: tmpArray});
    frames.push({colorArray: tmpArray.map(item => [item[0], ElementStates.Default])});
    for(let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      setAnimationState({...animationState, ...frame});
      await delay(SHORT_DELAY_IN_MS);
    }
    setButtonActive({...isButtonActive, addHead: false, addTail: false, deleteHead: false, deleteTail: false});
    setLoader({ ...loader, addTail: false });
  }

  const deleteHead = async () => {
    setButtonActive({...isButtonActive, addHead: true, addTail: true, deleteHead: true, deleteTail: true});
    setLoader({ ...loader, deleteHead: true });
    const prevHead = linkedList.deleteHead();
    setValues({ value: "", index: "" });
    const frames: IAnimationState[] = [];
    const removeCircle: [number, React.ReactElement] = [0, (<Circle isSmall={true} state={ElementStates.Changing} letter={prevHead?.value}/>)]
    frames.push({removeCircle});
    frames.push({colorArray: linkedList.toArray().map(item => [item, ElementStates.Default])})
    for(let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      setAnimationState({...animationState, ...frame});
      await delay(SHORT_DELAY_IN_MS);
    }
    setButtonActive({...isButtonActive, addHead: false, addTail: false, deleteHead: false, deleteTail: false});
    setLoader({ ...loader, deleteHead: false });
  }

  const deleteTail = async () => {
    setButtonActive({...isButtonActive, addHead: true, addTail: true, deleteHead: true, deleteTail: true});
    setLoader({ ...loader, deleteTail: true });
    const prevTail = linkedList.deleteTail();
    setValues({ value: "", index: "" });
    const frames: IAnimationState[] = [];
    let index = colorArray ? colorArray.length-1 : -1
    const removeCircle: [number, React.ReactElement] = [index, (<Circle isSmall={true} state={ElementStates.Changing} letter={prevTail?.value}/>)]
    frames.push({removeCircle});
    frames.push({colorArray: linkedList.toArray().map(item => [item, ElementStates.Default])})
    for(let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      setAnimationState({...animationState, ...frame});
      await delay(SHORT_DELAY_IN_MS);
    }
    setButtonActive({...isButtonActive, addHead: false, addTail: false, deleteHead: false, deleteTail: false});
    setLoader({ ...loader, deleteTail: false });
  }

  const addByIndex = async () => {
    setButtonActive({addHead: true, addTail: true, deleteHead: true, deleteTail: true, addByIndex: true, deleteByIndex: true});
    setLoader({ ...loader, addByIndex: true });
    linkedList.addByIndex(value, indexTypeNumber);
    setValues({ value: "", index: "" });
    const frames: IAnimationState[] = [];
    const valArray = linkedList.toArray();
    for (let i = 0; i <= indexTypeNumber; i++) {
      const tmpArray: [string, ElementStates][] = colorArray!.map((item, index) => {
        if (index < i) {
          return [item[0], ElementStates.Changing];
        }
        return item;
      })
      frames.push({addCircle: [i, (<Circle isSmall={true} state={ElementStates.Changing} letter={value}/>)], colorArray: tmpArray});
    }
    frames.push({addCircle: undefined, colorArray: valArray.map(item => {
      if (item === value) {
        return [item, ElementStates.Modified]
      }
      return [item, ElementStates.Default]
    })});
    frames.push({colorArray: valArray.map(item => [item, ElementStates.Default])});
    for(let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      setAnimationState({...animationState, ...frame});
      await delay(SHORT_DELAY_IN_MS);
    }
    setButtonActive({addHead: false, addTail: false, deleteHead: false, deleteTail: false, addByIndex: false, deleteByIndex: false});
    setLoader({ ...loader, addByIndex: false });
  }

  const deleteByIndex = async () => {
    setButtonActive({addHead: true, addTail: true, deleteHead: true, deleteTail: true, addByIndex: true, deleteByIndex: true});
    setLoader({ ...loader, deleteByIndex: true });
    linkedList.deleteByIndex(indexTypeNumber);
    setValues({ value: "", index: "" });
    const frames: IAnimationState[] = [];
    const valArray = linkedList.toArray();
    for (let i = 0; i <= indexTypeNumber; i++) {
      const tmpArray: [string, ElementStates][] = colorArray!.map((item, index) => {
        if (index <= i) {
          return [item[0], ElementStates.Changing];
        }
        return item;
      })
      frames.push({colorArray: tmpArray});
    }
    frames.push({removeCircle: [indexTypeNumber, (<Circle isSmall={true} state={ElementStates.Changing} letter={value}/>)], colorArray: colorArray!.map((item, i) => {
      if (i < indexTypeNumber) {
        return [item[0], ElementStates.Changing]
      }
      return [item[0], ElementStates.Default]
    })});
    frames.push({removeCircle: undefined, colorArray: valArray.map(item => [item, ElementStates.Default])});
    for(let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      setAnimationState({...animationState, ...frame});
      await delay(SHORT_DELAY_IN_MS);
    }
    setButtonActive({addHead: false, addTail: false, deleteHead: false, deleteTail: false, addByIndex: false, deleteByIndex: false});
    setLoader({ ...loader, deleteByIndex: false });
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form name="linked-list" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_container}>
            <Input value={value} maxLength={4} isLimitText={true} name="value" onChange={changeInputValue} extraClass={styles.input_width} placeholder="Введите значение" />
            <Button onClick={addHead} text={"Добавить в head"} type="button" disabled={isButtonActive.addHead} isLoader={loader.addHead} />
            <Button onClick={addTail} text={"Добавить в tail"} type="button" disabled={isButtonActive.addTail} isLoader={loader.addTail} />
            <Button onClick={deleteHead} text={"Удалить из head"} type="button" disabled={isButtonActive.deleteHead} isLoader={loader.deleteHead} />
            <Button onClick={deleteTail} text={"Удалить из tail"} type="button" disabled={isButtonActive.deleteTail} isLoader={loader.deleteTail} />
          </div>
          <div className={styles.form_container}>
            <Input value={index} name="index" onChange={changeInputIndex} extraClass={styles.input_width} placeholder="Введите индекс" type="number" />
            <Button onClick={addByIndex} text={"Добавить по индексу"} type="button" disabled={isButtonActive.addByIndex} isLoader={loader.addByIndex} extraClass={styles.button_width} />
            <Button onClick={deleteByIndex} text={"Удалить по индексу"} type="button" disabled={isButtonActive.deleteByIndex} isLoader={loader.deleteByIndex} extraClass={styles.button_width} />
          </div>
        </form>
        <div className={styles.circles_container}>
          {colorArray?.map((item, index) => {
            
            const color = item[1];
            const isHead = index === 0;
            const isTail = index === colorArray.length - 1;
            const tail = isTail ? "tail" : "";
            const head = isHead ? "head" : "";
            let letter = item[0];
            let removeCircleIndex = -1;
            let addCircleIndex = -1;
            if(removeCircle) {
              removeCircleIndex = removeCircle[0]
            }
            if(addCircle) {
              addCircleIndex = addCircle[0]
            }
            return (
            <div key={index} className={styles.circle_wrapper}>
              <Circle 
              letter={removeCircleIndex === index ? "" : letter}         
              index={index} 
              tail={removeCircleIndex === index ? removeCircle![1] : tail}
              head={addCircleIndex === index ? addCircle![1] : head} 
              state={color}
              />
              {!isTail && <ArrowIcon/>}
            </div>
          )})}
        </div>
      </div>
    </SolutionLayout>
  );
};
