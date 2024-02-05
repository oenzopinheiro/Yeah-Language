"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../../share/components/Button";
import { Footer, FooterVariant } from "../components/Footer";
import { ProgressBar } from "../components/ProgressBar";
import { ReadOrListen } from "../components/ReadOrListen";
import { Chat } from "../models/chat";
import { useEffect, useState } from "react";

interface TemplateChallengeProps {
  sentences: Chat[];
}

export function TemplateChallenge({
  sentences: sentencesFromChat,
}: TemplateChallengeProps) {
  const [sentence, setSentence] = useState<Chat>({} as Chat);
  const [footerVariant, setFooterVariant] = useState<FooterVariant>(
    FooterVariant.NORMAL
  );

  const [selectedSentence, setselectedSentence] = useState("");
  const [sentences, setSentences] = useState<Chat[]>(sentencesFromChat);

  useEffect(() => {
    getRandomSentence();
  }, []);

  useEffect(() => {
    createSynthesis();
  }, []);

  function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const sentence = sentences[randomIndex];
    setSentence(sentence);
  }

  function createSynthesis() {
    const speechSynthesis =
      window.speechSynthesis || (window as any).webKitSpeechSynthesis;

    return speechSynthesis;
  }

  function speak(text: string, rate = 1) {
    const speechSynthesis = createSynthesis();
    const speechSynthesisUtterance = new SpeechSynthesisUtterance();

    const voice = speechSynthesis
      .getVoices()
      .find((voice) => voice.name === "Nicky");

    speechSynthesisUtterance.text = text;
    speechSynthesisUtterance.lang = "en-US";
    speechSynthesisUtterance.rate = rate;
    speechSynthesisUtterance.voice = voice ?? null;

    speechSynthesis.speak(speechSynthesisUtterance);
  }

  function handleSelectedSentence(selectedSentence: string) {
    setselectedSentence(selectedSentence);
  }

  function checkCorrectSentence() {
    if (selectedSentence == sentence.portuguese) {
      setFooterVariant(FooterVariant.SUCCESS);
      playAudio("success");
      const newSentences = sentences.filter(
        (sentenceItem) => sentence.id != sentence.id
      );
      setSentences(newSentences);

      return;
    }

    setFooterVariant(FooterVariant.ERROR);
    playAudio("error");
  }

  function playAudio(name: string) {
    new Audio(`/${name}.wav`).play();
  }

  return (
    <div className="min-h-full w-full mx-aut mt-10 h-screen">
      <div className="max-w-5xl flex md:gap-5 justify-between items-center flex-1 mx-auto w-full px-4">
        <div className="flex w-full gap-3 items-center">
          <X size={30} />

          <ProgressBar progress={80} />
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 px-4 mb-14">
        <ReadOrListen
          chat={sentence}
          speak={speak}
          handleSelectedSentence={handleSelectedSentence}
        />
      </div>
      <Footer variant={footerVariant}>
        {footerVariant == FooterVariant.NORMAL && (
          <Footer.Normal handleCheck={checkCorrectSentence} />
        )}

        {footerVariant == FooterVariant.SUCCESS && (
          <Footer.Success handleClick={getRandomSentence} />
        )}

        {footerVariant == FooterVariant.ERROR && (
          <Footer.Error handleClick={getRandomSentence} />
        )}
      </Footer>
    </div>
  );
}
