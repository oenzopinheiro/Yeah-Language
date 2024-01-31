"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SpeakerSimpleHigh } from "@phosphor-icons/react/dist/ssr";

import { Tag } from "../Tag";

const words = [
  "apple",
  "banana",
  "car",
  "dog",
  "elephant",
  "flower",
  "guitar",
  "house",
  "island",
  "jungle",
  "kangaroo",
];

interface AddStartProps {
  containerRefPosition: DOMRect;
  wordRefPosition: DOMRect;
  wordRef: HTMLDivElement;
  word: string;
}

interface AddEndProps {
  wordRefPosition: DOMRect;
  wordRef: HTMLDivElement;
  word: string;
  lastWordSelected: HTMLDivElement;
}

export function ReadOrListen() {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const containerRef = useRef<HTMLHRElement | null>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wordsSelectedRef = useRef<(HTMLDivElement | null)[]>([]);

  function updateSelectedWord(word: string, wordRef: HTMLDivElement) {
    setTimeout(() => {
      setSelectedWords([...selectedWords, word]);
      wordRef.style.display = "none";
    }, 500);
  }

  function addStart({
    containerRefPosition,
    wordRefPosition,
    wordRef,
    word,
  }: AddStartProps) {
    const y =
      wordRefPosition.y - containerRefPosition.y + wordRefPosition.height + 6;

    const x = wordRefPosition.x - containerRefPosition.x;

    wordRef.style.transform = `translate(-${x}px, -${y}px)`;
    updateSelectedWord(word, wordRef);
  }

  function addEnd({
    wordRefPosition,
    wordRef,
    word,
    lastWordSelected,
  }: AddEndProps) {
    const lastWordSelectedPosition = lastWordSelected.getBoundingClientRect();

    let x =
      wordRefPosition.x -
      lastWordSelectedPosition.x +
      (lastWordSelectedPosition.width + 8);

    let y = wordRefPosition.y - lastWordSelectedPosition.y;

    let translate = `translate(-${x}px, -${y}px)`;

    console.log(x);

    if (x < 0) {
      translate = `translate(${-1 * x}px, ${-1 * y}px)`;
    }

    wordRef.style.transform = translate;
    updateSelectedWord(word, wordRef);
  }

  function handleSelectedWord(word: string, index: number) {
    if (!containerRef.current) return;
    if (!wordsRef.current) return;

    const containerRefPosition = containerRef.current.getBoundingClientRect();

    const wordRef = wordsRef.current[index];

    if (!wordRef) return;

    const wordRefPosition = wordRef.getBoundingClientRect();

    if (selectedWords.length == 0) {
      addStart({ containerRefPosition, wordRefPosition, wordRef, word });
      return;
    }

    const lastWordSelected =
      wordsSelectedRef.current[wordsSelectedRef.current.length - 1];

    if (!lastWordSelected) return;

    addEnd({
      wordRefPosition,
      wordRef,
      word,
      lastWordSelected,
    });
  }

  function verifyWordSelected(word: string): boolean {
    return selectedWords.includes(word);
  }

  function removerWordSelected(word: string) {
    const selectedWordsFiltered = selectedWords.filter((item) => item !== word);

    setSelectedWords(selectedWordsFiltered);
  }

  return (
    <div className="min-h-full h-full w-full flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-[#3c3c3c]">
          Write this in English
        </h1>

        <div className="flex items-center gap-2">
          <Image src="/ana.svg" alt="Ana picture" height={169} width={114} />
          <div className="flex items-center gap-2 border-2 border-gray-300 py-[14px] px-[26px] rounded-2xl">
            <SpeakerSimpleHigh
              size={32}
              className="text-blue-primary focus:text-gray-600"
              weight="fill"
            />
            <span>Are you ana ?</span>
          </div>
        </div>
        <hr className="border-2" />

        <div className="mt-1 flex flex-wrap gap-2 min-h-12">
          {selectedWords.map((word) => (
            <div
              key={word}
              ref={(element) => {
                if (!element) return;

                wordsSelectedRef.current.push(element);
              }}
            >
              <Tag handleClick={() => removerWordSelected(word)}>{word}</Tag>
            </div>
          ))}
        </div>

        <hr className="border-2 mt-1" ref={containerRef} />

        <div className="flex flex-wrap gap-2 mt-7">
          {words.map((word, index) => (
            <div key={word}>
              <div
                ref={(element) => {
                  if (!element) return;

                  wordsRef.current.push(element);
                }}
                className="transition-all duration-500"
              >
                <Tag
                  selected={verifyWordSelected(word)}
                  handleClick={() => handleSelectedWord(word, index)}
                >
                  {word}
                </Tag>
              </div>
              <div
                data-disabled={verifyWordSelected(word)}
                className="transition-all duration-500 data-[disabled=true]:block data-[disabled=false]:hidden"
              >
                <Tag
                  selected={true}
                  handleClick={() => handleSelectedWord(word, index)}
                >
                  {word}
                </Tag>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
