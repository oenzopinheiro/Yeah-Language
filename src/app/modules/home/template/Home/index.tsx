"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { Unit } from "../../models/unit";
import { useState } from "react";
import { generateSlug } from "@/tools/generateSlug";

interface HomeTemplateProps {
  units: Unit[];
}

const card = tv({
  slots: {
    container: [
      "w-full bg-green-100 border border-green-900",
      "rounded-xl p-4 text-left flex flex-col cursor-pointer",
    ],

    title: ["text-green-900 font-bold"],
    subTitle: ["text-gray-700 line-clamp-2"],
  },
});

export function HomeTemplate({ units }: HomeTemplateProps) {
  const { container, title, subTitle } = card();

  return (
    <section className="max-w-5xl p-1 m-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
        {units.map((unit) => (
          <Link
            key={unit.id}
            href={`/challenge/${generateSlug(unit.title)}`}
            className={container()}
          >
            <span className={title()}>{unit.title}</span>
            <span className={subTitle()}>{unit.contents.join(", ")}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
