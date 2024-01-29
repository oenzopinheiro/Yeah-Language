"use client";

import { Power } from "@phosphor-icons/react";
import { Modal } from "../Modal";
import { useState } from "react";
import Image from "next/image";

export function LogOutButton() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <Modal.Button>
        <Power size={24} weight="bold" className="text-red-400" />
      </Modal.Button>

      <Modal.Content>
        <div className="flex flex-col items-center w-full gap-4">
          <Image src="/bird.svg" alt="bird" width={120} height={120} />

          <span className="text-center font-bold text-xl text-gray-800">
            Are you sure you want to leave?
          </span>

          <button>learn more!</button>
          <a href="/api/auth/logout">leave</a>
        </div>
      </Modal.Content>
    </Modal>

    // <a href="/api/auth/logout">
    // </a>
  );
}
