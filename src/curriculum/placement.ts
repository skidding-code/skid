import type { Track } from "./types";

/**
 * A lightweight placement quiz. Each question maps to the chapter you should
 * START at if you miss it. Questions are ordered easy → hard, so the
 * recommendation is the first chapter whose question you got wrong — everything
 * before it you've shown you already know.
 */
export interface PlacementQ {
  prompt: string;
  code?: string;
  options: string[];
  /** index into `options` of the correct answer */
  answer: number;
  /** chapter to recommend starting at if this question is missed */
  chapterId: string;
  concept: string;
}

export const PLACEMENT: Record<Track, PlacementQ[]> = {
  python: [
    { concept: "Printing", chapterId: "py-basics", answer: 1,
      prompt: "Which line prints the word Hello?",
      options: ['echo "Hello"', 'print("Hello")', 'console.log("Hello")', 'printf Hello'] },
    { concept: "Decisions", chapterId: "py-decisions", answer: 2, code: "score = 80",
      prompt: "Which correctly checks if score is at least 60?",
      options: ["when score >= 60:", "if score => 60:", "if score >= 60:", "if (score gt 60)"] },
    { concept: "Loops", chapterId: "py-loops", answer: 0,
      prompt: "Which prints the numbers 0, 1, 2?",
      options: ["for i in range(3):\n    print(i)", "for i = 0 to 2:", "loop 3: print(i)", "repeat(3, print)"] },
    { concept: "Lists", chapterId: "py-collections", answer: 3, code: "nums = [10, 20, 30]",
      prompt: "How do you get the first item (10)?",
      options: ["nums.first", "nums(0)", "nums{0}", "nums[0]"] },
    { concept: "Functions", chapterId: "py-functions", answer: 1,
      prompt: "Which defines a function named greet?",
      options: ["function greet() {}", "def greet():", "func greet()", "define greet:"] },
    { concept: "Classes", chapterId: "py-classes", answer: 2,
      prompt: "Which defines a class named Dog?",
      options: ["new class Dog", "def Dog():", "class Dog:", "class Dog() {}"] },
  ],
  web: [
    { concept: "HTML", chapterId: "web-firstpage", answer: 0,
      prompt: "Which tag makes the biggest heading?",
      options: ["<h1>", "<head>", "<big>", "<title>"] },
    { concept: "CSS", chapterId: "web-style", answer: 2,
      prompt: "In CSS, which makes text red?",
      options: ["text-color: red", "font: red", "color: red;", "foreground: red"] },
    { concept: "Layout", chapterId: "web-layout", answer: 1,
      prompt: "Which CSS lays a container's children in a flexible row?",
      options: ["display: row", "display: flex;", "layout: flex", "position: row"] },
    { concept: "JavaScript", chapterId: "web-js", answer: 3,
      prompt: "In JavaScript, which declares a variable named count?",
      options: ["int count = 0;", "dim count", "variable count = 0", "let count = 0;"] },
    { concept: "Events", chapterId: "web-events", answer: 1,
      prompt: "Which runs doThing when a button is clicked?",
      options: ["button.onclick doThing", "button.addEventListener('click', doThing)", "click(button, doThing)", "when button: doThing"] },
  ],
  swift: [
    { concept: "Printing", chapterId: "swift-basics", answer: 0,
      prompt: "Which prints Hi in Swift?",
      options: ['print("Hi")', 'println("Hi")', 'echo("Hi")', 'System.print("Hi")'] },
    { concept: "Loops", chapterId: "swift-control", answer: 2,
      prompt: "Which loops i over 1 through 3 in Swift?",
      options: ["for (i=1;i<=3;i++)", "foreach i in 1..3", "for i in 1...3", "loop i from 1 to 3"] },
    { concept: "Functions", chapterId: "swift-functions", answer: 1,
      prompt: "Which defines a function add returning an Int?",
      options: ["func add(a, b) {}", "func add(a: Int, b: Int) -> Int {", "def add(a, b) -> Int", "fn add(a, b) Int"] },
    { concept: "Optionals", chapterId: "swift-optionals", answer: 3, code: 'let name: String? = "Ada"',
      prompt: "Which safely unwraps name?",
      options: ["unwrap(name)", "name.value", "if name? { }", "if let n = name { }"] },
  ],
  java: [
    { concept: "Printing", chapterId: "java-basics", answer: 1,
      prompt: "Which prints Hi in Java?",
      options: ['print("Hi")', 'System.out.println("Hi");', 'console.log("Hi")', 'echo "Hi"'] },
    { concept: "Loops", chapterId: "java-control", answer: 0,
      prompt: "Which is a valid Java loop over 0, 1, 2?",
      options: ["for (int i = 0; i < 3; i++)", "for i in range(3)", "for (i = 0 to 2)", "loop(3)"] },
    { concept: "Methods", chapterId: "java-methods", answer: 2,
      prompt: "Which declares a method square that returns an int?",
      options: ["def square(n):", "func square(n) Int", "int square(int n) { return n * n; }", "method square(n)"] },
    { concept: "Collections", chapterId: "java-collections", answer: 1,
      prompt: "Which makes a growable list of Strings?",
      options: ["String[] list = [];", "ArrayList<String> list = new ArrayList<>();", "List list = {};", "var list = list();"] },
  ],
  rust: [
    { concept: "Printing", chapterId: "rust-basics", answer: 2,
      prompt: "Which prints Hi in Rust?",
      options: ['print("Hi")', 'echo!("Hi")', 'println!("Hi");', 'Console.print("Hi")'] },
    { concept: "Loops", chapterId: "rust-control", answer: 0,
      prompt: "Which loops i over 1 through 3 in Rust?",
      options: ["for i in 1..=3 {", "for (i=1;i<=3;i++)", "foreach i 1..3", "loop i in 1,3"] },
    { concept: "Functions", chapterId: "rust-functions", answer: 3,
      prompt: "Which defines a function add returning an i32?",
      options: ["func add(a, b) i32", "def add(a, b):", "function add(a, b)", "fn add(a: i32, b: i32) -> i32 {"] },
    { concept: "Match", chapterId: "rust-match", answer: 1, code: "let n = 2;",
      prompt: "Which matches n to choose a result?",
      options: ["switch n { }", "match n {\n    1 => \"one\",\n    _ => \"other\",\n}", "case n of", "when n is 2"] },
  ],
};

export interface Placement {
  /** chapter to start at, or null if they aced everything ("mastered"). */
  chapterId: string | null;
  correct: number;
  total: number;
  aced: boolean;
}

/** Given answers (index per question, -1 = skipped/blank), recommend a start. */
export function recommend(track: Track, answers: number[]): Placement {
  const qs = PLACEMENT[track];
  let correct = 0;
  let firstWrong: string | null = null;
  for (let i = 0; i < qs.length; i++) {
    if (answers[i] === qs[i].answer) correct++;
    else if (firstWrong === null) firstWrong = qs[i].chapterId;
  }
  return { chapterId: firstWrong, correct, total: qs.length, aced: firstWrong === null };
}
