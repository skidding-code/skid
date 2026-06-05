import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "java-collections",
  title: "Lists & Maps",
  glyph: "🗃️",
  summary:
    "Arrays are great until you want to add one more thing and Java says no. Enter collections: ArrayList stretches to fit, HashMap remembers things by name, and suddenly your data has somewhere comfy to live.",
  lessons: [
    {
      id: "java-arraylist-basics",
      track: "java",
      title: "A list that grows when you ask nicely",
      subtitle: "Make an ArrayList, add items, and walk through them.",
      concepts: ["ArrayList", "for-each"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Like an array, but stretchy" },
        {
          type: "p",
          text: "A plain Java array is set in stone the moment you make it — fixed size forever. An ArrayList is the friendly version: it starts empty and grows every time you .add() something.",
        },
        {
          type: "p",
          text: "The <String> part tells Java what kind of thing the list holds. Ask for its size() to count items, and a for-each loop visits each one in order, no index wrangling required.",
        },
        {
          type: "code",
          lang: "java",
          text: "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        ArrayList<String> snacks = new ArrayList<>();\n        snacks.add(\"chips\");\n        System.out.println(snacks.size());\n        for (String s : snacks) {\n            System.out.println(s);\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Read for (String s : pets) as \"for each String s in pets\". The colon is just the word \"in\" wearing a disguise.",
        },
        {
          type: "p",
          text: "Make an ArrayList<String> called pets, add \"dog\", \"cat\", and \"fish\", print the size (3), then loop with a for-each and print each pet on its own line.",
        },
      ],
      starter:
        "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make an ArrayList<String>, add dog, cat, fish\n        // TODO: print its size(), then for-each loop printing each pet\n    }\n}\n",
      solution:
        "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        ArrayList<String> pets = new ArrayList<>();\n        pets.add(\"dog\");\n        pets.add(\"cat\");\n        pets.add(\"fish\");\n        System.out.println(pets.size());\n        for (String p : pets) {\n            System.out.println(p);\n        }\n    }\n}\n",
      checks: [
        { label: "Use an ArrayList", kind: "codeContains", value: "ArrayList" },
        { label: "Add items to it", kind: "codeContains", value: ".add(" },
        { label: "Loop over it", kind: "codeContains", value: "for" },
        { label: "Print the size", kind: "stdoutContains", value: "3" },
        { label: "Show a pet", kind: "stdoutContains", value: "fish" },
      ],
      hints: [
        "Start with: ArrayList<String> pets = new ArrayList<>(); then call pets.add(\"dog\"); three times.",
        "System.out.println(pets.size()); prints the count, which is 3.",
        "Loop: for (String p : pets) { System.out.println(p); }",
      ],
      wellDone: "You built a list that grows on demand and strolled right through it. Arrays could never.",
    },
    {
      id: "java-sum-loop",
      track: "java",
      title: "Add it all up",
      subtitle: "Loop over numbers and keep a running total.",
      concepts: ["arrays", "accumulator"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "The running total trick" },
        {
          type: "p",
          text: "Want the sum of a bunch of numbers? Start a total at 0, then loop and add each number to it. By the end, total holds the answer. This little pattern is called an accumulator, and you'll use it forever.",
        },
        {
          type: "p",
          text: "A for-each loop works beautifully here: visit each number, add it on, move along. No manual counting.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    public static void main(String[] args) {\n        int[] prices = {2, 4, 6};\n        int total = 0;\n        for (int p : prices) {\n            total += p;\n        }\n        System.out.println(total);\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "total += p; is shorthand for total = total + p;. It means \"add p onto whatever total already was\".",
        },
        {
          type: "p",
          text: "Make an int array {10, 20, 30, 40}, start total at 0, loop to add every value, then print the total (which is 100).",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30, 40};\n        // TODO: start a total at 0, loop adding each value, then print the total\n    }\n}\n",
      solution:
        "class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30, 40};\n        int total = 0;\n        for (int n : nums) {\n            total += n;\n        }\n        System.out.println(total);\n    }\n}\n",
      checks: [
        { label: "Loop over the numbers", kind: "codeContains", value: "for" },
        { label: "Keep a running total", kind: "codeContains", value: "total" },
        { label: "Print the sum", kind: "stdoutContains", value: "100" },
      ],
      hints: [
        "Before the loop: int total = 0;",
        "Loop: for (int n : nums) { total += n; }",
        "After the loop: System.out.println(total); which prints 100.",
      ],
      wellDone: "One total, one loop, one answer. That accumulator pattern will show up in basically every program you write.",
    },
    {
      id: "java-hashmap-basics",
      track: "java",
      title: "A list with name tags",
      subtitle: "Store key/value pairs in a HashMap and read them back.",
      concepts: ["HashMap", "key-value"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Look things up by name, not by number" },
        {
          type: "p",
          text: "A list finds things by position. A HashMap finds things by a label you choose — the key. Each key points to a value, like a contact name pointing to a phone number.",
        },
        {
          type: "p",
          text: "HashMap<String, Integer> means the keys are Strings and the values are Integers. Use .put(key, value) to store a pair, and .get(key) to fetch the value back.",
        },
        {
          type: "code",
          lang: "java",
          text: "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> ages = new HashMap<>();\n        ages.put(\"Sam\", 30);\n        System.out.println(ages.get(\"Sam\"));\n        for (Map.Entry<String, Integer> e : ages.entrySet()) {\n            System.out.println(e.getKey() + \" -> \" + e.getValue());\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "entrySet() hands you every key/value pair so you can loop them. e.getKey() is the label, e.getValue() is the thing it points to.",
        },
        {
          type: "p",
          text: "Make a HashMap<String, Integer> called scores, put \"Ann\" -> 90 and \"Ben\" -> 80, print scores.get(\"Ann\") (which is 90), then loop the entries printing each as key -> value.",
        },
      ],
      starter:
        "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make a HashMap<String, Integer>, put Ann -> 90 and Ben -> 80\n        // TODO: print the value for Ann, then loop entries printing key -> value\n    }\n}\n",
      solution:
        "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> scores = new HashMap<>();\n        scores.put(\"Ann\", 90);\n        scores.put(\"Ben\", 80);\n        System.out.println(scores.get(\"Ann\"));\n        for (Map.Entry<String, Integer> e : scores.entrySet()) {\n            System.out.println(e.getKey() + \" -> \" + e.getValue());\n        }\n    }\n}\n",
      checks: [
        { label: "Use a HashMap", kind: "codeContains", value: "HashMap" },
        { label: "Store pairs with put", kind: "codeContains", value: ".put(" },
        { label: "Loop the entries", kind: "codeContains", value: "for" },
        { label: "Print Ann's score", kind: "stdoutContains", value: "90" },
        { label: "Show a key/value pair", kind: "stdoutContains", value: "Ann -> 90" },
      ],
      hints: [
        "Create it: HashMap<String, Integer> scores = new HashMap<>(); then scores.put(\"Ann\", 90); and scores.put(\"Ben\", 80);",
        "Read one value: System.out.println(scores.get(\"Ann\")); which prints 90.",
        "Loop: for (Map.Entry<String, Integer> e : scores.entrySet()) { System.out.println(e.getKey() + \" -> \" + e.getValue()); }",
      ],
      wellDone: "Keys, values, and a loop that reads them all back. HashMaps are how programs remember who's who.",
    },
  ],
};
