import type { Chapter } from "../types";

export const ch08: Chapter = {
  id: "java-generics",
  title: "Generics & Streams",
  glyph: "📦",
  summary:
    "Generics let you write one method or class that works for any type without copy-pasting it five times. Lambdas let you pass behavior around like a value. Streams let you describe what you want done to a list instead of writing the loop. Together they're how modern Java stops being so chatty.",
  lessons: [
    {
      id: "java-generic-method",
      track: "java",
      title: "One method, every type",
      subtitle: "Write a generic method <T> printAll(List<T>) that prints any list.",
      concepts: ["generics", "type parameter"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "<T> is a fill-in-the-blank for types" },
        {
          type: "p",
          text: "Imagine writing printStrings(List<String>), then printInts(List<Integer>), then printDoubles... your wrist files a complaint. A generic method fixes this. You add a type parameter <T> before the return type, and now T is a placeholder that Java fills in with whatever type the caller hands over.",
        },
        {
          type: "p",
          text: "Read <T> void printAll(List<T> items) as: for some type T, this takes a list of T and returns nothing. Inside, you just loop and print. One method, works for strings, numbers, robots, anything.",
        },
        {
          type: "code",
          lang: "java",
          text: "import java.util.*;\n\nclass Main {\n    static <T> void printAll(List<T> items) {\n        for (T item : items) {\n            System.out.println(item);\n        }\n    }\n\n    public static void main(String[] args) {\n        printAll(Arrays.asList(\"a\", \"b\"));\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "The <T> goes BEFORE the return type: static <T> void printAll(...). Forget it and Java thinks T is some class you never defined and refuses to play.",
        },
        {
          type: "p",
          text: "Write a generic method static <T> void printAll(List<T> items) that prints each item on its own line. In main, call it on Arrays.asList(\"red\", \"green\", \"blue\") so the output is red, then green, then blue.",
        },
      ],
      starter:
        "import java.util.*;\n\nclass Main {\n    // TODO: a generic method  static <T> void printAll(List<T> items)\n    //       that prints each item on its own line\n\n    public static void main(String[] args) {\n        // TODO: call printAll on Arrays.asList(\"red\", \"green\", \"blue\")\n    }\n}\n",
      solution:
        "import java.util.*;\n\nclass Main {\n    static <T> void printAll(List<T> items) {\n        for (T item : items) {\n            System.out.println(item);\n        }\n    }\n\n    public static void main(String[] args) {\n        printAll(Arrays.asList(\"red\", \"green\", \"blue\"));\n    }\n}\n",
      checks: [
        { label: "Use a type parameter", kind: "codeContains", value: "<T>" },
        { label: "Take a List<T>", kind: "codeContains", value: "List<T>" },
        { label: "First color", kind: "stdoutContains", value: "red" },
        { label: "Middle color", kind: "stdoutContains", value: "green" },
        { label: "Last color", kind: "stdoutContains", value: "blue" },
      ],
      hints: [
        "The signature is static <T> void printAll(List<T> items) { ... } — the <T> sits between static and void.",
        "Inside, loop: for (T item : items) { System.out.println(item); }",
        "In main: printAll(Arrays.asList(\"red\", \"green\", \"blue\")); — Java infers T is String for you.",
      ],
      wellDone: "One method that prints lists of anything. Your future self, who refuses to copy-paste, thanks you.",
    },
    {
      id: "java-generic-class",
      track: "java",
      title: "A box that holds anything",
      subtitle: "Build a generic class Box<T> that stores and returns one value of any type.",
      concepts: ["generic class", "type parameter"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Box<T>: same box, your choice of contents" },
        {
          type: "p",
          text: "A generic class works like a generic method, but the placeholder <T> lives on the whole class. Box<T> is a container where T is decided when you build it: new Box<String>(\"hi\") makes a box of strings, new Box<Integer>(42) makes a box of numbers. Same code, different cargo.",
        },
        {
          type: "p",
          text: "Inside the class, T behaves like a real type: a field of type T, a constructor taking T, a method returning T. The compiler keeps you honest, so you can never accidentally pull a String out of a box you packed with Integers.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Box<T> {\n    private T value;\n    Box(T value) {\n        this.value = value;\n    }\n    T get() {\n        return value;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Box<String> b = new Box<>(\"hello\");\n        System.out.println(b.get());\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "new Box<>(\"hi\") with empty angle brackets is the diamond operator — Java guesses T from the variable's type so you don't type it twice. Less typing, same safety.",
        },
        {
          type: "p",
          text: "Write a generic class Box<T> with a private T value, a constructor that sets it, and a method get() that returns it. In main, make a Box<String> holding \"treasure\" and print get() so the output is treasure.",
        },
      ],
      starter:
        "class Box<T> {\n    // TODO: a private T field called value\n    // TODO: a constructor Box(T value) that sets it\n    // TODO: a method  T get()  that returns value\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make a Box<String> holding \"treasure\" and print get()\n    }\n}\n",
      solution:
        "class Box<T> {\n    private T value;\n    Box(T value) {\n        this.value = value;\n    }\n    T get() {\n        return value;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Box<String> b = new Box<>(\"treasure\");\n        System.out.println(b.get());\n    }\n}\n",
      checks: [
        { label: "Make the class generic", kind: "codeContains", value: "<T>" },
        { label: "Store a value of type T", kind: "codeContains", value: "T value" },
        { label: "Build it with new", kind: "codeContains", value: "new " },
        { label: "Open the box", kind: "stdoutContains", value: "treasure" },
      ],
      hints: [
        "Start with class Box<T> {, then private T value; and Box(T value) { this.value = value; }.",
        "The getter: T get() { return value; }",
        "In main: Box<String> b = new Box<>(\"treasure\"); System.out.println(b.get());",
      ],
      wellDone: "One box class, infinite contents. That's generics doing exactly what they were built for.",
    },
    {
      id: "java-lambda",
      track: "java",
      title: "Hand a function to a list",
      subtitle: "Use a lambda with forEach to run a little behavior on every element.",
      concepts: ["lambda", "forEach"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A lambda is a function with no name" },
        {
          type: "p",
          text: "Sometimes you want to pass behavior, not data. A lambda is a tiny anonymous function you can hand to another method. The shape is parameter -> body. So x -> System.out.println(x) means: given x, print it. No class, no method name, no ceremony.",
        },
        {
          type: "p",
          text: "Lists have a forEach method that takes exactly this kind of function and runs it once per element. list.forEach(x -> System.out.println(x)) walks the whole list and prints each item — the loop is written for you.",
        },
        {
          type: "code",
          lang: "java",
          text: "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<String> pets = Arrays.asList(\"cat\", \"dog\");\n        pets.forEach(p -> System.out.println(\"Hi \" + p));\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "The -> arrow splits a lambda: the left side names the input, the right side says what to do with it. p -> ... means \"for each p, do this\".",
        },
        {
          type: "p",
          text: "Make a List<String> of \"Ann\", \"Bob\", \"Cara\" with Arrays.asList. Then call forEach with a lambda that prints \"Hello \" + the name, so the output is Hello Ann, Hello Bob, Hello Cara.",
        },
      ],
      starter:
        "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Ann\", \"Bob\", \"Cara\");\n        // TODO: use names.forEach with a lambda that prints \"Hello \" + the name\n    }\n}\n",
      solution:
        "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Ann\", \"Bob\", \"Cara\");\n        names.forEach(name -> System.out.println(\"Hello \" + name));\n    }\n}\n",
      checks: [
        { label: "Write a lambda", kind: "codeContains", value: "->" },
        { label: "Loop with forEach", kind: "codeContains", value: "forEach" },
        { label: "Greet Ann", kind: "stdoutContains", value: "Hello Ann" },
        { label: "Greet Bob", kind: "stdoutContains", value: "Hello Bob" },
        { label: "Greet Cara", kind: "stdoutContains", value: "Hello Cara" },
      ],
      hints: [
        "Call names.forEach(...) and pass a lambda inside the parentheses.",
        "The lambda's left side names each element; the right side prints it: name -> System.out.println(\"Hello \" + name).",
        "Full line: names.forEach(name -> System.out.println(\"Hello \" + name));",
      ],
      wellDone: "You passed a function as an argument and let the list do the looping. That's functional Java clicking into place.",
    },
    {
      id: "java-streams",
      track: "java",
      title: "Describe the work, skip the loop",
      subtitle: "Chain stream().filter(...).map(...) to transform a list without a single for loop.",
      concepts: ["streams", "filter", "map"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "A stream is an assembly line for data" },
        {
          type: "p",
          text: "A stream lets you say WHAT you want done to a collection instead of writing the HOW. You call list.stream() to put items on a conveyor belt, then chain steps. Each step takes a lambda and returns a new stream, so you can keep stacking.",
        },
        {
          type: "p",
          text: "Two workhorse steps: filter keeps only the elements where your lambda returns true, and map transforms each surviving element into something else. End with forEach to print, or collect to gather the results back into a list. No loop, no index, no off-by-one bugs.",
        },
        {
          type: "code",
          lang: "java",
          text: "import java.util.*;\nimport java.util.stream.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<Integer> nums = Arrays.asList(1, 2, 3, 4);\n        nums.stream()\n            .filter(n -> n % 2 == 0)\n            .map(n -> n * 10)\n            .forEach(System.out::println);\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "filter narrows the herd, map changes each survivor. The order matters: filter first means map only runs on the ones that made the cut. Above, only 2 and 4 survive, then become 20 and 40.",
        },
        {
          type: "p",
          text: "Start from Arrays.asList(1, 2, 3, 4, 5, 6). Use a stream to keep only the even numbers (filter n -> n % 2 == 0), multiply each by 10 (map n -> n * 10), and print each result. The output should be 20, then 40, then 60.",
        },
      ],
      starter:
        "import java.util.*;\nimport java.util.stream.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);\n        // TODO: nums.stream() then .filter even, .map times 10, .forEach print\n    }\n}\n",
      solution:
        "import java.util.*;\nimport java.util.stream.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);\n        nums.stream()\n            .filter(n -> n % 2 == 0)\n            .map(n -> n * 10)\n            .forEach(n -> System.out.println(n));\n    }\n}\n",
      checks: [
        { label: "Open a stream", kind: "codeContains", value: ".stream()" },
        { label: "Filter the elements", kind: "codeContains", value: ".filter(" },
        { label: "Use a lambda", kind: "codeContains", value: "->" },
        { label: "First even times ten", kind: "stdoutContains", value: "20" },
        { label: "Second even times ten", kind: "stdoutContains", value: "40" },
        { label: "Third even times ten", kind: "stdoutContains", value: "60" },
      ],
      hints: [
        "Begin the chain with nums.stream() and add steps one per line.",
        "Keep evens with .filter(n -> n % 2 == 0), then transform with .map(n -> n * 10).",
        "Finish with .forEach(n -> System.out.println(n)); — the whole chain replaces a for loop.",
      ],
      wellDone: "filter, map, forEach — you described the pipeline and let the stream run it. That's the modern Java style in a nutshell.",
    },
  ],
};
