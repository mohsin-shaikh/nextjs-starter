"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Button onClick={() => alert()}>Button</Button>
    </div>
  );
}
