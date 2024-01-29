"use client";

import { useState } from "react";
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

export function ReadOrListen() {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  function handleSelectedWord(word: string) {
    setSelectedWords([...selectedWords, word]);
  }

  function verifyWordSelected(word: string): boolean {
    return selectedWords.includes(word);
  }

  function removeWordSelected(word: string) {
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

        <div className="mt-1 flex flex-wrap gap-2">
          {selectedWords.map((word) => (
            <Tag key={word}>{word}</Tag>
          ))}
        </div>

        <hr className="border-2 mt-1" />

        <div className="flex flex-wrap gap-2 mt-7">
          {words.map((word) => (
            <Tag key={word} handleClick={() => handleSelectedWord(word)}>
              {word}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
