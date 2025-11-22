"use client";

import { useCallback, useMemo, useState } from "react";
import styles from "./page.module.css";

const greetings = [
  "Hello",
  "Hi",
  "Hey there",
  "Howdy",
  "Hola",
  "Bonjour",
  "Ciao",
  "Namaste",
  "Salaam",
  "Ahoy",
];

const defaultMessage = "Let's craft a warm hello tailored just for you.";
type Tone = "friendly" | "professional" | "playful";

export default function Home() {
  const [name, setName] = useState("");
  const [tone, setTone] = useState<Tone>("friendly");
  const [greetingIndex, setGreetingIndex] = useState(() =>
    Math.floor(Math.random() * greetings.length),
  );

  const shuffleGreeting = useCallback(() => {
    setGreetingIndex((current) => {
      if (greetings.length === 1) {
        return current;
      }

      let next = current;
      while (next === current) {
        next = Math.floor(Math.random() * greetings.length);
      }

      return next;
    });
  }, []);

  const handleToneClick = useCallback(
    (nextTone: Tone) => () => {
      setTone(nextTone);
      shuffleGreeting();
    },
    [shuffleGreeting],
  );

  const greeting = useMemo(() => {
    const base = greetings[greetingIndex] ?? greetings[0];
    return `${base}${name ? `, ${name.trim()}` : "!"}`;
  }, [greetingIndex, name]);

  const subtext = useMemo(() => {
    if (!name) {
      return defaultMessage;
    }

    switch (tone) {
      case "professional":
        return `Extending a courteous greeting to ${name.trim()}.`;
      case "playful":
        return `${name.trim()}, hope this hello finds you grinning!`;
      default:
        return `So glad you're here, ${name.trim()}.`;
    }
  }, [name, tone]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>greeting generator</p>
          <h1 className={styles.title}>{greeting}</h1>
          <p className={styles.subtitle}>{subtext}</p>
        </section>

        <section className={styles.controls}>
          <label className={styles.field}>
            <span>Name</span>
            <input
              type="text"
              placeholder="Type a name (optional)"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <div className={styles.fieldset}>
            <p>Tone</p>
            <div className={styles.toggleGroup}>
              <button
                type="button"
                className={tone === "friendly" ? styles.active : ""}
                onClick={handleToneClick("friendly")}
              >
                Friendly
              </button>
              <button
                type="button"
                className={tone === "professional" ? styles.active : ""}
                onClick={handleToneClick("professional")}
              >
                Professional
              </button>
              <button
                type="button"
                className={tone === "playful" ? styles.active : ""}
                onClick={handleToneClick("playful")}
              >
                Playful
              </button>
            </div>
          </div>

          <button
            type="button"
            className={styles.shuffle}
            onClick={shuffleGreeting}
          >
            Shuffle greeting
          </button>
        </section>

        <footer className={styles.footer}>
          Crafted with Next.js · Tap shuffle to try another hello.
        </footer>
      </main>
    </div>
  );
}
